import { LGBox, LibGuide, GuideJSON } from "@/types";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import { Configuration, OpenAIApi } from "openai";

loadEnvConfig("");

const generateEmbeddings = async (guides: LibGuide[]) => {
  const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  const openai = new OpenAIApi(configuration);

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  for (let i = 0; i < guides.length; i++) {
    const guide = guides[i];

    const { guide_title, guide_url, page_title, box_title, box_content } = guide;

    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: box_content
    });

    const [{ embedding }] = embeddingResponse.data.data;

    const { data, error } = await supabase
      .from("lg")
      .insert({
        guide_title,
        guide_url,
        page_title,
        box_title,
        box_content,
        embedding,
      })
      .select("*");

    if (error) {
      console.log("error", error);
    } else {
      console.log("saved", i);
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }
};

(async () => {
  const book: GuideJSON = JSON.parse(fs.readFileSync("scripts/lg.json", "utf8"));

  await generateEmbeddings(book.guides);
})();

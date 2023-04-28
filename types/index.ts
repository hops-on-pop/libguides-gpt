export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo"
}

export type LibGuide = {
  guide_url: string;
  guide_title: string,
  page_title: string;
  box_title: string;
  box_content: string;
};

export type LGBox = {
  guide_title: string;
  guide_url: string;
  page_title: string;
  box_title: string;
  box_content: string;
  content_length?: number;
  content_tokens?: number;
  embedding: number[];
};

export type GuideJSON = {
  guides: LibGuide[];
};

import { IconExternalLink } from "@tabler/icons-react";
import { FC } from "react";

export const Navbar: FC = () => {
  return (
    <div className="flex h-[60px] border-b border-gray-300 py-2 px-8 items-center justify-between">
      <div className="font-bold text-2xl flex items-center text-[#990000]">
          USC Libraries LibGuides GPT
      </div>
      <div>
        <a
          className="flex items-center hover:opacity-50 text-[#990000] hover:text-red-700"
          href="https://libguides.usc.edu/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="hidden sm:flex">Research Guides Home</div>

          <IconExternalLink
            className="ml-1"
            size={20}
          />
        </a>
      </div>
    </div>
  );
};

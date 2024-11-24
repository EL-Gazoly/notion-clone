"use client";
import { BlockNoteEditor, PartialBlock, Block } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
type EditorProps = {
  onChange: (content: string) => void;
  initalContent?: string;
  editable?: boolean;
};
const Editor = ({ onChange, initalContent, editable }: EditorProps) => {
  const { edgestore } = useEdgeStore();
  const [blocks, setBlocks] = useState<Block[]>([]);

  const uploadFile = async (file: File) => {
    let res = await edgestore.publicFiles.upload({ file });
    return res.url;
  };

  const editor = useCreateBlockNote({
    initialContent: initalContent
      ? (JSON.parse(initalContent) as PartialBlock[])
      : undefined,
    uploadFile,
  });
  const update = () => {
    onChange(JSON.stringify(editor.document));
  };

  const { resolvedTheme } = useTheme();
  return (
    <div className=" w-full h-full z-[999999] overflow-x-hidden">
      <BlockNoteView
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        editor={editor}
        onChange={update}
        emojiPicker
        editable={editable}
        filePanel
      />
    </div>
  );
};

export default Editor;

import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import Paragraph from "@editorjs/paragraph";
export default function Editor({ editor }) {
  useEffect(() => {
    const editorJs = new EditorJS({
      holder: "editor-js",
      autofocus: true,
      placeholder: "نص الخبر",
      tools: {
        embed: Embed,
        table: Table,
        marker: Marker,
        list: List,
        warning: Warning,
        code: Code,
        linkTool: LinkTool,
        image: {
          class: Image,
          config: {},
        },
        raw: Raw,
        header: Header,
        quote: Quote,
        checklist: CheckList,
        delimiter: Delimiter,
        inlineCode: InlineCode,
        simpleImage: SimpleImage,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
      },
    });
    editor.current = editorJs;
    return () => {
      if (editor.current) {
        try {
          editor.current.destroy();
        } catch {
          console.warn("error destroying editor");
        }
      }
    };
  }, []);
  return <div id="editor-js" className="w-full h-96"></div>;
}

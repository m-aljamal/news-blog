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
// import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import Paragraph from "@editorjs/paragraph";
export default function Editor({ editor, ...props }) {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`;

  useEffect(() => {
    const editorJs = new EditorJS({
      placeholder: "نص البوست",
      holder: "editor-js",
      data: props.block,
      tools: {
        embed: Embed,
        table: Table,
        marker: Marker,
        list: List,
        warning: Warning,
        code: Code,
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "/api/link",
          },
        },
        image: {
          class: Image,
          config: {
            uploader: {
              uploadByFile(file) {
                return fetch("/api/cloudinary")
                  .then(async (res) => {
                    const { signature, timestamp } = await res.json();
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("signature", signature);
                    formData.append("timestamp", timestamp);
                    formData.append(
                      "api_key",
                      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ?? ""
                    );
                    const response = await fetch(url, {
                      method: "POST",
                      body: formData,
                    });
                    const image = await response.json();
                    return {
                      success: 1,
                      file: {
                        url: image.secure_url,
                        public_id: image.public_id,
                      },
                    };
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              },
            },
          },
        },
        raw: Raw,
        header: {
          class: Header,
          config: {
            placeholder: "اكنب عنوان",
            levels: [2, 3, 4],
            defaultLevel: 2,
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "اكتب الاقتباس",
            captionPlaceholder: "اسم الكاتب",
          },
        },
        // checklist: CheckList,
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
  }, [props.block]);
  return <div id="editor-js"></div>;
}

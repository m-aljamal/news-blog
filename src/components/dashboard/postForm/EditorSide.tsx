import dynamic from "next/dynamic";
const Editor = dynamic(() => import("src/components/Editor"), { ssr: false });
const EditorSide = ({ editor }) => {
  return (
    <div
      className=" border  mt-4 sm:mt-0 sm:w-1/2   shadow-md p-3 overflow-y-auto overflow-x-auto"
      style={{ height: "calc(100vh - 160px)" }}
    >
      <Editor editor={editor} />
    </div>
  );
};

export default EditorSide;

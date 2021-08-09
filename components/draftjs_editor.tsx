import React, { FC, FocusEvent, useEffect, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";

const Editor = dynamic(
  async () => {
    const mod = await import("react-draft-wysiwyg");
    return mod.Editor;
  },
  { loading: () => null, ssr: false }
);

interface IProps {
  initialValue: string;
  onChange(val: string): void;
  onBlur?(e: FocusEvent<any>): void;
  wrapperClassName?: string;
}

const DraftjsEditor: FC<IProps> = ({
  initialValue,
  onChange,
  onBlur,
  wrapperClassName = "drafjs__wrapper",
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    dynamicImportFunc();
  }, []);

  const dynamicImportFunc = async () => {
    if (typeof window !== "undefined") {
      const { default: htmlToDraft } = await import("html-to-draftjs");
      const contentBlock = htmlToDraft(initialValue);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    }
  };

  const onEditorChange = (editorState: EditorState): void => {
    const newValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setEditorState(editorState);
    onChange(newValue);
  };

  return (
    <Editor
      editorState={editorState}
      wrapperClassName={wrapperClassName}
      editorClassName="drafjs__editor"
      toolbarClassName="drafjs__toolbar"
      onEditorStateChange={onEditorChange}
      toolbar={toolbarOptions}
      onBlur={onBlur}
    />
  );
};

const toolbarOptions = {
  options: ["inline", "blockType", "list", "textAlign", "history"],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["bold", "italic", "underline", "strikethrough", "monospace"],
  },
  blockType: {
    inDropdown: true,
    options: [
      "Normal",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "Blockquote",
      "Code",
    ],
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["unordered", "ordered"],
  },
  textAlign: {
    inDropdown: false,
    options: ["left", "center", "right", "justify"],
  },
  history: {
    inDropdown: false,
    options: ["undo", "redo"],
  },
};

export default DraftjsEditor;
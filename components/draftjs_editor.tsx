import React, { FC, useCallback, useEffect, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
}

const DraftjsEditor: FC<IProps> = ({ initialValue, onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [value, setValue] = useState(initialValue || "");

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
        setValue(draftToHtml(convertToRaw(editorState.getCurrentContent())));
      }
    }
  };

  const onEditorChange = (editorState: EditorState): void => {
    setEditorState(editorState);
    setValue(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const onEditorBlur = useCallback(() => {
    onChange(value.trim());
  }, [onChange, value]);

  return (
    <>
      <Editor
        editorState={editorState}
        wrapperClassName='drafjs__wrapper'
        editorClassName='drafjs__editor'
        onEditorStateChange={onEditorChange}
        toolbar={toolbarOptions}
        onBlur={onEditorBlur}
      />
      <p>{value}</p>
    </>
  );
};

const toolbarOptions = {
  options: [
    "inline",
    "blockType",
    "list",
    "textAlign",
    "link",
    "emoji",
    "history",
  ],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "monospace" /* 'monospace', 'superscript', 'subscript' */,
    ],
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
    options: ["unordered", "ordered" /* 'indent', 'outdent' */],
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

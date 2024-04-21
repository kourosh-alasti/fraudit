"use client";

import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  DiffSourceToggleWrapper,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  Separator,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
} from "@mdxeditor/editor";

interface Props {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const MarkdownEditor = ({ editorRef, ...props }: Props & MDXEditorProps) => {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => {
            return (
              <>
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <ListsToggle />
                  <Separator />
                  <BlockTypeSelect />
                  <CreateLink />
                  <InsertImage />
                  <Separator />
                </DiffSourceToggleWrapper>
              </>
            );
          },
        }),
      ]}
      {...props}
      ref={editorRef}
      contentEditableClassName=" mt-2 mb-8 rounded-md min-h-[300px] max-w-none text-lg px-8 py-5 caret-green-600 prose prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-[''] text-gray-800"
    />
  );
};

export default MarkdownEditor;

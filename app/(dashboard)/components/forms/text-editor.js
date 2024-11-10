"use client"

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useEffect, useState } from "react";

const DraftEditor = ({ value, onChange }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    useEffect(() => {
        const contentBlock = htmlToDraft(value || "");
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            setEditorState(EditorState.createWithContent(contentState))
        }
    }, [])

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        if (onChange) {
            onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        }
    }

    return (
        <div className="relative">
            <div className="flex gap-2 items-center p-2 bg-[#f8f8f8] dark:bg-BG_Color dark:text-white">

            </div>
            <Editor
                editorState={editorState}
                toolbar={
                    {
                        options: ['inline', 'fontSize', 'history','remove', 'textAlign','link'],
                    }}
                toolbarClassName="!mb-0 !bg-secondary-100 !border-secondary-200 !rounded-xl !px-4"
                wrapperClassName="border border-secondary-200 p-4 rounded-xl focus:border-brand"
                editorClassName="min-h-16 font-tt-norms dark:text-white text-black w-full"
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    )
}
export default DraftEditor
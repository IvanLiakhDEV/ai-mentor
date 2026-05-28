import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import React from 'react';

export const TextEditor = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [StarterKit, TextStyle],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose max-w-none outline-none p-4 min-h-[100px] max-h-[200px] overflow-auto gap',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className='border rounded-lg overflow-hidden bg-white'>
            <div className='flex flex-wrap gap-2 p-2 border-b bg-gray-50'>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 rounded text-sm font-bold transition-colors ${editor.isActive('bold') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>
                    B
                </button>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 rounded text-sm italic transition-colors ${editor.isActive('italic') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>
                    I
                </button>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`px-2 py-1 rounded text-sm  transition-colors ${editor.isActive('paragraph') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>
                    P
                </button>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-2 py-1 rounded text-sm  transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>
                    H1
                </button>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-2 py-1 rounded text-sm  transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>
                    H2
                </button>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={`px-2 py-1 rounded text-sm font-mono transition-colors ${editor.isActive('code') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>
                    {'</>'}
                </button>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-2 py-1 rounded text-sm transition-colors ${editor.isActive('orderedList') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>
                    1.
                </button>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2 py-1 rounded text-sm transition-colors ${editor.isActive('bulletList') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>
                    •
                </button>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`px-2 py-1 rounded text-sm font-mono transition-colors ${editor.isActive('codeBlock') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>
                    {'```'}
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
};

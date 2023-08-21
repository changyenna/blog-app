import React, { useState } from 'react';
import { submitPost } from '../services';
import { createEditor, Editor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import TextEditor from './TextEditor';

const PostForm = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];

  const [content, setContent] = useState();

  const onContentChange = (newContent) => {
    console.log('New content:', JSON.stringify(newContent, null, 2));
    setContent(newContent);
  };

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredPost: true,
  });

  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'radio' && formData[name] !== value) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value === 'true',
      }));
    } else {
      const newValue = type === 'checkbox' ? checked : value;
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };
  const handlePostSubmission = async () => {
    const { title, slug, excerpt, featuredPost } = formData;

    const postObj = {
      title,
      slug,
      excerpt,
      content: {
        children: content ? content : [],
      },
      featuredPost,
    };

    console.log('Post Object:', JSON.stringify(postObj, null, 2));
    try {
      const response = await submitPost(postObj);
      console.log('Post submitted:', response);
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  const applyBoldFormatting = () => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });

    if (!match) {
      Transforms.setNodes(
        editor,
        { bold: true }, // Add or remove other styles as needed
        { match: (n) => Text.isText(n), split: true }
      );
    } else {
      Transforms.unwrapNodes(editor, {
        match: (n) => n.bold === true,
        split: true,
      });
    }
  };

  const handleBoldClick = (e) => {
    e.preventDefault();
    applyBoldFormatting();
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 max-w-screen-lg w-full">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">
          Create a New Post
        </h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            value={formData.title}
            onChange={onInputChange}
            className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            placeholder="title"
            name="title"
          />
          <input
            type="text"
            value={formData.slug}
            onChange={onInputChange}
            className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            placeholder="slug"
            name="slug"
          />
          <textarea
            value={formData.excerpt}
            onChange={onInputChange}
            className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            name="excerpt"
            placeholder="excerpt"
          />
          <div className="mb-4">
            {/* <label className="block font-medium text-gray-700">Content:</label> */}
            <div className="mt-0">
              <Slate
                editor={editor}
                value={content}
                onChange={onContentChange}
                initialValue={initialValue}
              >
                <TextEditor editor={editor} readOnly={false} />
                {/* <Editable
                  className="p-4 outline-none w-full rounded-lg h-80 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                  placeholder="Content"
                /> */}
              </Slate>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Featured Post:
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="featuredPost"
                  value="true"
                  checked={formData.featuredPost === true}
                  onChange={onInputChange}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="featuredPost"
                  value="false"
                  checked={formData.featuredPost === false}
                  onChange={onInputChange}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button
            type="button"
            onClick={handlePostSubmission}
            className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

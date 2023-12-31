import React, { useState, useEffect } from 'react';
import { submitPost } from '../services';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import TextEditor from './TextEditor';
import AssetInput from './AssetInput';

const PostForm = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const [submissionStatus, setSubmissionStatus] = useState('');

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
    featuredImage: '',
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
    const { title, slug, excerpt, featuredPost, featuredImage } = formData;

    if (!title || !slug || !featuredImage) {
      setSubmissionStatus('Error: Please fill out all required fields');
      return;
    }

    const postObj = {
      title,
      slug,
      excerpt,
      content: {
        children: content ? content : [],
      },
      featuredImage,
      featuredPost,
    };

    console.log('Post Object:', JSON.stringify(postObj, null, 2));
    try {
      const response = await submitPost(postObj);
      console.log('Response Post ID', response.createPost.id);

      if (response.createPost.id) {
        console.log('Post submitted:', JSON.stringify(response, null, 2));
        setSubmissionStatus('Submission successful');
        // publish the post
        try {
          const publishRes = await fetch(
            `/api/publish-post/${response.createPost.id}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (!publishRes.ok) {
            setSubmissionStatus('Publish failed');
            console.error(
              'Error publishing post:',
              publishRes.status,
              publishRes.statusText
            );
          } else {
            setSubmissionStatus('Published successful');
            console.log('Post published successfully');
          }
        } catch (error) {
          console.error('Error publishing post:', error);
          setSubmissionStatus('Published failed');
        }
      } else {
        console.error('Post submission failed: No ID returned');
        setSubmissionStatus('Submission failed');
      }
    } catch (error) {
      // setSubmissionStatus('Submission failed');
      console.error('Error submitting post:', error);
      if (error.message.includes('Unexpected token')) {
        setSubmissionStatus('Error: Please make sure slug is unique');
      } else {
        setSubmissionStatus('Submission failed');
      }
    }
  };

  const handleAssetUploaded = (id) => {
    setFormData((prevData) => ({
      ...prevData,
      featuredImage: id,
    }));
    console.log({ formData });
  };

  return (
    <div className="flex justify-center items-center min-h-screen mx-3">
      <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 max-w-screen-lg w-full">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">
          Create a New Post
        </h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            value={formData.title}
            onChange={onInputChange}
            className="py-3 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 text-2xl font-bold"
            placeholder="title"
            name="title"
          />
          <input
            type="text"
            value={formData.slug}
            onChange={onInputChange}
            className="py-3 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
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
              </Slate>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Featured Image
            </label>
            <div className="mt-2">
              <AssetInput onAssetUploaded={handleAssetUploaded} />
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
          {submissionStatus && (
            <p
              className={
                submissionStatus === 'Submission successful' ||
                submissionStatus === 'Published successful'
                  ? 'text-green-500 mt-2'
                  : 'text-red-500 mt-2'
              }
            >
              {submissionStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostForm;

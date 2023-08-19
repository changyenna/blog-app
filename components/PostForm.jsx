// import React, { useState, useEffect } from 'react';
// import { submitPost } from '../services';
// import 'react-quill/dist/quill.snow.css';
// import dynamic from 'next/dynamic';

// const ReactQuill = dynamic(import('react-quill'), { ssr: false });

// const PostForm = () => {
//   const [error, setError] = useState(false);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [formData, setFormData] = useState({
//     title: null,
//     slug: null,
//     excerpt: null,
//     content: null,
//     // featuredImage: null,
//     featuredPost: false,
//   });

//   const onInputChange = (e) => {
//     const { target } = e;
//     if (target.type === 'checkbox') {
//       setFormData((prevState) => ({
//         ...prevState,
//         [target.name]: target.checked,
//       }));
//     } else {
//       // const newValue = target.value;
//       // const fieldName = target.name;

//       // console.log(`Updating ${fieldName} with value: ${newValue}`);
//       setFormData((prevState) => ({
//         ...prevState,
//         [target.name]: target.value,
//       }));
//     }
//   };

//   const onQuillChange = (value) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       content: value,
//     }));
//   };
//   const handlePostSubmission = async () => {
//     setError(false);
//     const { title, slug, excerpt, content, featuredPost } = formData;
//     if (!title || !slug || !excerpt || !content) {
//       setError(true);
//       return;
//     }

//     const postObj = {
//       title,
//       slug,
//       excerpt,
//       content: JSON.stringify(content), // Convert to JSON string
//       // featuredImage,
//       featuredPost,
//     };

//     submitPost(postObj).then((res) => {
//       if (res.createPost) {
//         formData.title = '';
//         formData.slug = '';
//         formData.excerpt = '';
//         formData.content = '';
//         // formData.featuredImage = '';
//         formData.featuredPost = '';
//         setFormData((prevState) => ({
//           ...prevState,
//           ...formData,
//         }));

//         setShowSuccessMessage(true);
//         setTimeout(() => {
//           setShowSuccessMessage(false);
//         }, 3000);
//       }
//     });
//   };
//   return (
//     <div className="container flex-col h-auto mx-auto max-w-screen-lg px-0">
//       <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
//         <h3 className="text-xl mb-8 font-semibold border-b pb-4">
//           Create a New Post
//         </h3>
//         <div className="grid grid-cols-1 gap-4 mb-4">
//           <textarea
//             value={formData.title}
//             onChange={onInputChange}
//             className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
//             name="title"
//             placeholder="Title"
//           />
//         </div>
//         <div className="grid grid-cols-1 gap-4 mb-4">
//           <input
//             type="text"
//             value={formData.slug}
//             onChange={onInputChange}
//             className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
//             placeholder="title-in-lowercase-and-with-hypens"
//             name="slug"
//           />
//         </div>
//         <div className="grid grid-cols-1 gap-4 mb-4">
//           <textarea
//             value={formData.excerpt}
//             onChange={onInputChange}
//             className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
//             placeholder="Excerpt"
//             name="excerpt"
//           />
//         </div>
//         <div className="grid grid-cols-1 gap-4 mb-4">
//           <label>Content</label>
//           {typeof window !== 'undefined' && (
//             <ReactQuill
//               value={formData.content}
//               onChange={onQuillChange}
//               className="p-4 w-full rounded-lg h-80 bg-gray-100"
//             />
//           )}
//         </div>
//         <br />
//         {/* <div className="grid grid-cols-1 gap-4 mb-4">
//           <input
//             type="text"
//             value={formData.featuredImage}
//             onChange={onInputChange}
//             className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
//             name="featuredImage"
//             placeholder="Paste featured image URL here"
//           />
//         </div> */}

//         <div className="grid grid-cols-1 gap-4 mb-4">
//           <div>
//             <input
//               checked={formData.featuredPost}
//               onChange={onInputChange}
//               type="checkbox"
//               name="featuredPost"
//               value="true"
//             />
//             <label className="text-gray-500 cursor-pointer" htmlFor="storeData">
//               {' '}
//               Featured Post
//             </label>
//           </div>
//         </div>

//         {error && (
//           <p className="text-xs text-red-500">All fields are mandatory</p>
//         )}
//         <div className="mt-8">
//           <button
//             type="button"
//             onClick={handlePostSubmission}
//             className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
//           >
//             Post
//           </button>
//           {showSuccessMessage && (
//             <span className="text-xl float-right font-semibold mt-3 text-green-500">
//               Post submitted
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostForm;

// import React from 'react';
// import { GraphQLClient } from 'graphql-request';

// const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// const hygraph = new GraphQLClient(graphqlAPI, {
//   headers: {
//     authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
//   },
// });

// export async function getStaticPaths() {
//   const { pages } = await hygraph.request(`{
//         pages {
//             slug
//         }
//     }`);

//   return {
//     paths: pages.map(({ slug }) => ({ params: { slug } })),
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params: variables }) {
//   const { page } = await hygraph.request(
//     `query page($slug: String!) {
//       page(where: {slug: $slug}) {
//         title
//         slug
//         form {
//           fields {
//             __typename
//             ... on FormInput {
//               name
//               type
//               inputLabel: label
//               placeholder
//               required
//             }
//             ... on FormTextarea {
//               name
//               textareaLabel: label
//               placeholder
//               required
//             }
//             ... on FormCheckbox {
//               name
//               checkboxLabel: label
//               required
//             }
//             ... on FormSelect {
//               name
//               selectLabel: label
//               options {
//                 value
//                 option
//               }
//               required
//             }
//           }
//         }
//       }
//     }
//     `,
//     variables
//   );

//   return {
//     props: {
//       page,
//     },
//   };
// }

// export default function Index(props) {
//   return <pre>{JSON.stringify(props, null, 2)}</pre>;
// }

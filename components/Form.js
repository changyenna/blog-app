// import { useState } from 'react';
// import { useForm, FormContext, FormProvider } from 'react-hook-form';
// import { Layout } from '../components';

// import * as Fields from './FormFields';

// export default function Form({ id, fields }) {
//   if (!fields) return null;

//   // console.log(id);

//   const { handleSubmit, ...methods } = useForm();
//   const [success, setSuccess] = useState(null);
//   const [error, setError] = useState(null);

//   const onSubmit = async (values) => {
//     try {
//       const response = await fetch('/api/submit', {
//         method: 'POST',
//         body: JSON.stringify({ id, ...values }),
//       });

//       // console.log(values);

//       if (!response.ok) {
//         throw new Error(`Something went wrong submitting the form.`);
//       }

//       setSuccess(true);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (success) return <p>Form submitted. We'll be in touch!</p>;

//   return (
//     <Layout>
//       <FormProvider {...methods}>
//         <div className="container flex-col h-auto mx-auto max-w-screen-lg px-10 py-10 pt-10 pb-10">
//           <h3 className="text-xl mb-8 font-semibold border-b pb-4">
//             Create a New Post
//           </h3>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {fields.map(({ __typename, ...field }, index) => {
//               const Field = Fields[__typename];

//               if (!Field) return null;

//               return <Field key={index} {...field} />;
//             })}

//             <button
//               type="submit"
//               className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </FormProvider>
//     </Layout>
//   );
// }

// {
//   /* <div className="container flex-col h-auto mx-auto max-w-screen-lg px-0"> */
// }
// //       <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
// //         <h3 className="text-xl mb-8 font-semibold border-b pb-4">
// //           Create a New Post
// //         </h3>
// //         <div className="grid grid-cols-1 gap-4 mb-4">
// //           <textarea
// //             value={formData.title}
// //             onChange={onInputChange}
// //             className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
// //             name="title"
// //             placeholder="Title"
// //           />
// //         </div>
// //         <div className="grid grid-cols-1 gap-4 mb-4">
// //           <input
// //             type="text"
// //             value={formData.slug}
// //             onChange={onInputChange}
// //             className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
// //             placeholder="title-in-lowercase-and-with-hypens"
// //             name="slug"
// //           />
// //         </div>
// //         <div className="grid grid-cols-1 gap-4 mb-4">
// //           <textarea
// //             value={formData.excerpt}
// //             onChange={onInputChange}
// //             className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
// //             placeholder="Excerpt"
// //             name="excerpt"
// //           />
// //         </div>
// //         <div className="grid grid-cols-1 gap-4 mb-4">
// //           <label>Content</label>
// //           {typeof window !== 'undefined' && (
// //             <ReactQuill
// //               value={formData.content}
// //               onChange={onQuillChange}
// //               className="p-4 w-full rounded-lg h-80 bg-gray-100"
// //             />
// //           )}
// //         </div>
// //         <br />
// //         {/* <div className="grid grid-cols-1 gap-4 mb-4">
// //           <input
// //             type="text"
// //             value={formData.featuredImage}
// //             onChange={onInputChange}
// //             className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
// //             name="featuredImage"
// //             placeholder="Paste featured image URL here"
// //           />
// //         </div> */}

// //         <div className="grid grid-cols-1 gap-4 mb-4">
// //           <div>
// //             <input
// //               checked={formData.featuredPost}
// //               onChange={onInputChange}
// //               type="checkbox"
// //               name="featuredPost"
// //               value="true"
// //             />
// //             <label className="text-gray-500 cursor-pointer" htmlFor="storeData">
// //               {' '}
// //               Featured Post
// //             </label>
// //           </div>
// //         </div>

// //         {error && (
// //           <p className="text-xs text-red-500">All fields are mandatory</p>
// //         )}
// //         <div className="mt-8">
// //           <button
// //             type="button"
// //             onClick={handlePostSubmission}
// //             className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
// //           >
// //             Post
// //           </button>
// //           {showSuccessMessage && (
// //             <span className="text-xl float-right font-semibold mt-3 text-green-500">
// //               Post submitted
// //             </span>
// //           )}
// //         </div>
// //       </div>
// //     </div>

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Layout, PostForm } from '../components';

// import * as Fields from './FormFields';

export default function Form({ id, fields }) {
  const correctPassword = 'KRONOS'; // Replace with the actual correct password

  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);

  const { handleSubmit, ...methods } = useForm();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify({ id, ...values }),
      });

      if (!response.ok) {
        throw new Error(`Something went wrong submitting the form.`);
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setShowForm(true);
    }
  };

  if (success) return <p>Form submitted. We&apos;ll be in touch!</p>;

  if (!showForm) {
    return (
      <div className="container flex justify-center items-center mx-auto pb-40 max-w-screen-lg h-screen">
        <div className="text-center">
          <h3 className="text-xl mb-5 font-semibold">Enter Password</h3>
          <form
            onSubmit={handlePasswordSubmit}
            className="flex flex-col items-center"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-4 mb-5 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Submit Password
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render the form after correct password is inputted
  return (
    <Layout>
      <div className="mx-auto">
        <PostForm></PostForm>
      </div>
    </Layout>
  );
}

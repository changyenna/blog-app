import { useState } from 'react';
import { Layout, PostForm } from '../components';

// import * as Fields from './FormFields';

export default function Admin({ id, fields }) {
  //   const correctPassword = 'KRONOS'; // Replace with the actual correct password

  //   const [password, setPassword] = useState('');
  //   const [showForm, setShowForm] = useState(false);

  //   const handlePasswordSubmit = () => {
  //     if (password === correctPassword) {
  //       setShowForm(true);
  //     }
  //   };

  //   if (!showForm) {
  //     return (
  //       <div className="container flex justify-center items-center mx-auto pb-40 max-w-screen-lg h-screen">
  //         <div className="text-center">
  //           <h3 className="text-xl mb-5 font-semibold">Enter Password</h3>
  //           <form
  //             onSubmit={handlePasswordSubmit}
  //             className="flex flex-col items-center"
  //           >
  //             <input
  //               type="password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               className="py-2 px-4 mb-5 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
  //             />
  //             <button
  //               type="submit"
  //               className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
  //             >
  //               Submit Password
  //             </button>
  //           </form>
  //         </div>
  //       </div>
  //     );
  //   }

  // Render the form after correct password is inputted
  return (
    <Layout>
      <div className="mx-auto">
        <PostForm></PostForm>
      </div>
    </Layout>
  );
}

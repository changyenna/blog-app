import React from 'react';
// import { useRouter } from 'next/router';

import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
  Layout,
} from '../../components';
import { getPosts, getPostDetails } from '../../services';
// import { AdjacentPosts } from '../../sections';

const PostDetails = ({ post }) => {
  // const router = useRouter();

  // if (router.isFallback) {
  //   return <Loader />;
  // }
  return (
    <>
      <Layout>
        <div className="container flex-col h-auto mx-auto max-w-screen-lg px-10">
          <div className="grid grid-cols-7 gap-5">
            <div className="col-span-2">
              <div className="relative lg:sticky top-8">
                <Categories />
              </div>
            </div>
            <div className="col-span-3">
              {/* <PostDetail post={post} /> */}
              {/* <Author author={post.author} /> */}
              {/* <AdjacentPosts slug={post.slug} createdAt={post.createdAt} /> */}
              <CommentsForm />
              <Comments />
            </div>
            <div className="col-span-2">
              <div className="relative lg:sticky top-8">
                adjacent posts photo gallery
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default PostDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

// // Specify dynamic routes to pre-render pages based on data.
// // The HTML is generated at build time and will be reused on each request.

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}

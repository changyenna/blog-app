import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }
  if (!post) {
    return <Loader />;
  }
  return (
    <>
      <Layout>
        <div className="container flex-col h-auto mx-auto max-w-screen-xl px-10">
          <div className="grid grid-cols-7 gap-5">
            {isLargeScreen && (
              <div className="md:col-span-2 flex justify-center">
                <div className="relative md:fixed top-21 ">
                  <Categories />
                </div>
              </div>
            )}

            <div className="md:col-span-3 sm:col-span-7 xs:col-span-7">
              <PostDetail post={post} />
              {/* <Author author={post.author} /> */}
              {/* <AdjacentPosts slug={post.slug} createdAt={post.createdAt} /> */}
              <CommentsForm slug={post.slug} />
              <Comments slug={post.slug} />
            </div>
            {isLargeScreen && (
              <div className="md:col-span-2  flex justify-center">
                <div className="relative md:fixed top-21">
                  adjacent posts photo gallery
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};
export default PostDetails;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  // console.log('Data:', data);
  return {
    props: {
      post: data,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  // Filter out entries without slugs and then generate paths
  const paths = posts
    .filter(({ node }) => node && node.slug) // Filter out undefined or null posts
    .map(({ node }) => ({ params: { slug: node.slug } }));

  return {
    paths,
    fallback: true,
  };
}

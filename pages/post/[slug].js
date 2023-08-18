import React from 'react';
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
  // console.log('Inside Post Details ', post);

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
            <div className="col-span-2">
              <div className="relative lg:sticky top-8">
                <Categories />
              </div>
            </div>
            <div className="col-span-3">
              <PostDetail post={post} />
              {/* <Author author={post.author} /> */}
              {/* <AdjacentPosts slug={post.slug} createdAt={post.createdAt} /> */}
              <CommentsForm slug={post.slug} />
              <Comments slug={post.slug} />
            </div>
            <div className="col-span-2">
              <div className="relative lg:sticky top-8">
                adjacent posts photo gallery
                {/* <PostWidget /> */}
              </div>
            </div>
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

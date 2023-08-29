import { PostCard, Layout } from '../components';
import { getRecentPosts } from '../services';

export default function Home({ posts }) {
  // console.log('Posts received:', posts);
  return (
    <Layout>
      <div className="container flex-col h-auto mx-auto max-w-screen-lg px-0">
        <div className="grid grid-cols-1 gap-0">
          <div className="col-span-1">
            {posts
              .slice()
              .sort((postA, postB) => {
                return new Date(postB.createdAt) - new Date(postA.createdAt);
              })
              .map((post, index) => (
                <PostCard key={index} post={post} />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const posts = await getRecentPosts();

  return {
    props: { posts },
    revalidate: 60,
  };
}

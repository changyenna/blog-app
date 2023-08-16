import { PostCard, Categories, PostWidget, Layout } from '../components';
import { getPosts } from '../services';

export default function Home({ posts }) {
  console.log('Posts: ', posts);
  return (
    <Layout>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {posts.map((post, index) => (
              <PostCard key={post.title} post={post.node} />
            ))}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}

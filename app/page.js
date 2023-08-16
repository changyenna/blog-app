import { PostCard, Categories, PostWidget, Layout } from '../components';

const post = [
  { title: 'React Testing', excerpt: 'Learn React Testing' },
  { title: 'React Testing', excerpt: 'Learn React Testing' },
];

export default function Home({ posts }) {
  return (
    <Layout>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {post.map((post, index) => (
              <PostCard key={index} post={post} />
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

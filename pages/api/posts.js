import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function posts(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const contentString = JSON.stringify(req.body.content); // Stringify the content

  console.log('Received Content:', contentString);

  const query = gql`
    mutation CreatePost(
      $title: String!
      $slug: String!
      $excerpt: String!
      $content: RichTextAST!
      $featuredPost: Boolean
    ) {
      createPost(
        data: {
          title: $title
          slug: $slug
          excerpt: $excerpt
          content: $content
          featuredPost: $featuredPost
        }
      ) {
        title
        content {
          raw
        }
      }
    }
  `;

  const result = await graphQLClient.request(query, {
    title: req.body.title,
    slug: req.body.slug,
    excerpt: req.body.excerpt,
    content: req.body.content,
    featuredPost: req.body.featuredPost,
  });

  console.log('Sending Variables:', result);

  return res.status(200).send(result);
}

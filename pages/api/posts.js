import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function posts(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const contentString = JSON.stringify(req.body.content);

  console.log('Received Content:', contentString);

  const query = gql`
    mutation CreatePost(
      $title: String!
      $slug: String!
      $excerpt: String!
      $content: RichTextAST!
      $featuredPost: Boolean
      $featuredImage: ID!
    ) {
      createPost(
        data: {
          title: $title
          slug: $slug
          excerpt: $excerpt
          content: $content
          featuredPost: $featuredPost
          featuredImage: { connect: { id: $featuredImage } }
          author: { connect: { id: "clldemm4df8qk0bmtcmromun7" } }
        }
      ) {
        id
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
    featuredImage: req.body.featuredImage,
    featuredPost: req.body.featuredPost,
  });

  return res.status(200).send(result);
}

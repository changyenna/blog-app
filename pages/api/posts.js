import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

// export a default function for API route to work
export default async function posts(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreatePost(
      $title: String!
      $slug: String!
      $excerpt: String!
      $content: RichTextAST!
      $featuredPost: Boolean!
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
        id
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

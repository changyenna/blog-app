import { GraphQLClient, gql } from 'graphql-request';

export default async function publishPost(req, res) {
  const postId = req.query.id;
  console.log('Post ID inside async function:', postId);

  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const mutation = gql`
    mutation PublishPost($id: ID!) {
      publishPost(where: { id: $id }, to: PUBLISHED) {
        id
      }
    }
  `;

  try {
    console.log('Attempting to publish post...');

    const result = await graphQLClient.request(mutation, {
      id: postId,
    });

    console.log('Publish result:', JSON.stringify(result, null, 2));

    res.status(200).json(result.publishPost);
  } catch (error) {
    console.error('Error publishing post:', error);
    res.status(500).json({ error: 'Error publishing post' });
  }
}

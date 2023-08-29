import { GraphQLClient, gql } from 'graphql-request';

export default async function handler(req, res) {
  const { id } = req.query; // This will capture the ID from the route parameter

  // Create a GraphQL client
  const graphQLClient = new GraphQLClient(
    process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
    {
      headers: {
        Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
      },
    }
  );

  // Define your GraphQL mutation for publishing the post
  const mutation = gql`
    mutation PublishPost($id: ID!) {
      publishPost(where: { id: $id }, to: PUBLISHED) {
        id
      }
    }
  `;

  try {
    // Execute the GraphQL mutation
    await graphQLClient.request(mutation, {
      id, // Pass the ID captured from the route parameter
    });

    // Respond with success
    res.status(200).json({ message: 'Post published successfully' });
  } catch (error) {
    console.error('Error publishing post:', error);
    res.status(500).json({ error: 'Error publishing post' });
  }
}

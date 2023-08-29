import { GraphQLClient, gql } from 'graphql-request';

export default async function publishAsset(req, res) {
  const assetId = req.query.id;

  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const mutation = gql`
    mutation PublishAsset($id: ID!) {
      publishAsset(where: { id: $id }, to: PUBLISHED) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(mutation, {
      id: assetId,
    });

    // Respond with the published asset data
    res.status(200).json(result.publishAsset);
  } catch (error) {
    console.error('Error publishing asset:', error);
    res.status(500).json({ error: 'Error publishing asset' });
  }
}

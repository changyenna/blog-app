import { GraphQLClient, gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async ({ body }, res) => {
  try {
    // console.log('Received request body:', body);

    const { id, ...data } = JSON.parse(body);

    // console.log('Parsed data:', data);
    // console.log('Form ID:', id);

    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
      },
    });

    const query = gql`
      mutation createSubmission($data: Json!, $id: ID!) {
        createSubmission(
          data: { formData: $data, form: { connect: { id: $id } } }
        ) {
          id
        }
      }
    `;

    const result = await graphQLClient.request(query, {
      data, // Assuming data includes name, email, comment, and slug
      id,
    });

    // console.log('GraphQL mutation result:', result);

    res.status(201).json(result.createSubmission); // Return the created submission
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ message: error.message });
  }
};

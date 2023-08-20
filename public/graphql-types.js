// graphql-types.js
export const typeDefs = `
  type Mutation {
    createPost(data: PostCreateInput!): Post!
  }
  
  input PostCreateInput {
    title: String!
    slug: String!
    excerpt: String!
    featuredImage: AssetCreateOneInlineInput!
    featuredPost: Boolean!
  }
  
  input AssetCreateOneInlineInput {
    create: AssetCreateInput
    connect: AssetWhereUniqueInput
  }
  
  input AssetCreateInput {
    # Define fields for creating an asset here
    # For example: filename, mimeType, url, etc.
  }
  
  input AssetWhereUniqueInput {
    id: ID
    # Define other unique identifying fields here
  }
`;

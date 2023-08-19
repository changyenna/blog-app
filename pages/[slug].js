import React from 'react';
import { GraphQLClient } from 'graphql-request';
import Form from '../components/Form';

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT);

export async function getStaticPaths() {
  const { pages } = await hygraph.request(`{
        pages {
            slug
        }
    }`);

  return {
    paths: pages.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params: variables }) {
  const { page } = await hygraph.request(
    `query page($slug: String!) {
      page(where: {slug: $slug}) {
        title
        slug
        form {
          id  
          fields {
            __typename
            ... on FormInput {
              name
              type
              inputLabel: label
              placeholder
              required
            }
            ... on FormTextarea {
              name
              textareaLabel: label
              placeholder
              required
            }
            ... on FormCheckbox {
              name
              checkboxLabel: label
              required
            }
            ... on FormSelect {
              name
              selectLabel: label
              options {
                value
                option
              }
              required
            }
          }
        }
      }
    }
    `,
    variables
  );
  // console.log('Fetched page data:', page);
  return {
    props: {
      page,
    },
  };
}

export default function Index({ page }) {
  const { form } = page;
  console.log(form);
  return <Form {...form} />;
}

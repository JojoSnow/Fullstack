import { gql } from '@apollo/client/core';

export const GET_REPOSITORIES = gql`
	query {
		repositories {
			edges {
				node {
					id
					fullName
					ratingAverage
					reviewCount
					stargazersCount
					forksCount
					url
					ownerAvatarUrl
					description
				}
			}
		}
	}
`;
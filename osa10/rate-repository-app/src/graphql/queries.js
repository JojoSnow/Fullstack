import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
	query Repositories(
		$first: Int, 
		$after: String,
		$orderDirection: OrderDirection, 
		$orderBy: AllRepositoriesOrderBy,
		$searchKeyword: String
	)
		{
		repositories(
			first: $first, 
			after: $after,
			orderDirection: $orderDirection, 
			orderBy: $orderBy,
			searchKeyword: $searchKeyword
		)
		{
			totalCount
				pageInfo {
					endCursor
					startCursor
					hasNextPage
					hasPreviousPage
				}
			edges {
				cursor
				node {
					id
					ownerName
					name
					createdAt
					fullName
					ratingAverage
					reviewCount
					stargazersCount
					watchersCount
					forksCount
					openIssuesCount
					url
					ownerAvatarUrl
					description
					language
					userHasReviewed
				}
			}
		}
	}
`;

export const GET_REPOSITORY = gql`
	query Repository($repositoryId: ID!, $first: Int, $after: String) {
		repository(id: $repositoryId) {
			id
			fullName
			url
			ownerName
			name
			ratingAverage
			reviewCount
			stargazersCount
			watchersCount
			forksCount
			openIssuesCount
			ownerAvatarUrl
			description
			language
			userHasReviewed
			createdAt
			reviews(first: $first, after: $after) {
				totalCount
				pageInfo {
					hasPreviousPage
					hasNextPage
					startCursor
					endCursor
				}
				edges {
					cursor
					node {
						id
						user {
							id
							username
							createdAt
						}
						repository {
							id
							fullName
						}
						userId
						repositoryId
						rating
						createdAt
						text
					}
				}
			}
		}
	}
`;

export const USER = gql`
	query User{
		me {
			id
			username
		}
	}	
`;
import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
	query Repositories(
		$orderDirection: OrderDirection, 
		$orderBy: AllRepositoriesOrderBy,
		$searchKeyword: String
	)
		{
		repositories(
			orderDirection: $orderDirection, 
			orderBy: $orderBy,
			searchKeyword: $searchKeyword
		)
		{
			edges {
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
	query Repository($repositoryId: ID!) {
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
			reviews {
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
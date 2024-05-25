// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
const QUERY = `
query ($isFollowing: Boolean = true, $hasReplies: Boolean = false, $activityType: ActivityType, $page: Int) {
  Page(page: $page, perPage: 25) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    activities(isFollowing: $isFollowing, type: $activityType, hasRepliesOrTypeText: $hasReplies, type_in: [TEXT, ANIME_LIST, MANGA_LIST], sort: ID_DESC) {
      ... on TextActivity {
        id
        userId
        type
        replyCount
        text
        isLocked
        isSubscribed
        isLiked
        likeCount
        createdAt
        user {
          id
          name
          donatorTier
          donatorBadge
          moderatorRoles
          avatar {
            large
          }
        }
      }
      ... on ListActivity {
        id
        userId
        type
        status
        progress
        replyCount
        isLocked
        isSubscribed
        isLiked
        likeCount
        createdAt
        user {
          id
          name
          donatorTier
          donatorBadge
          avatar {
            large
          }
        }
        media {
          id
          type
          status
          isAdult
          title {
            userPreferred
          }
          bannerImage
          coverImage {
            large
          }
        }
      }
    }
  }
}`;

// Define our query variables and values that will be used in the query request
const VARIABLES = {
  page: 1,
  type: "global",
  filter: "status",
  isFollowing: false,
  hasReplies: true,
  activityType: "TEXT"
};

// Define the config we'll need for our Api request
const url = 'https://graphql.anilist.co',
  options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: QUERY,
      variables: VARIABLES
    })
  };

export const getAnilistSocialFeed = async () => {
  try {
    const response = await fetch(url, options);
    const data = await handleResponse(response);
    return handleData(data);
  } catch (error) {
    return handleError(error);
  }
}

async function handleResponse(response: Response) {
  const json = await response.json();
  if (response.ok) {
    return json;
  } else {
    throw new Error(json);
  }
}

function handleData(data: any) {
  return data;  // Return data
}

function handleError(error: any) {
  console.error("Error, check console", error);
  throw error;  // Throw error
}

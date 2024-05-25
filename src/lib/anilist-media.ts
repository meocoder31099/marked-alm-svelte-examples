// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
const QUERY = `
query media($id: Int) {
  Media(id: $id, isAdult: false) {
    id
    title {
      userPreferred
    }
    coverImage {
      large
    }
    type
    format
    status(version: 2)
    averageScore
    popularity
    genres
    season
    seasonYear
    bannerImage
    startDate {
      year
    }
  }
}`;

// Define the config we'll need for our Api request
const url = 'https://graphql.anilist.co';

export const getAnilistMedia = async (mediaId: number) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          id: mediaId
        }
      })
    };
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

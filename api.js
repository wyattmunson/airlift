// successive API calls
const buildHeaders = () => {
  const headerConfig = new Headers();
  headerConfig.append("Authorization", `Bearer ${process.env.API_KEY}`);
  return headerConfig;
};

export const fetchPaginatedData = async (url, data = []) => {
  const config = {
    method: "GET",
    headers: buildHeaders(),
  };

  try {
    const response = await fetch(url, config);
    const responseData = await response.json();

    // Add the data from the current page to the accumulated data
    data = data.concat(responseData);

    // Check if there is a "next" link in the Link header
    const linkHeader = response.headers.get("link");
    const nextPageUrl = extractNextPageUrl(linkHeader);

    // If there is a next page, recursively fetch the data from that page
    if (nextPageUrl) {
      return fetchPaginatedData(nextPageUrl, data);
    }

    return data;
  } catch (error) {
    console.error("Error fetching paginated data:", error);
    throw error;
  }
};

const extractNextPageUrl = (linkHeader) => {
  if (linkHeader) {
    const links = linkHeader.split(",");

    for (const link of links) {
      const [url, rel] = link.split(";");
      if (rel.includes("next")) {
        return url.slice(1, -1);
      }
    }
  }

  return null;
};

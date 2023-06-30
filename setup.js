const apiEndpoints = {
  getAllBuilds: "https://api.buildkite.com/v2/builds?per_page=2",
  getPipelinesByOrg: "https://api.buildkite.com/v2/organizations/",
};

export const checkApiKey = (apiKey) => {
  if (!apiKey) {
    console.error("ERR: Buildkite API key not detected. Exiting.");
    throw new Error("API_KEY variable missing. Exiting.");
  }
  return "API key detected";
};

export const checkOrgSlug = (slug) => {
  if (!slug) {
    console.error("ERR: Organization slug not provided");
    throw new Error("ORG_SLUG environment variable not supplued.");
  }
  return "Org slug detected";
};

export const getStart = (startDate) => {
  const currentDate = new Date();
  if (startDate) {
    console.log("Start date detected");
    const formattedDate = new Date(startDate);
    console.log("Formatted start date:", formattedDate);
    return convertToISO8601(startDate);
  } else {
    console.log("No start date provided. Defaulting to 6 months");
    return convertToISO8601(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate())
    );
  }
};

export const getEnd = (endDate) => {
  if (endDate) {
    console.log("END_TIMESTAMP detected");
    const formattedDate = convertToISO8601(new Date(endDate));
    return formattedDate;
  } else {
    console.log("END_TIMESTAMP not provided, defaulting to today");
    return convertToISO8601(new Date());
  }
};

export const getBuildsUrl = (start, end) => {
  let url = apiEndpoints.getAllBuilds;
  url = url + "&created_from=" + getStart(start);
  url = url + "&created_to=" + getEnd(end);
  return url;
};
export const getPipelinesUrl = (orgSlug) => {
  let url = apiEndpoints.getPipelinesByOrg;
  url = url + orgSlug;
  url = url + "/pipelines";
  return url;
};

export const getAgentsUrl = (orgSlug) => {
  let url = apiEndpoints.getPipelinesByOrg;
  url = url + orgSlug;
  url = url + "/agents";
  return url;
};

const convertToISO8601 = (date) => {
  return date.toISOString();
};

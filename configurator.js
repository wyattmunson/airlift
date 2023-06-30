const apiEndpoints = {
  getAllBuilds: "https://api.buildkite.com/v2/builds?per_page=2",
};

class Configurator {
  constructor(apiKey, startDate, endDate) {
    this.apiKey = apiKey;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  checkApiKey() {
    if (!this.apiKey) {
      console.error("ERR: Buildkite API key not detected. Exiting.");
      throw new Error("API_KEY variable missing. Exiting.");
    }
    return "API key detected";
  }

  getStart() {
    const currentDate = new Date();
    if (this.startDate) {
      console.log("Start date detected");
      const formattedDate = new Date(this.startDate);
      console.log("Formatted start date:", formattedDate);
      return this.convertToISO8601(this.startDate);
    } else {
      console.log("No start date provided. Defaulting to 6 months");
      return this.convertToISO8601(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate())
      );
    }
  }

  getEnd() {
    if (this.endDate) {
      console.log("END_TIMESTAMP detected");
      const formattedDate = this.convertToISO8601(new Date(this.endDate));
      return formattedDate;
    } else {
      console.log("END_TIMESTAMP not provided, defaulting to today");
      return this.convertToISO8601(new Date());
    }
  }

  getBuildsUrl() {
    let url = apiEndpoints.getAllBuilds;
    url = url + "&created_from=" + this.getStart();
    url = url + "&created_to=" + this.getEnd();
    console.log(url);
  }

  convertToISO8601(date) {
    return date.toISOString();
  }
}

export default Configurator;

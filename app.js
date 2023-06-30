import {
  checkApiKey,
  checkOrgSlug,
  getBuildsUrl,
  getEnd,
  getPipelinesUrl,
  getStart,
  getAgentsUrl,
} from "./setup.js";
import { fetchPaginatedData } from "./api.js";
import { writeToFile } from "./fileWriter.js";

const apiKey = process.env.API_KEY;
const startDate = process.env.START_TIMESTAMP;
const endDate = process.env.END_TIMESTAMP;
const orgSlug = process.env.ORG_SLUG;

const main = async () => {
  welcomeMessage();

  checkApiKey(apiKey);
  checkOrgSlug(orgSlug);

  const startTimestamp = getStart(startDate);
  const endTimestamp = getEnd(endDate);
  const buildUrl = getBuildsUrl(startDate, endDate);
  const pipelineUrl = getPipelinesUrl(orgSlug);
  const agentsUrl = getAgentsUrl(orgSlug);
  // WORKING:
  const buildTime = await getBuilds(buildUrl);
  const pipelines = await getPipelines(pipelineUrl);
  const agents = await getAgents(agentsUrl);
  generateReport(buildTime, pipelines, agents);
  console.log("!!!!! EOE !!!!!");
};

const generateReport = (build, pipeline, agents) => {
  console.log("\n===== FINAL REPORT =====\n");
  console.log("TOTAL NO. OF BUILDS:", build.numberOfBuilds);
  console.log("BUILD TIME IN MINUTES:", build.totalBuildTime);
  console.log("TOTAL NO. OF PIPELINES:", pipeline.numberOfPipelines);
  console.log("TOTAL NO. OF AGENTS:", agents.numberOfAgents);
};

const getBuilds = async (url) => {
  generateSectionheader("BUILDS");
  const results = await fetchPaginatedData(url);
  const times = calculateTimes(results);
  const timeInSeconds = times * 0.001;
  return times;
};

const getAgents = async (url) => {
  generateSectionheader("AGENTS");
  const results = await fetchPaginatedData(url);
  const numberOfAgents = results.length;
  writeToFile(`TOTAL NUMBER OF AGENTS: ${numberOfAgents}`);
  writeToFile(results, "agents.json");
  return {
    numberOfAgents: numberOfAgents,
    agents: results,
  };
};

const getPipelines = async (url) => {
  generateSectionheader("PIPELINES");
  console.log("Fetching pipeline information...");

  const results = await fetchPaginatedData(url);
  const pipelineCount = results.length;
  writeToFile(`TOTAL NUMBER OF PIPELINES: ${pipelineCount}`);
  writeToFile(results, "pipeline.json");

  return {
    numberOfPipelines: pipelineCount,
    pipelines: results,
  };
};

const calculateTimes = (results) => {
  let totalTime = 0;

  results.forEach((item) => {
    const startT = new Date(item.started_at);
    const endT = new Date(item.finished_at);
    const diff = endT.getTime() - startT.getTime();
    totalTime += diff;
  });

  // calculations
  const totalBuilds = results.length;
  writeToFile(`TOTAL NUMBER OF BUILDS: ${totalBuilds}`);
  writeToFile(`TOTAL BUILD TIME (seconds) ${totalTime * 0.001}`);
  return {
    numberOfBuilds: totalBuilds,
    totalBuildTime: (totalTime * 0.001) / 60,
  };
};

const generateSectionheader = (section) => {
  writeToFile(`\n===== ${section} =====\n`);
};

const welcomeMessage = () => {
  console.log("    ___    _      __    _ ______ ");
  console.log("   /   |  (_)____/ /   (_) __/ /_");
  console.log("  / /| | / / ___/ /   / / /_/ __/");
  console.log(" / ___ |/ / /  / /___/ / __/ /_  ");
  console.log("/_/  |_/_/_/  /_____/_/_/  __/  ");
};

main();

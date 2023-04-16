const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const util = require("util");
const fs = require("fs/promises");

const question = util.promisify(readline.question).bind(readline);

const getTitle = (title) => {
  return `# ${title}\n\n`;
};

const getDescription = (description) => {
  return `## Description\n\n${description}\n\n`;
};

const getInstallation = (installation) => {
  return `## Installation\n\n${installation}\n\n`;
};

const getUsage = (usage) => {
  return `## Usage\n\n${usage}\n\n`;
};

const getLicenseBadge = (license) => {
  return `![License](https://img.shields.io/badge/license-${license}-blue.svg)\n\n`;
};

const getLicense = (license) => {
  return `## License\n\n${license} license\n\n`;
};

const getContributing = (contributing) => {
  return `## Contributing\n\n${contributing}\n\n`;
};

const getTests = (tests) => {
  return `## Tests\n\n${tests}\n\n`;
};

const getQuestions = (githubUsername, email) => {
  return `## Questions
  
[My Github](https://github.com/${githubUsername})

Contact ${email} for any questions.\n\n`;
};

const generateReadme = async () => {
  const title = await question("Please input your repository name: ");
  const description = await question("Please input description: ");
  const installation = await question("Installation guide: ");
  const usage = await question("Usage: ");
  let license = await question(
    "Choose a license: (1) MIT (2) Apache (3) GPL: "
  );
  while (!["1", "2", "3"].includes(license)) {
    license = await question(
      "License has to be one of these options: (1) MIT (2) Apache (3) GPL: "
    );
  }
  const licenseText = ["MIT", "Apache", "GPL"][Number.parseInt(license) - 1];
  const contributing = await question("Contributing: ");
  const tests = await question("Tests: ");

  const githubUsername = await question("Github username: ");
  const email = await question("Email: ");

  let content = "";

  content =
    content +
    getTitle(title) +
    getLicenseBadge(licenseText) +
    getDescription(description) +
    getInstallation(installation) +
    getUsage(usage) +
    getLicense(licenseText) +
    getContributing(contributing) +
    getTests(tests) +
    getQuestions(githubUsername, email);

  await fs.writeFile("./README.md", "");
  await fs.appendFile("./README.md", content);

  process.exit(0);
};

generateReadme();
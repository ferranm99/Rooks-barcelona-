const cp = require("child_process");
cp.execSync(`cd ${__dirname}; npm ci`);

const core = require("@actions/core");
const github = require("@actions/github");

const token = core.getInput("token", { required: true });
const tag = core.getInput("tag", { required: true });
const changelog = core.getInput("changelog", { required: true });
const isTagStable = core.getInput("is-tag-stable", { required: true });

const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split("/");

console.log("isTagStable value is ", isTagStable)

const octokit = new github.GitHub(token);

octokit.repos.createRelease({
    owner: repoOwner,
    repo: repoName,
    tag_name: tag,
    body: JSON.parse(changelog),
    draft: true,
    prerelease: false,
    name: tag,
});
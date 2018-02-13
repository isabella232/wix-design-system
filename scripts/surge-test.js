const {spawn} = require('child_process');
// const https = require('https');
const {
  TRAVIS_REPO_SLUG: travisRepoSlug,
  STORYBOOK_DIST: storybookDist,
  TRAVIS_PULL_REQUEST: travisPullRequest
  // GITHUB_API_TOKEN: githubApiToken
} = process.env;


const [repoOwner, repoName] = (travisRepoSlug.split('/'));
const deployPath = `/home/travis/build/${repoOwner}/${repoName}/${storybookDist}`;

const deploySubdomain = `pr-${travisPullRequest}`;
const deployDomain = `https://${repoOwner}-${repoName}-${deploySubdomain}.surge.sh`;
const str = ` --project ${deployPath} --domain ${deployDomain}`;

const childProcess = spawn('node', [`${process.cwd()}/node_modules/.bin/surge`, '--project', deployPath, '--domain', deployDomain]);
childProcess.on('close', () => {
  console.log(str);
  console.log('ON CLOSE');
});
childProcess.on('error', (e) => {
  console.log(e, 'ON ERROR');
});

//
// const githubCommentsPath = `/repos/${travisRepoSlug}/issues/${travisPullRequest}/comments`;
// const githubCommentsData = {
//   body: `View storybook at: ${deployDomain}`
// };
//
// const options = {
//   hostname: 'api.github.com',
//   path: githubCommentsPath,
//   port: 443,
//   method: 'POST',
//   data: JSON.stringify(githubCommentsData),
//   headers: {
//     Authorization: `token ${githubApiToken}`
//   }
// };
// try {
//   https.request(options, () => {
//     console.log('Success');
//   });
// } catch (e) {
//   console.error(e, 'ERROR IN GITHUB COMMENTS');
// }


const tasks = arr => arr.join(' && ');

module.exports = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': tasks([
      'counter=`git diff --cached --numstat | wc -l` && if [ $counter -eq 0 ]; then exit; fi',
      'npx pretty-quick --staged --pattern \"**/*.{json,md,yaml,yml}\"',
      'npx lint-staged',
      'npx ts-node .scripts/validate-dir-names.ts',
      'yarn run test'
    ]),
    'post-commit': 'git update-index --again',
  },
};

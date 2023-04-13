module.exports = {
  branches: ['master'],
  ci: false,
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    { '@semantic-release/changelog': { changelogFile: 'CHANGELOG.md' } },
    [
      '@semantic-release/npm',
      {
        assets: ['package.json', 'app.config.js'],
        npmPublish: false
      }
    ],
    [
      '@semantic-release/exec',
      {
        successCmd: 'node ./script/release/index.js "${nextRelease.version}"'
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'app.config.js'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ],
    '@semantic-release/github'
  ]
};

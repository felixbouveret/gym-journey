module.exports = {
  branches: ['master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    { '@semantic-release/changelog': { changelogFile: 'CHANGELOG.md' } },
    '@semantic-release/release-notes-generator',
    'semantic-release-expo',
    '@semantic-release/github',
    [
      '@semantic-release/npm',
      {
        assets: ['CHANGELOG.md', 'package.json', 'app.json'],
        npmPublish: false
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'app.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ]
};

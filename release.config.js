module.exports = {
  branches: ['master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    [
      '@semantic-release/npm',
      {
        assets: ['package.json', 'app.config.js'],
        npmPublish: false
      }
    ],
    { '@semantic-release/changelog': { changelogFile: 'CHANGELOG.md' } },
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'app.config.js'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ]
};

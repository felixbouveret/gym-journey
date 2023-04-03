module.exports = {
  branches: ['master'],

  plugins: [
    '@semantic-release/commit-analyzer',
    { '@semantic-release/changelog': { changelogFile: 'CHANGELOG.md' } },
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        npmPublish: false
      }
    ],
    '@semantic-release/github'
  ]
};

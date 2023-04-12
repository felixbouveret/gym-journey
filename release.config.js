module.exports = {
  branches: ['master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    { '@semantic-release/changelog': { changelogFile: 'CHANGELOG.md' } },
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    [
      '@semantic-release/npm',
      {
        npmPublish: false
      }
    ],
    [
      '@semantic-release/git',
      {
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ]
};

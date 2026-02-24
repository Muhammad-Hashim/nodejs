module.exports = {
  branches: ["main"],
  tagFormat: "${version}",
  plugins: [
    // 1. Analyze commits
    ["@semantic-release/commit-analyzer", { preset: "angular" }],

    // 2. Generate release notes
    ["@semantic-release/release-notes-generator", { preset: "angular" }],

    // 3. Update CHANGELOG.md
    ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],

    // 4. Update package.json version
    [
      "@semantic-release/npm",
      {
        pkgRoot: ".",        // Make sure this points to your package.json folder
        npmPublish: false,   // Set true if you want to publish to npm
      },
    ],

    // 5. Commit updated files
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],

    // 6. Create GitHub release
    "@semantic-release/github",
  ],
};
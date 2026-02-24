// module.exports = {
//   branches: ["main"],
//   tagFormat: "${version}",
//   plugins: [
//     // 1. Analyze commits
//     ["@semantic-release/commit-analyzer", { preset: "angular" }],

//     // 2. Generate release notes
//     ["@semantic-release/release-notes-generator", { preset: "angular" }],

//     // 3. Update CHANGELOG.md
//     ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],

//     // 4. Update package.json version
//     [
//       "@semantic-release/npm",
//       {
//         pkgRoot: ".",        // Make sure this points to your package.json folder
//         npmPublish: false,   // Set true if you want to publish to npm
//       },
//     ],

//     // 5. Commit updated files
//     [
//       "@semantic-release/git",
//       {
//         assets: ["package.json", "CHANGELOG.md"],
//         message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
//       },
//     ],

//     // 6. Create GitHub release
//     "@semantic-release/github",
//   ],
// };


module.exports = {
  branches: ["main"],
  tagFormat: "v${version}", // Tag will be v4.2.0
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      { preset: "angular" }
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "angular",
        writerOpts: {
          transform: (commit, context) => {
            const issues = commit.references
              .map(ref => `[#${ref.issue}](${context.repositoryUrl}/issues/${ref.issue})`)
              .join(', ');

            // Only keep meaningful commits
            if (!commit.type) return;

            const typeMap = {
              feat: 'Features',
              fix: 'Bug Fixes',
              docs: 'Documentation',
              perf: 'Performance',
              refactor: 'Refactoring',
              test: 'Tests'
            };

            const type = typeMap[commit.type] || commit.type;

            const scope = commit.scope ? `**${commit.scope}:** ` : '';
            const message = `${scope}${commit.subject}${issues ? ` (${issues})` : ''}`;

            return { type, message };
          },
        },
      }
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
        changelogTitle: "# What’s New\n\n", // adds a "What's New" header at the top
      }
    ],
    [
      "@semantic-release/npm",
      {
        pkgRoot: ".",
        npmPublish: false,
      }
    ],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message: "chore(release): v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      }
    ],
    "@semantic-release/github"
  ]
};
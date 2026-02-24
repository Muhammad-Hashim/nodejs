module.exports = {
  branches: ["main"],
  
  tagFormat: "${version}",
  
  plugins: [
    ["@semantic-release/commit-analyzer", { preset: "angular" }],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "angular",
        writerOpts: {
          mainTemplate: `
## 🎉 What's New in v{{nextRelease.version}}

{{#each commits}}
{{#if (eq this.type "feat")}}
### ✨ New Features
- {{this.subject}}
{{/if}}
{{#if (eq this.type "fix")}}
### 🐛 Bug Fixes  
- {{this.subject}}
{{/if}}
{{#if (eq this.type "docs")}}
### 📚 Documentation Updates
- {{this.subject}}
{{/if}}
{{#if (eq this.type "refactor")}}
### ♻️ Code Improvements
- {{this.subject}}
{{/if}}
{{#if (eq this.type "breaking")}}
### 💥 Breaking Changes
- {{this.subject}}
{{/if}}
{{/each}}

---

### 📦 Dependencies
{{#if nextRelease.dependencies}}
Updated dependencies in this release.
{{else}}
No dependency changes.
{{/if}}

---

### 👥 Contributors
{{#each nextRelease.contributors}}
- {{this.name}} (@{{this.username}})
{{/each}}

---
          `
        }
      }
    ],
    ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    "@semantic-release/github",
  ],
};

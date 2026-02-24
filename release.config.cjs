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
          transform: (commit, context) => {
            const issues = [];
            
            commit.notes.forEach(note => {
              issues.push(note.title);
            });
            
            if (commit.type === 'feat') {
              return `✨ **New Feature**: ${commit.scope ? `**${commit.scope}**: ` : ''}${commit.subject}`;
            } else if (commit.type === 'fix') {
              return `🐛 **Bug Fix**: ${commit.scope ? `**${commit.scope}**: ` : ''}${commit.subject}`;
            } else if (commit.type === 'docs') {
              return `📚 **Documentation**: ${commit.scope ? `**${commit.scope}**: ` : ''}${commit.subject}`;
            } else if (commit.type === 'refactor') {
              return `♻️ **Refactoring**: ${commit.scope ? `**${commit.scope}**: ` : ''}${commit.subject}`;
            } else if (commit.type === 'breaking') {
              return `💥 **Breaking Change**: ${commit.scope ? `**${commit.scope}**: ` : ''}${commit.subject}`;
            }
            return `📝 **${commit.type}**: ${commit.scope ? `**${commit.scope}**: ` : ''}${commit.subject}`;
          },
          mainTemplate: `
## 🎉 What's New in v${nextRelease.version}

### ✨ New Features
{{#each commits}}
{{#if (eq this.type "feat")}}
- {{this}}
{{/if}}
{{/each}}

### 🐛 Bug Fixes
{{#each commits}}
{{#if (eq this.type "fix")}}
- {{this}}
{{/if}}
{{/each}}

### 📚 Documentation Updates
{{#each commits}}
{{#if (eq this.type "docs")}}
- {{this}}
{{/if}}
{{/each}}

### ♻️ Code Improvements
{{#each commits}}
{{#if (or (eq this.type "refactor") (eq this.type "style") (eq this.type "chore"))}}
- {{this}}
{{/if}}
{{/each}}

### 💥 Breaking Changes
{{#each commits}}
{{#if (eq this.type "breaking")}}
- {{this}}
{{/if}}
{{/each}}

---

### 📦 Dependencies
{{#if this.dependencies}}
- Updated dependencies: {{this.dependencies}}
{{else}}
- No dependency changes
{{/if}}

---

### 👥 Contributors
{{#each this.contributors}}
- {{this.name}} (@{{this.username}})
{{/each}}

---

**🔗 Full Changelog**: [View all changes](https://github.com/${owner}/${repository}/compare/${previousTag}...${nextRelease.gitTag})
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

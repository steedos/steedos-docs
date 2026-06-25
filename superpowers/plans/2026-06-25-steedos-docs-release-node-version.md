# Steedos Docs Release Node Version Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让正式发布 GitHub Actions 使用仓库 `.nvmrc` 固定的 Node 22，降低 tag 发布 `docs.steedos.com` / `docs.steedos.cn` 时因 Node 版本不匹配失败的风险。

**Architecture:** 当前正式站不是 Netlify 直接托管，而是通过 GitHub Actions 在 tag push 时构建 Docusaurus、同步到 S3，并刷新 CloudFront。最小修复是在两个发布 workflow 的 checkout 后加入 `actions/setup-node@v4`，并设置 `node-version-file: .nvmrc` 与 Yarn 缓存。

**Tech Stack:** GitHub Actions, Node.js 22 via `.nvmrc`, Yarn 1, Docusaurus, AWS S3, CloudFront.

---

### Task 1: 固定正式发布 workflow 的 Node 版本

**Files:**
- Modify: `.github/workflows/deploy.yml`
- Modify: `.github/workflows/deploy-cn.yml`

- [x] **Step 1: 在英文站发布 workflow 的 checkout 后加入 Node setup**

在 `.github/workflows/deploy.yml` 的 `Checkout code` 后加入：

```yaml
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: yarn
```

- [x] **Step 2: 在中文站发布 workflow 的 checkout 后加入 Node setup**

在 `.github/workflows/deploy-cn.yml` 的 `Checkout code` 后加入同样配置：

```yaml
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: yarn
```

- [x] **Step 3: 检查 workflow 文件中包含预期配置**

Run:

```bash
rg -n "actions/setup-node@v4|node-version-file: \\.nvmrc|cache: yarn" .github/workflows/deploy.yml .github/workflows/deploy-cn.yml
```

Expected: 两个 workflow 都能匹配到 `actions/setup-node@v4`、`node-version-file: .nvmrc`、`cache: yarn`。

### Task 2: 本地验证构建仍然可用

**Files:**
- Read: `.nvmrc`
- Read: `package.json`

- [x] **Step 1: 确认本地 Node/Yarn 版本**

Run:

```bash
node -v
yarn -v
```

Expected: Node 主版本为 20 或更高；Yarn 为 1.x。

- [x] **Step 2: 验证依赖安装**

Run:

```bash
yarn install --frozen-lockfile
```

Expected: 命令 exit 0。

- [x] **Step 3: 验证 Docusaurus 构建**

Run:

```bash
yarn build
```

Expected: 命令 exit 0。允许已有旧版文档 broken link/anchor warnings，但不能有构建失败。

### Task 3: 提交、PR、合并和正式发布

**Files:**
- Modify: `.github/workflows/deploy.yml`
- Modify: `.github/workflows/deploy-cn.yml`
- Create: `superpowers/plans/2026-06-25-steedos-docs-release-node-version.md`

- [ ] **Step 1: 提交 workflow 修复**

Run:

```bash
git add .github/workflows/deploy.yml .github/workflows/deploy-cn.yml superpowers/plans/2026-06-25-steedos-docs-release-node-version.md
git commit -m "ci: pin docs release workflow node version"
```

- [ ] **Step 2: 推送分支并创建 PR**

Run:

```bash
git push -u origin codex/fix-release-node-version
gh pr create --base master --head codex/fix-release-node-version --title "ci: pin docs release workflow node version" --body "## Summary
- use .nvmrc via actions/setup-node in docs release workflows
- keep steedos.com and steedos.cn release builds aligned with Docusaurus Node requirements

## Test Plan
- yarn install --frozen-lockfile
- yarn build"
```

- [ ] **Step 3: PR 合并后在最新 master 上打发布 tag**

Run after PR is merged:

```bash
git switch master
git pull origin master
git tag v3.3.9
git push origin v3.3.9
```

Expected: GitHub Actions 同时触发 `Deploy steedos.com` 和 `Deploy steedos.cn`。

- [ ] **Step 4: 检查正式发布结果**

Open:

```text
https://github.com/steedos/steedos-docs/actions
https://docs.steedos.com/zh-CN/developer/
```

Expected: Actions 成功，正式站能看到 AI 辅助开发文档入口。

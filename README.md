# 帳好嗎使用手冊

這是「帳好嗎（TallyCheck）4.0.0 客製化版本」的使用手冊網站，使用 [Docusaurus](https://docusaurus.io/) 建置，內容全部為繁體中文（台灣用語）。

- 正式網址：<https://tallycheck-manual.pages.dev>
- 手冊內容在 `docs/`，截圖在 `static/img/`
- 怎麼新增／修改手冊、截圖、部署，請看 [`HOW_TO_UPDATE_DOCS.md`](./HOW_TO_UPDATE_DOCS.md)

## 本機預覽

```bash
pnpm install
pnpm start        # 開發伺服器
pnpm build        # 建置到 build/
```

## 注意

App 內的「使用說明」會以內嵌模式（`?embed=1&theme=...&primary=...`）開啟 `/docs/intro`、`/docs/faq`、`/docs/changelog` 與 `/privacy`，這四個路徑不要更動；內嵌模式的邏輯在 `docusaurus.config.ts` 的 `beeEmbedPlugin` 與 `src/css/custom.css`。

## 正式部署

```bash
pnpm build
wrangler pages deploy build --project-name tallycheck-manual --branch main
```

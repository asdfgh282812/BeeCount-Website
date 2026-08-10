# 以後怎麼更新手冊網站

這份文件寫給你自己看的（不會出現在網站上），記錄以後要新增/修改手冊內容時的完整流程。

網站現況：
- 這個資料夾（`/Users/andy/BeeCount-Website`）是你 fork 出來的 `asdfgh282812/BeeCount-Website`，`origin` 指向你的 fork，`upstream` 指向原作者 `TNT-Likely/BeeCount-Website`——平常改動只 push `origin`，不要 push `upstream`。
- 正式網址：https://beecount-manual.pages.dev（Cloudflare Pages，專案名稱 `beecount-manual`，直接用你的 Cloudflare 帳號登入過）。
- 部署方式是 `wrangler pages deploy` **直接上傳 build 產物**，不是 git push 自動部署——改完文件一定要記得手動重新 build + deploy，光是 `git push` 網站不會自動更新。

## 一、改文字內容

要改的文件都在 `docs/cloud-advanced/`（Cloud 進階功能那個分類），例如 `recurring.md`、`swipesmart-recommend.md`。直接用編輯器改，格式是一般 Markdown，開頭那段 `---` 包起來的是 frontmatter：

```markdown
---
sidebar_position: 10          # 決定側邊欄排序（但目前 sidebars.ts 是手動列表，實際順序看 sidebars.ts，這個數字比較像備註）
description: ...              # 搜尋引擎/分享卡片用的摘要
keywords: [...]               # 搜尋關鍵字
---
```

## 二、新增一篇全新的文件

1. 在 `docs/cloud-advanced/` 底下新增一個 `.md` 檔，複製一篇既有文件的 frontmatter 格式改內容。
2. 打開 `sidebars.ts`，找到 `Cloud 進階功能` 那個 `items` 陣列，把新檔案的路徑（不含 `.md`，例如 `'cloud-advanced/my-new-page'`）加進陣列裡——**加入的位置就是側邊欄顯示的順序**。

## 三、加截圖

截圖不能直接放進 git repo（這個 repo 沒有配 `static/img` 之類的圖床機制），是先上傳到你自己的 Lsky Pro 圖床（`https://photo.pnsgzomf.synology.me`），再把圖床回傳的網址貼進 Markdown。

1. 截圖存成 PNG（截圖工具、瀏覽器開發者工具都可以，或者請 Claude Code 幫你用瀏覽器自動化截圖）。
2. 執行上傳腳本：
   ```bash
   cd /Users/andy/BeeCount-Website
   python3 scripts/upload_manual_image.py /路徑/你的截圖.png "截圖的替代文字說明"
   ```
   會直接印出一行 `![替代文字](https://photo.pnsgzomf.synology.me/i/....png)`，複製貼到文件裡對應的位置即可。
3. 這支腳本要吃 `scripts/.env` 裡的 `LSKY_PRO_TOKEN`（已經設定好、且這個檔案不會被 git 追蹤，放心留著）。如果換了新機器要重設，去 Lsky Pro 後台重新申請一把 Token。

**截圖前記得先把畫面清乾淨**：不要留下真實個資（例如信用卡卡號、真實金鑰明文），示範帳號、示範帳本就好。如果截圖裡不小心帶到私有網址（例如 `*.pnsgzomf.synology.me` 這種內部網域），記得檢查有沒有不小心把私有網域寫進 Markdown 正文——圖床網址沒關係（那是圖片主機），但**內文裡不要出現任何私有服務的實際網址**，因為這個網站是公開的。

## 四、Build + 部署

改完文件、截圖也貼好之後：

```bash
cd /Users/andy/BeeCount-Website
pnpm build
wrangler pages deploy build --project-name beecount-manual --branch main
```

- `pnpm build` 大約 10-20 秒，會同時 build 繁體中文站跟英文站（`build/` 跟 `build/en/`），有錯誤 build 會直接失敗並印出錯誤訊息。
- `wrangler pages deploy` 上傳完會印出兩個網址：一個是這次部署專屬的（例如 `https://xxxxxxxx.beecount-manual.pages.dev`），一個是正式網址 `https://beecount-manual.pages.dev`（自動指向最新一次部署）。
- **部署後正式網址（`beecount-manual.pages.dev`）有時要等 30 秒到 1-2 分鐘才會全部生效**（Cloudflare 邊緣節點快取跟同步需要時間），如果部署完馬上檢查發現某幾頁還是舊的或 404，先別急著懷疑 build 錯了，等一下再重新整理看看；急著確認的話可以先用那個部署專屬網址檢查，那個是即時的。
- 如果打開網頁發現改動明明存在於程式碼卻沒出現在畫面上，先用瀏覽器強制重新整理（Cmd+Shift+R）排除瀏覽器快取，而不是先懷疑程式碼邏輯。

## 五、Commit + push（記得只推自己的 fork）

```bash
git add -A
git commit -m "docs: 說明這次改了什麼"
git push origin main
```

**只推 `origin`（你自己的 fork），絕對不要推 `upstream`**——`upstream` 是原作者 `TNT-Likely/BeeCount-Website` 的正式站台，推上去會影響到他們自己的網站部署。正常操作 `git push`（沒指定 remote）預設就是推 `origin`，除非你手動打 `git push upstream`，一般不會誤觸，但養成看清楚再按 Enter 的習慣比較保險。

## 六、如果想要「git push 自動部署」

目前的部署方式是每次手動 `wrangler pages deploy`，不是 git push 自動觸發。如果之後改動頻繁、想要「push 到 fork 就自動部署」，可以到 Cloudflare Dashboard 把 `beecount-manual` 這個 Pages 專案改成 Git 整合模式（連到你的 GitHub fork，需要在網頁上做一次 GitHub App 授權）。這是一次性設定，之後想做的話讓 Claude Code 帶你操作一次即可，目前還沒設定。

## 快速對照表

| 我想做的事 | 指令/位置 |
|---|---|
| 改既有文件文字 | 直接編輯 `docs/cloud-advanced/*.md` |
| 新增一篇文件 | 新增 `.md` 檔 + 在 `sidebars.ts` 的陣列加一行 |
| 加截圖 | `python3 scripts/upload_manual_image.py 圖片路徑 "說明"` |
| 本機預覽（不部署） | `pnpm start`，會開一個本機開發伺服器即時預覽 |
| 正式部署 | `pnpm build` 然後 `wrangler pages deploy build --project-name beecount-manual --branch main` |
| 推送改動到自己的 fork | `git add -A && git commit -m "..." && git push origin main` |

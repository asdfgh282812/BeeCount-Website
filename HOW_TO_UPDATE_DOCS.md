# 以後怎麼更新手冊網站

這份文件寫給你自己看的（不會出現在網站上），記錄以後要新增/修改手冊內容時的完整流程。

網站現況：
- 這個資料夾（`/Users/andy/BeeCount-Website`）是你 fork 出來的 `asdfgh282812/BeeCount-Website`，`origin` 指向你的 fork，`upstream` 指向原作者 `TNT-Likely/BeeCount-Website`——平常改動只 push `origin`，不要 push `upstream`。
- 正式網址：https://beecount-manual.pages.dev（Cloudflare Pages，專案名稱 `beecount-manual`，直接用你的 Cloudflare 帳號登入過）。
- 部署方式是 `wrangler pages deploy` **直接上傳 build 產物**，不是 git push 自動部署——改完文件一定要記得手動重新 build + deploy，光是 `git push` 網站不會自動更新。

## 〇、資料夾結構

`docs/` 底下分三塊：

- **`docs/app/`** —— App（手機端）操作手冊，2025-08 整理過的統一入口。原本散在 `docs/account/`、`docs/record/`、`docs/cloud-advanced/` 等各自獨立分類資料夾的內容，現在全部收在 `docs/app/` 底下，子資料夾結構不變（`docs/app/account/`、`docs/app/cloud-advanced/`…）。大部分功能文件最後都有一段「Web 端」小節——同一功能 App 跟 Web 怎麼操作寫在同一篇裡，不重複開新檔。
- **`docs/web/`** —— **只有 Web 端才有**、App 完全沒有對應介面的功能，例如新手入門（`first-record.md`）、命令面板（⌘K）、管理員功能（使用者管理／健康檢查／線上裝置）、自動備份，以及 `docs/web/cloud-advanced/` 底下一整組「Cloud 進階功能」（週期性收支／分期付款／拆帳退款／借還款／信用卡帳單試算／紅利回饋／SwipeSmart／對帳／專案／範本——這些功能本身就是 BeeCount Cloud 服務端獨有，純 App 本機記帳沒有入口，所以整組收在 Web 底下而不是 `docs/app/`）。這類內容才獨立開檔放這裡。
- `docs/web/first-record.md` 是特意寫給「完全沒用過蜜蜂記帳」的 Web 讀者看的新手教學（記帳弹窗每個欄位是什麼、怎麼記第一筆），跟 `docs/app/record/basic.md` 裡簡短的「Web 端記帳」小節不是同一回事——後者是給已經看過 App 教學的讀者看差異用的，寫新內容時記得分清楚該補在哪一篇，不要假設 Web 讀者一定看過 App 那邊的文件。
- `docs/web/cloud-advanced/` 目前刻意維持**不翻譯**（跟原本 `docs/app/cloud-advanced/` 時期一樣）。這代表**其他已翻譯的頁面（英文版）不能連結過去**，不然英文站 build 會失敗——真要連，遇到這種情況先跟提出需求的人確認「要花時間整組翻譯」還是「英文版先純文字帶過、不連結」，不要自己選一邊悶頭做。
- 頂層零散檔案（`intro.md`、`faq.md`、`contributing.md`、`changelog.md`）跟 `docs/mcp/`：跨主題、不屬於特定分類，維持在頂層不動。

**改文件內容前先想一下這篇該歸哪裡**：如果是「App 怎麼操作＋Web 端怎麼操作」都要講，寫進 `docs/app/` 對應功能的文件、開一段「## Web 端」小節；如果 App 完全沒有這個功能、純粹是 Web/管理端獨有，才開新檔放 `docs/web/`。

英文站（`i18n/en/docusaurus-plugin-content-docs/current/`）鏡像同一套資料夾結構，兩邊路徑要對齊——改了 `docs/app/xxx/yyy.md` 記得看看 `i18n/en/.../current/app/xxx/yyy.md` 要不要跟著更新（沒翻譯也沒關係，英文站會自動 fallback 顯示中文版，但如果新增的是全新分類資料夾如 `docs/web/`，最好連英文版也一起補上，不然英文站 build 可能因為連結解析失敗而報錯——實際踩過這個坑，詳見下方「文件間互相連結」）。

## 一、改文字內容

例如 `docs/app/cloud-advanced/recurring.md`、`docs/app/cloud-advanced/swipesmart-recommend.md`。直接用編輯器改，格式是一般 Markdown，開頭那段 `---` 包起來的是 frontmatter：

```markdown
---
sidebar_position: 10          # 決定側邊欄排序（但目前 sidebars.ts 是手動列表，實際順序看 sidebars.ts，這個數字比較像備註）
description: ...              # 搜尋引擎/分享卡片用的摘要
keywords: [...]               # 搜尋關鍵字
---
```

## 二、新增一篇全新的文件

1. 先判斷這篇該放 `docs/app/<分類>/` 還是 `docs/web/`（見上方「資料夾結構」），新增一個 `.md` 檔，複製一篇既有文件的 frontmatter 格式改內容。
2. 打開 `sidebars.ts`，找到對應的分類 `items` 陣列，把新檔案的路徑（不含 `.md`，例如 `'app/cloud-advanced/my-new-page'` 或 `'web/my-new-page'`）加進陣列裡——**加入的位置就是側邊欄顯示的順序**。

### 文件間互相連結

同一分類內用相對路徑互相連結，例如 `docs/app/account/budget.md` 連到同資料夾的 `./month-start-day.md`；跨資料夾要注意層數，例如從 `docs/web/admin.md` 連到 `docs/app/shared-ledger.md` 要寫 `../app/shared-ledger.md`。連到某篇文件的某個小節時用 `#錨點`，錨點是該標題文字轉小寫、空白轉底線、符號通常整個拿掉後的結果（例如 `## Web 端 ⌘K 也能問 AI 文檔` 的錨點是 `#web-端-k-也能問-ai-文檔`，`⌘` 符號直接被拿掉）——不確定的話跑一次 `pnpm build`，錨點或連結錯了會在 log 印出來（`Docusaurus found broken anchors` / `broken links`），照著提示修就好。

**新增一個全新的分類資料夾**（像這次新增 `docs/web/`）務必記得：如果這個資料夾底下的文件會連到**已經有英文翻譯**的其他文件（例如連到 `docs/app/` 底下的文件），要同步在 `i18n/en/docusaurus-plugin-content-docs/current/` 補上對應的英文資料夾與檔案，不然英文站 `pnpm build` 會直接失敗（`Unable to build website for locale en`）——這是一個已知的 Docusaurus 行為：全新、完全沒有翻譯的資料夾如果連到「有翻譯」的目標，連結解析會出錯；如果只連到同樣沒翻譯的檔案（像原本的 `docs/app/cloud-advanced/`）則不受影響。

## 三、加截圖

有兩種放法，**優先用第一種**：

### 方式 1：先存本地（圖床上不去時的預設做法）

截圖直接存進 git repo 的 `static/img/<分類>/`（例如這次新增的 `static/img/web/`），Markdown 用**相對於網站根目錄的路徑**引用：

```markdown
![替代文字說明](/img/web/admin-users.jpg)
```

好處是不依賴圖床，圖床斷了、換了都不影響網站顯示；壞處是圖片會進 git repo 讓 repo 變大，之後如果圖床恢復可用，可以把常用的幾張换成方式 2 上傳圖床、md 裡的路徑改回圖床網址，`static/img/` 裡的本地檔案就可以刪掉。

**用 Claude Code 瀏覽器自動化截圖時**：截圖工具存下來的檔案通常在系統暫存目錄（一個很長的路徑），截完之後記得手動複製/搬移到 `static/img/<分類>/` 底下、改成看得懂的檔名（例如 `admin-users.jpg` 而不是 `screenshot-1786419268285-12.jpg`），不要讓暫存檔路徑留在 Markdown 裡。

### 方式 2：上傳圖床（原本的做法，圖床能用時優先用這個）

上傳到你自己的 Lsky Pro 圖床（`https://photo.pnsgzomf.synology.me`），再把圖床回傳的網址貼進 Markdown。

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
| 改既有文件文字 | 直接編輯 `docs/app/<分類>/*.md`（App＋Web 通用功能）或 `docs/web/*.md`（Web 專屬功能） |
| 新增一篇文件 | 新增 `.md` 檔 + 在 `sidebars.ts` 的陣列加一行（新分類資料夾記得補 `i18n/en/` 對應檔案，見上方「文件間互相連結」） |
| 加截圖（圖床上不去時） | 存進 `static/img/<分類>/`，Markdown 用 `![說明](/img/<分類>/檔名.jpg)` |
| 加截圖（圖床可用時） | `python3 scripts/upload_manual_image.py 圖片路徑 "說明"` |
| 本機預覽（不部署） | `pnpm start`，會開一個本機開發伺服器即時預覽 |
| 正式部署 | `pnpm build` 然後 `wrangler pages deploy build --project-name beecount-manual --branch main` |
| 推送改動到自己的 fork | `git add -A && git commit -m "..." && git push origin main` |

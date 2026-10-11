# 以後怎麼更新手冊網站

這份文件寫給你自己看的（不會出現在網站上），記錄新增／修改手冊、拍截圖、部署的完整流程。

網站現況：
- 這個資料夾（`/Users/andy/BeeCount-Website`）是你 fork 出來的 `asdfgh282812/BeeCount-Website`，`origin` 指向你的 fork，`upstream` 指向原作者 `TNT-Likely/BeeCount-Website`。平常只 push `origin`，不要 push `upstream`。
- 正式網址：https://beecount-manual.pages.dev（Cloudflare Pages，專案名稱 `beecount-manual`）。
- 部署方式是 `wrangler pages deploy` **直接上傳 build 產物**，不是 git push 自動部署。改完文件一定要手動重新 build + deploy，只 `git push` 網站不會更新。
- 網站只有繁體中文一種語言（台灣用語）。原本上游的英文站、捐贈頁、行銷首頁、RAG 文件索引都已移除。

## 一、資料夾結構

手冊內容全部在 `docs/`，仿 Moze 手冊的任務導向編排，App 與 Web 的操作寫在同一頁，用 `📱 App`、`💻 Web` 標示差異：

| 資料夾 | 章節 | 內容 |
|---|---|---|
| `docs/intro.md` | 歡迎使用 | 手冊怎麼讀（路徑固定，見下方） |
| `preface/` | 前言 | 安裝與登入、教學指引、功能說明與新功能 |
| `prepare/` | 準備 | 帳本、帳戶、資產總覽、分類、標籤、專案、預算、多幣種 |
| `record/` | 記帳 | 記第一筆、欄位、轉帳、週期、分期、拆帳退款、借還款、範本、附件、搜尋、AI、自動記帳、快速入口 |
| `credit-card/` | 信用卡 | 設定、繳款、帳單與提醒、紅利回饋、刷卡建議 |
| `invest/` | 投資 | 股票持股、定期定額、股利與已實現損益 |
| `analysis/` | 分析 | 統計報表、日曆、比較報表（僅 Web）、年度回顧 |
| `reconciliation/` | 對帳 | 對帳模式、餘額調整 |
| `sync/` | 同步與帳號 | 雲同步、授權金鑰、Web 版、共享帳本、裝置與安全、其他備份 |
| `more/` | 其他設定 | 外觀、匯入匯出、通知、資料清理、MCP |
| `faq.md`、`changelog.md` | 常見問題、更新紀錄 | 路徑固定 |
| `src/pages/privacy.md` | 隱私權政策 | 路徑 `/privacy` 固定 |

**四個路徑不能改名**：`/docs/intro`、`/docs/faq`、`/docs/changelog`、`/privacy`。App 的「使用說明」WebView 會用內嵌模式（`?embed=1&theme=…&primary=…`）開啟它們。內嵌邏輯在 `docusaurus.config.ts` 的 `beeEmbedPlugin` 與 `src/css/custom.css`，不要刪。

側邊欄是依資料夾自動產生的（`sidebars.ts`）：
- 章節名稱與順序在各資料夾的 `_category_.json`。
- 頁面順序與側邊欄短標題在各頁 frontmatter 的 `sidebar_position`、`sidebar_label`。

## 二、改文字、新增一頁

每頁 frontmatter：

```markdown
---
sidebar_position: 3
sidebar_label: 轉帳
title: 轉帳
description: 一句話摘要
---
```

內文從 `##` 開始（H1 由 `title` 產生）。建議結構：開頭情境 → 平台標示 → 為什麼這樣設計 → 怎麼操作 → 注意事項 → 相關頁面。進階功能在標題加 🔖。

新增一頁：在對應章節資料夾新增 `.md`，設好 `sidebar_position` 即可，不用改 `sidebars.ts`。頁面之間用相對連結，例如 `[帳戶](../prepare/account.md)`；連到小節用 `#錨點`。連結或錨點錯了，`pnpm build` 會報錯並指出是哪一頁。

寫作約定：全部繁體中文與台灣用語（設定、預設、資料、軟體、點選、登入、伺服器、匯入／匯出、儲存…），不要出現簡體字；範例資料一律虛構；不寫伺服器架設、管理員後台、私有網域與帳密。

**手冊的資料來源**：App 的 `docs/changes/` 與 `lib/l10n/app_zh_TW.arb`（畫面實際用詞）、Cloud 的 `docs/` 與 `frontend/`。畫面文字以原始碼為準，不要憑印象寫按鈕名稱。

## 三、截圖

圖檔放 `static/img/<章節>/<頁面>-<序號>.png`，Markdown 這樣引用：

```markdown
![「我的 → 授權金鑰」頁，顯示到期日](/img/sync/license-2.png)
```

**圖片檔不存在時 `pnpm build` 會直接失敗**（`docusaurus.config.ts` 已設為嚴格模式），所以引用了圖就一定要有檔案。

### 截圖工具

可重複使用的截圖工具存在 `/Users/andy/BeeCount-manual-tools/`（不在這個 repo 裡，因為裡面有示範用的帳密）：

- `demo/`：乾淨的示範環境（http://localhost:8081，全新 SQLite、虛構資料，不碰你平常用的 8080）。`README.md` 有啟動、停止、重置、帳密位置；`reset.sh` 一鍵重灌；`seed.py` 是種子腳本。
- `webshots/`：用 Chrome 無頭模式（puppeteer-core）批次拍 Web 畫面的腳本，`lib.mjs` 是共用登入。重拍某一批就重跑對應的 `.mjs`。
- `sim/`：iOS 模擬器「BeeCount Manual」的操作說明。App 登入 BeeCount Cloud 只剩 SSO，示範站沒有 SSO，所以用 `sso_shim.py`（8082 埠代理）加 `login_deeplink.sh` 的深連結繞過；說明在 `sim/README.md`。
- `shots/`：各章的拍攝清單，每張圖的檔名、平台、操作路徑與畫面要求。

### 目前還沒拍的圖

第一輪拍了 51 張，第二輪（2026-10-10）補了約 90 張：信用卡、對帳、資料管理、AI、自動記帳、股票、報表、年度回顧、通知、功能導覽等 App 畫面都已有圖並接進頁面。圖現在共約 145 張。

還沒拍的大概是（完整清單在 `/Users/andy/BeeCount-manual-tools/shots/REMAINING.md`，信用卡／投資／分析清單是表格式，不在自動比對範圍內）：

- 歡迎流程（語言、伺服器位址、SSO 登入、授權金鑰、幣種、分類模式）：要登出或全新安裝才拍得到。
- 拆帳、退款、欠款表單、搜尋結果、Android 專屬畫面（安裝、截圖自動記帳）。
- SwipeSmart 已連接狀態與卡片對照（需要真的 SwipeSmart 金鑰）、AI 聊天與語音（需要真的 AI 服務商金鑰）。
- 二次驗證、帳戶資訊分頁、年度回顧提醒卡（要模擬 1/1 之後的日期）。

補圖時：照 `shots/*.md` 拍好、放進 `static/img/<章節>/`，再把圖的 Markdown 行加進頁面。可以用 `/Users/andy/BeeCount-manual-tools/wire/addimg.py`（在指定標題後的第一段後插入圖片，格式見檔頭）與 `moveimg.py`（把某張圖移到某段後面）。

### 截圖前的注意

- 手機直式圖在網站上由 `custom.css` 限制高度（最高 620px）並置中加框，原圖直接放 1206x2622 即可，不用自己縮。
- 模擬器操作座標：用 control 工具的完整截圖時，座標 × 0.437 = 裝置點；用小圖估座標很容易偏，點不到時先拍完整截圖再算。輸入中文要走剪貼簿，見 `sim/README.md` 的「補充」。
- 2026-10-10 國慶日會自動套紅色節日主題，已在「我的 → 個性化設定 → 節日」關掉「節日當天換上節日主題」；之後節日（例如聖誕節）再拍時留意畫面是否變色。

- 一律用示範環境，不要拍你真實的帳本、信用卡與帳密。
- 示範資料的日期是 2026-10-09 灌入的；需要特定日期的畫面（年度回顧提醒卡、節日主題）要模擬日期或等到那天。
- 分類名稱以示範站實際為準（例如「飲食」而不是「餐飲」），文字範例與圖片不一致時以圖片為準修改文字。

## 四、本機預覽、Build、部署

```bash
cd /Users/andy/BeeCount-Website
pnpm start                      # 本機預覽，即時重新載入
pnpm build                      # 建置，連結、錨點、圖片有問題會在這裡失敗
wrangler pages deploy build --project-name beecount-manual --branch main
```

- `pnpm build` 約 20 秒。
- 部署完正式網址有時要等 30 秒到 1～2 分鐘才全部生效；急著確認可以用部署時印出的專屬網址（`https://xxxxxxxx.beecount-manual.pages.dev`）。
- 畫面和程式碼對不上時，先用 Cmd+Shift+R 強制重新整理排除快取。

## 五、Commit + push（只推自己的 fork）

```bash
git add -A
git commit -m "docs: 說明這次改了什麼"
git push origin main
```

**只推 `origin`，不要推 `upstream`**。

## 六、還沒處理、需要你決定的事

1. **App 與 Cloud 裡的使用說明連結仍指向上游網站 `count.beejz.com`**：App 的 `lib/utils/website_urls.dart`（`baseUrl`）、WebView 網域白名單 `lib/pages/settings/help_center_page.dart` 與 `privacy_policy_page.dart`（用 `endsWith('beejz.com')` 判斷），以及 Cloud 的 `cmdk-ai/AskDialog.tsx`、`ParseTxDialog.tsx`。要讓 App 開到這本新手冊，這幾處要改成 `beecount-manual.pages.dev`，白名單也要放行。英文語系會加 `/en` 前綴，新站沒有英文版，也要一併拿掉，否則英文使用者會 404。
2. **隱私權政策需要你確認**：聯絡方式、帳號刪除方式、AI 金鑰是否加密儲存，以及營運者身分的措辭。目前聯絡窗口寫成「請聯絡提供你帳號的服務營運者」。
3. **想要 git push 自動部署**：到 Cloudflare Dashboard 把 `beecount-manual` 改成 Git 整合（需要在網頁上做一次 GitHub App 授權）。

## 快速對照表

| 我想做的事 | 指令／位置 |
|---|---|
| 改文字 | 直接編輯 `docs/<章節>/*.md` |
| 新增一頁 | 在章節資料夾新增 `.md` 並設 `sidebar_position` |
| 加截圖 | 放進 `static/img/<章節>/`，Markdown 用 `![說明](/img/<章節>/檔名.png)` |
| 重拍 Web 截圖 | `/Users/andy/BeeCount-manual-tools/webshots/` 跑對應 `.mjs` |
| 本機預覽 | `pnpm start` |
| 正式部署 | `pnpm build` 然後 `wrangler pages deploy build --project-name beecount-manual --branch main` |
| 推送到自己的 fork | `git add -A && git commit -m "..." && git push origin main` |


## 截圖上的圈選、編號與圖說（`annot/` 工具）

手冊的 App／Web 截圖都在圖上加了紅框、編號，圖片下方有 `*圖中：① …*` 的圖說。工具和設定檔放在 repo 外的 `/Users/andy/BeeCount-manual-tools/annot/`：

- `specs.txt`：每張圖一行，`相對路徑 | box x0,y0,x1,y1,編號 | ring cx,cy,r,編號 | arrow … | spot … | zoom … | cap 圖說文字`。座標是 0～1 的比例，所以換解析度也能用。
- `annotate.py <static/img> specs.txt [過濾字串]`：第一次處理某張圖會把原圖備份到 `annot/orig/`，之後都從備份重畫，可以反覆調整座標。
- `apply_captions.py <docs> specs.txt`：把 `cap` 寫成圖片下一行的圖說（已有就更新）。
- `sheet.py out.png 圖1 圖2 …`：產生帶 10% 刻度的拼圖，方便目測座標；加 `CUR=1` 看的是目前（已標註）的圖。
- **重拍某張圖時**：直接用新圖覆蓋 `static/img/...`，並刪掉 `annot/orig/` 裡同名的備份，再改 `specs.txt` 的座標，重跑 `annotate.py` 與 `apply_captions.py`。
- 新增圖片：先拍圖放進 `static/img/`，在文件裡用 `![說明](/img/…)` 引用，最後在 `specs.txt` 加一行。

### 標註座標怎麼定（避免框歪、切到字）

不要憑眼睛估座標。`annot/` 有文字辨識（Apple Vision）可以量出每行字的位置：

- `ocrbin` / `run_ocr.py`：對 `annot/orig/` 所有乾淨原圖做 OCR，結果存在 `annot/ocr.json`（`ocr.swift` 用 `swiftc -O ocr.swift -o ocrbin` 編譯；新增或重拍圖片後重跑 `python3 run_ocr.py`）。
- `ocrdump.py <相對路徑>`：列出該圖每行文字的座標（比例），框的邊就依這個決定，要落在文字行之間的空隙，或完整圍住文字行。
- `grid.py <相對路徑> <輸出.png>`：在原圖上畫 0.1 為單位的座標格線，找圖示、開關這類沒有文字的目標用。
- `fixspecs.py [--write]`：自動把 specs 裡切過文字的框邊移到不切字的位置（只處理「切到字」，不會判斷框得對不對，仍要目視確認）。
- `montage.py <out.png> <相對路徑>…`：把標註後的圖並排，方便抽查。
- `annotate.py` 會自動把編號徽章放在最不蓋字的位置；超寬的網頁截圖（寬度 > 1500px）線寬與徽章按 1500px 計算，避免太粗。

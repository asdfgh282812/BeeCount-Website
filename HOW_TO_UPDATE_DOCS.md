# 以後怎麼更新手冊網站

這份文件寫給你自己看的（不會出現在網站上），記錄新增／修改手冊、拍截圖、部署的完整流程。

網站現況：
- 這個資料夾（`/Users/andy/BeeCount-Website`）是你 fork 出來的 `asdfgh282812/BeeCount-Website`，`origin` 指向你的 fork，`upstream` 指向原作者 `TNT-Likely/BeeCount-Website`。平常只 push `origin`，不要 push `upstream`。
- 正式網址：https://tallycheck-manual.pages.dev（Cloudflare Pages，專案名稱 `tallycheck-manual`）。
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
| `farm/` | 農場 | 記帳連動、種植、季節天氣、商店市場、社交與設定（不公開數值與詳細算法） |
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
- `sim/`：iOS 模擬器「TallyCheck Manual」的操作說明。App 登入帳好嗎 Cloud 只剩 SSO，示範站沒有 SSO，所以用 `sso_shim.py`（8082 埠代理）加 `login_deeplink.sh` 的深連結繞過；說明在 `sim/README.md`。
- `shots400/`：4.0 各章的拍攝清單，每張圖的檔名、平台、操作路徑與畫面要求。

### 4.0 重拍進度

4.0 的介面與品牌已改版，所有引用截圖都要重新拍攝，檔名沿用。完整清單在 `/Users/andy/BeeCount-manual-tools/shots400/`，分成 preface、prepare-more、record、finance、sync、farm 六組。新增畫面的圖檔尚未完成前，嚴格建置會失敗，不能先部署缺圖版本。

### 假 AI 服務商（拍 AI 畫面用）

`/Users/andy/BeeCount-manual-tools/mockai/server.py` 是只在本機 127.0.0.1:8090 監聽的 OpenAI 相容假服務商：`cd mockai && python3 server.py`。App 的「我的 → 智慧記帳 → AI 服務管理 → 服務商管理」新增一個 OpenAI 體系服務商，Base URL 填 `http://localhost:8090/v1`、API Key 隨便填、三個模型隨便填，再到「能力綁定」三項都選它即可（Web 的 ⌘K 記帳走 Cloud，同樣會打到這個服務商）。查帳的回答數字取自 App 傳來的真實查詢結果，記帳／語音／圖片辨識則是依輸入文字回固定的帳單 JSON；`mock.log` 記每個請求。拍完請把能力綁定改回原本的服務商並刪掉這個服務商。拍照／相簿測試用的虛構收據在 `mockai/media/receipt.jpg`（`xcrun simctl addmedia <udid> receipt.jpg`）。

### 截圖前的注意

- 4.0 使用獨立模擬器「TallyCheck Manual」，UDID 在 `sim/udid400.txt`，App 備份為 `sim/Runner400.app`，截圖工具為 `sim/snap400.sh [章節/檔名.png]`。舊版模擬器與腳本只供歷史參考。
- 示範 Cloud 在 8081，SSO 代理在 8082；不要使用日常環境的 8080。登入前確認代理與示範服務都在執行。
- 新圖不加紅框、圈選或編號。圖片下方需要說明時使用 `*圖中：…*`。

- 手機直式圖在網站上由 `custom.css` 限制高度（最高 620px）並置中加框，原圖直接放 1206x2622 即可，不用自己縮。
- 模擬器操作座標：用 control 工具的完整截圖時，座標 × 0.437 = 裝置點；用小圖估座標很容易偏，點不到時先拍完整截圖再算。輸入中文要走剪貼簿，見 `sim/README.md` 的「補充」。
- 2026-10-10 國慶日會自動套紅色節日主題，已在「我的 → 外觀 → 節日」關掉「節日當天換上節日主題」；之後節日（例如聖誕節）再拍時留意畫面是否變色。

- 一律用示範環境，不要拍你真實的帳本、信用卡與帳密。
- 示範資料的日期是 2026-10-18 灌入的；需要特定日期的畫面（年度回顧提醒卡、節日主題）要模擬日期或等到那天。
- 分類名稱以示範站實際為準（例如「飲食」而不是「餐飲」），文字範例與圖片不一致時以圖片為準修改文字。

## 四、本機預覽、Build、部署

```bash
cd /Users/andy/BeeCount-Website
pnpm start                      # 本機預覽，即時重新載入
pnpm build                      # 建置，連結、錨點、圖片有問題會在這裡失敗
wrangler pages deploy build --project-name tallycheck-manual --branch main
```

- `pnpm build` 約 20 秒。
- 部署完正式網址有時要等 30 秒到 1～2 分鐘才全部生效；急著確認可以用部署時印出的專屬網址（`https://xxxxxxxx.tallycheck-manual.pages.dev`）。
- 畫面和程式碼對不上時，先用 Cmd+Shift+R 強制重新整理排除快取。

## 五、Commit + push（只推自己的 fork）

```bash
git add -A
git commit -m "docs: 說明這次改了什麼"
git push origin main
```

**只推 `origin`，不要推 `upstream`**。

## 六、還沒處理、需要你決定的事

1. **主要使用說明入口已改用新手冊**：App 的 `lib/utils/website_urls.dart` 以 `manualBaseUrl` 組成 `docs()`／`docsEmbed()`，不加 `/en`，`help_center_page.dart` 也已放行手冊網域；Web 的 `AboutDialog.tsx` 使用新手冊的說明與更新紀錄連結。App 的官網與部分 FAQ、更新紀錄、雲同步輔助方法仍使用上游 `baseUrl`；後續若調整這些入口，須逐一確認呼叫位置，不能再把「所有使用說明都仍指向上游」當成現況。
2. **隱私權政策需要你確認**：聯絡方式、帳號刪除方式、AI 金鑰是否加密儲存，以及營運者身分的措辭。目前聯絡窗口寫成「請聯絡提供你帳號的服務營運者」。
3. **想要 git push 自動部署**：到 Cloudflare Dashboard 把 `tallycheck-manual` 改成 Git 整合（需要在網頁上做一次 GitHub App 授權）。

## 快速對照表

| 我想做的事 | 指令／位置 |
|---|---|
| 改文字 | 直接編輯 `docs/<章節>/*.md` |
| 新增一頁 | 在章節資料夾新增 `.md` 並設 `sidebar_position` |
| 加截圖 | 放進 `static/img/<章節>/`，Markdown 用 `![說明](/img/<章節>/檔名.png)` |
| 重拍 Web 截圖 | `/Users/andy/BeeCount-manual-tools/webshots/` 跑對應 `.mjs` |
| 本機預覽 | `pnpm start` |
| 正式部署 | `pnpm build` 然後 `wrangler pages deploy build --project-name tallycheck-manual --branch main` |
| 推送到自己的 fork | `git add -A && git commit -m "..." && git push origin main` |


## 舊版標註工具

`annot/` 保留作為歷史工具；4.0 截圖不再執行 `annotate.py` 或 `apply_captions.py`，避免把舊版紅框和編號加回新版圖片。

### 本次截圖驗收補記

- 4.1.0 的 App AI 記帳卡片已依實際交易／帳本幣別顯示金額（`lib/widgets/ai/bill_card_widget.dart`），不再固定為 `¥`。既有截圖若仍顯示舊符號，屬歷史畫面，後續重拍須以當前版本為準。2026-10-25 本次只更新文字，未重拍圖片。

### 2026-10-27：AI 對話保存與進階記帳截圖

- 已在本機示範環境更新 AI 對話頁、Web 版頁與 4.1.0 更新紀錄，補充最近 20 個對話串、切換／刪除、跨裝置同步及草稿限制。
- App：重拍 `record/ai-chat-2.png`；新增 `ai-chat-history.png`、`ai-chat-delete.png`、`ai-chat-restored.png`。
- Web：重拍 `record/ai-chat-web-1.png`、`sync/web-5.png`；新增 `record/ai-chat-web-history.png`、`ai-chat-web-delete.png`、`ai-advanced-web-split.png`、`ai-advanced-web-recurring.png`。
- 新圖以虛構帳務與示範對話拍攝，透過目前 App／Web 介面呈現；用來說明操作，並非 AI 辨識準確率測試。腳本在本機 `BeeCount-manual-tools/sim/capture410-*.py` 與 `webshots/chat410*.mjs`。
- 本次不部署、不 commit。

### 2026-10-29：裝置內建 AI 的說明與圖片

- 更新 AI 記帳、聊天、自動記帳、快速入口、首次登入引導、FAQ、導覽、更新紀錄與隱私權政策，區分本機辨識、第三方 AI 與一般 Cloud 同步。
- 共 10 張新版圖片：替換 `record/ai-4.png`、`preface/install-login-6.png`；新增本機策略選單、僅本機、本機優先、未支援狀態、本機聊天、本機優先引導，以及 Web 管理頁與展開的策略選單。
- App 圖片由正式 Flutter 元件與隔離示範狀態渲染，沒有 OS 狀態列，不是裝置端截圖或模型準確率驗證。來源在 `sim/ondevice410/capture_test.dart`；重拍時暫放 App 的 `test/` 下執行，完成後移除臨時檔。
- Web 圖片在瀏覽器直接呈現正式 `SettingsAiPage` 與示範 profile，未接觸正式帳號。暫存入口來源在 `webshots/ondevice410/`，原產品目錄的臨時入口已清除。
- 使用虛構資料與無效示範金鑰；本次不部署、不 commit。完整驗證及範圍見 App repo `docs/changes/2026-10-29-on-device-ai-manual.md`。

### 2026-11-04：分期付款編輯（4.1.4）

- 更新 `record/installment.md`：新增「修改這一期與之後各期」「編輯整個計畫」，調整計畫表格與單筆交易的編輯說明（五選一），移除「建立後不能改」提示；更新紀錄新增 4.1.4。
- 圖片：重拍 `record/installment-3.png`（計畫卡新增「編輯」按鈕）；新增 `installment-5.png`（「這一期要怎麼修改？」範圍選單）、`installment-6.png`（編輯表單頂部的範圍提示列）。以 iOS 模擬器（iPhone 18 Pro）截圖，示範分期為臨時寫入的虛構資料，拍完已清除。
- 其餘分期截圖畫面未變，沿用。完整說明見 App repo `docs/changes/2026-11-04-installment-edit.md`。

### 2026-11-05：稱號、支持者禮包與農友互助（4.2.0）

- 補入 17 張示範圖片：`more/badges-*` 共 7 張（App 我的頁首、稱號清單、詳情、農場類別，以及 Web 清單、詳情、頭像選單）；`farm/supporter-gift-*` 共 4 張（App／Web 領取前後）；`farm/help-app-*` 共 5 張（拜訪、照顧、選飼料、數量、休耕活力）；`farm/harvest-app-stored.png` 1 張。
- 圖片分別放入 `more/badges.md`、`farm/bookkeeping.md`、`farm/social.md`、`farm/gameplay.md`，附繁體中文替代文字與圖說。社交頁的拜訪與照顧圖改用新版圖片，舊圖檔保留。
- 全部使用虛構資料。App 圖片由目前正式 Flutter 頁面、選單及農場素材渲染，沒有 OS 狀態列，**不是實機或模擬器截圖，也不是正式服務連線驗證**。Web 在本機瀏覽器呈現正式 React 頁面、AppHeader 與頭像選單，API 回應採隔離示範資料，未使用真實帳號或日常環境。
- App 拍攝來源與紀錄在 `/Users/andy/BeeCount-manual-tools/sim/manual420/`（`capture_test.dart`、`harvest_capture_test.dart`、`manifest.json`）；Web 在 `/Users/andy/BeeCount-manual-tools/webshots/manual420/`。圖片尺寸與 SHA-256 記於 manifest；重拍須暫放對應產品目錄，完成後清除臨時入口。
- 頁首以最終排列為準：頭像在左、問候語與徽章在右，沒有中途加入的目前帳本標籤。補圖完成時未部署、未 commit。
- 2026-11-05 已依使用者要求建置並部署到正式站 `https://tallycheck-manual.pages.dev`，部署網址為 `https://933e9cb1.tallycheck-manual.pages.dev`。正式站四個更新頁面與 17 張新增圖片已逐一核對，內容雜湊皆與本次 build 一致；驗證紀錄在 `webshots/manual420/deployment-qa.json`。本次未 commit、未 push。

### 2026-11-05：方案額度、好好幣商店與購買說明

- 新增 `sync/limits.md` 與 `farm/hh-shop.md`，整理七種名額的基本額度、單價、永久加購上限、共享帳本算法、既有超額保留與支持者到期後的限制。方案頁、帳本、專案、報表、存錢桶、範本、共享帳本、AI、附件及 FAQ 均補上對應說明。
- 數字以 Cloud `src/services/entitlements.py` 的 `KINDS`、App `entitlement_gate.dart` 與 Web `reportEntitlements.ts` 為準。舊變更文件中「報表沒有既有用量保留」已過時：migration 0107 與目前兩端程式都使用已記錄的報表數量保留既有用量；新增仍依實際方案上限。
- 補入 8 張虛構資料示範圖：`farm/hh-shop-*` 5 張（App 商店總覽、名額、確認，以及 Web 名額、確認），`sync/limits-app-*` 3 張（帳本、存錢桶與報表上限提示）。App 以正式 Flutter 元件渲染，不是實機截圖；Web 以正式 React 元件與 AppHeader 在本機隔離瀏覽器呈現，未連接實際帳號或執行扣款。
- 拍攝來源、數量與單價核對紀錄、圖片尺寸與 SHA-256 在 `/Users/andy/BeeCount-manual-tools/sim/limits420/`；Web 拍攝與手冊顯示檢查在 `webshots/limits420/`。產品目錄的臨時入口已清除。
- 已建置並部署到正式手冊，部署網址 `https://795ba387.tallycheck-manual.pages.dev`。19 個更新頁面與 8 張新圖片已從正式網址抓回核對，均與 build 內容一致；桌機 1280px、手機 390px 的新章節與方案頁顯示檢查通過。詳見 `webshots/limits420/manual-qa.json` 與 `deployment-qa.json`。本次未 commit、未 push。

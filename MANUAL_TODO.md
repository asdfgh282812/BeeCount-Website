# 手冊待補清單

核對日期：2026-11-11（台灣時間）。本文件供維護使用，不會出現在手冊網站。

範圍：對照 App 與 Cloud 近期功能提交、`docs/changes/` 及目前手冊，重點涵蓋 2026-11-04～11-10。App 核對至 `2c3dd197`，Cloud 核對至 `44341f3d`。這是本機程式碼與文件的覆蓋檢查，不代表各產品版本均已對外上線。

## 優先補上

| 項目 | 目前缺口 | 建議補在 |
|---|---|---|
| 帳本回收桶 | 只有 4.2.1 更新紀錄提及；帳本頁仍寫三種危險操作都無法復原，須優先釐清已同步 Cloud 帳本刪除可進回收桶、本機刪除與清空等不同情況。補刪除確認、輸入名稱、30 天內還原、永久刪除、額度不足，以及 App 還原後從雲端帳本重新下載的流程與圖片。 | `docs/prepare/ledger.md` |
| 農場許願 | 手冊完全沒有發布與供應教學。補 App 商店發起、市場查看／提供、Web 排行榜的農場許願入口，以及預扣貨款、到期退款、完整／部分供應、庫存空間與重新整理等操作。 | 新增農場許願頁，並從商店、市場、社交與 Web 頁連入 |
| 股票交割與股利的線上匯率開關 | 只有 4.2.1 更新紀錄，股票與股利章節沒有完整操作。補跨幣別交割時開關的位置、線上試算／手動實際金額、新增與編輯預設差異，以及取不到匯率的處理與圖片。 | `docs/invest/overview.md`、`docs/invest/dividend.md` |
| 排行榜佩戴徽章 | 稱號頁有個人佩戴教學，但排行榜頁未說明最多三枚、主徽章名稱、匿名農友不顯示，以及歷史週次顯示目前佩戴設定。 | `docs/farm/social.md`、`docs/more/badges.md` |
| 排行榜新版獎勵級距 | 目前只有概括獎勵說明，未交代新版名次／百分位分級、神偷與守護榜前三名，以及既有結算週不重算。詳細金額應以畫面及當前規則核對，避免照搬舊變更文件。 | `docs/farm/social.md` |

## 可隨相關章節更新補入

| 項目 | 目前缺口 | 建議補在 |
|---|---|---|
| AI 交易獨立長備註 | 一般交易已有 400 字備註教學，但 AI 章沒有清楚區分短名稱與獨立長備註，也沒有指定長備註的例句及核對圖。 | `docs/record/ai.md`、`docs/record/ai-chat.md` |
| 不納入總額帳戶的淡灰金額 | 納入／排除操作已有說明，未解釋帳戶列與帳戶選擇器的淡灰金額代表排除狀態；屬視覺提示補充。 | `docs/prepare/account.md`、`docs/prepare/account-overview.md` |
| 買水與小看門狗的專屬截圖 | 兩者已有操作文字；買水未配道具卡與數量確認圖，小看門狗段落也缺單格佈置與費用確認圖。既有全農場看門狗圖片不能代替單格功能。 | `docs/farm/growth-shop.md`、`docs/farm/social.md` |

## 本次已確認有說明

- 共享帳本多人分帳、訪客、多人付款、匯率、結算、還款對方記帳提示與連結密碼：`docs/sync/split-ledger.md`，含 14 張示範圖片。
- 股票智慧加減碼：`docs/invest/smart-dca.md`，含 4 張 App 圖片。
- 行事曆啟用、活動綁定與活動統計：`docs/record/activities.md`，含 6 張 App 圖片。
- 每日帳務挑戰、15 秒與題目日期：`docs/farm/daily-quiz.md`。
- 種子出售、倉庫分組、大頭菜本週走勢：`docs/farm/market.md`，已有對應圖片。
- 買水：商店、種植、農場設定及記帳連動頁已有文字。
- 小看門狗：`docs/farm/social.md` 的單格保護章節已有文字。
- 被偷通知的植物名稱、數量與合併：農場設定、社交與通知頁已有文字及圖片。
- 拆帳明細獨立手續費與折扣：`docs/record/split-refund.md`、`docs/record/fields.md`。
- 豐收榜依每塊田平均收成計分：排行榜表格已更新。
- Web 瀏覽器背景通知及啟用排查：`docs/more/notifications.md`，已有圖片。

## 查證來源

App 專案 `docs/changes/`：

- `2026-11-07-app-ledger-recycle-bin.md`
- `2026-11-04-farm-wishes.md`、`2026-11-04-farm-wish-activity-and-notification-music.md`
- `2026-11-07-stock-settlement-online-rate-toggle.md`
- `2026-11-09-farm-leaderboard-badges.md`、`2026-11-09-leaderboard-reward-tiers.md`
- `2026-11-09-ai-transaction-memo.md`、`2026-11-09-excluded-account-amount-muted.md`
- `2026-11-10-farm-buy-water.md`、`2026-11-09-plot-guard-dog.md`

買水、分帳等操作文字已寫入，不應再當作「完全沒寫」；回收桶與交割匯率則屬「更新紀錄已有，但缺完整操作手冊」。

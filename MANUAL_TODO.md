# 手冊覆蓋與完成紀錄

核對與補寫日期：2026-11-11（台灣時間）。本文件供維護使用，不會出現在手冊網站。

範圍：對照 App 與 Cloud 近期功能提交、`docs/changes/` 及目前手冊，重點涵蓋 2026-11-04～11-10。App 核對至 `2c3dd197`，Cloud 核對至 `44341f3d`。這是文件覆蓋檢查，不代表各產品版本均已對外上線。

## 本輪待補項目已完成

| 狀態 | 項目 | 已補內容與位置 |
|---|---|---|
| 完成 | 帳本回收桶 | [帳本](docs/prepare/ledger.md#recycle-bin)：修正刪除無法復原的過時敘述，區分清空、本機、Cloud 與永久刪除；補確認、30 天保留、還原後下載、額度限制及 2 張 App 示範圖。 |
| 完成 | 農場許願 | 新增[農場許願](docs/farm/wishes.md)：App／Web 入口、發布、預扣、供應、完整交貨補貼、到期退款、儲存與失敗排查，4 張示範圖；商店、市場、社交、總覽及 Web 頁已連入。 |
| 完成 | 股票交割與股利匯率 | [股票](docs/invest/overview.md#settlement-rate)、[股利](docs/invest/dividend.md#settlement-rate)：線上試算／實際金額、新增與編輯差異、缺匯率處理，共 3 張 Web 圖。 |
| 完成 | 排行榜佩戴徽章 | [社交](docs/farm/social.md#leaderboard-badges)、[稱號](docs/more/badges.md)：最多三枚、主徽章、匿名隱藏與歷史週顯示目前佩戴，附 Web 排行榜圖。 |
| 完成 | 排行榜新版獎勵 | [獎勵級距](docs/farm/social.md#leaderboard-rewards)：名次／百分位分級、神偷與守護前三名、資格限制與歷史週不重算；實際好幣以選定週次畫面為準。 |
| 完成 | AI 獨立長備註 | [AI 記帳](docs/record/ai.md#memo)、[AI 聊天](docs/record/ai-chat.md)：短名稱與 400 字備註分開、輸入例句、草稿核對、週期首筆限制及 Web 圖。 |
| 完成 | 排除帳戶的淡灰金額 | [帳戶](docs/prepare/account.md#納入總餘額)、[資產總覽](docs/prepare/account-overview.md)：列表與選擇器的灰色狀態、重新納入及 Web 對照圖。 |
| 完成 | 買水與小看門狗圖片 | [商店](docs/farm/growth-shop.md)、[小看門狗](docs/farm/social.md#little-guard-dog)：各補入口與費用確認圖，共 4 張 App 示範圖。 |

本輪共新增 16 張示範圖片。App 圖為正式 Flutter 頁面／元件配合隔離資料渲染，並非實機或模擬器實拍；Web 為本機正式 React 元件配合虛構 API 資料。未存取真實帳務、未呼叫付費 AI、未執行實際購買或刪除。

本次核對範圍內沒有尚未處理的待補項目；之後的新提交仍需再檢查，不表示全產品的所有歷史功能均已逐項審核。

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

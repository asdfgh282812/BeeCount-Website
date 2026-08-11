---
sidebar_position: 1
description: 蜜蜂記帳 Web 版使用指南－BeeCount Cloud 內建的瀏覽器管理端，登入方式、PWA 安裝、介面導覽與 Web 端專屬功能一覽。
keywords: [蜜蜂記帳 Web 版, BeeCount Web, 記帳網頁版, PWA 記帳]
---

# Web 版總覽

BeeCount 3.0 起，[BeeCount Cloud](../app/cloud-sync/beecount-cloud.md) 自建雲端服務內建了一個**瀏覽器管理端**－不用裝 App，開啟網址就能記帳、看統計、管理帳本，資料跟手機 App 雙向即時同步。

這節只講 **Web 端獨有**的操作（指令面板、管理員功能、自動備份等）。其餘功能（記帳、預算、分類、AI 助理…）Web 端的運作方式已經分別寫在對應功能的文件裡，各篇最後都有一段「Web 端」小節，例如[記帳](../app/record/basic.md#web-端記帳)、[預算管理](../app/account/budget.md設定](../app/ai/overview.md#web-端-ai-設定)。

## 快速開始

### 登入

瀏覽器造訪你的 BeeCount Cloud 位址（例如 `http://192.168.1.100:8869` 或自訂網域），用信箱 + 密碼登入－帳號跟手機 App 共用，兩邊看到的是同一份資料。

![Web 版首頁](/img/web/overview.jpg)

### 安裝成 PWA（可選）

Web 管理端是漸進式 Web 應用程式（PWA）：

- 瀏覽器網址列右側會出現「安裝」圖標，點一下裝到桌面 / Dock / 開始選單
- 裝成獨立 App 後，開啟沒有瀏覽器網址欄，體驗接近原生應用
- 離線時可讀取快取數據，回網後自動同步

詳見 [BeeCount Cloud 部署文件](../app/cloud-sync/beecount-cloud.md#web-端支援-pwa)。

## 介面導覽

頂部導覽列：**首頁 / 交易 / 帳戶 / 分類 / 標籤**，右上角是**搜尋（命令面板）**和**頭像選單**。

點開頭像選單，依分組說明如下：

| 分組 | 項目 | 說明 |
|---|---|---|
| 工具 | 預算 / 帳本 / 年度報告 | 預算與帳本管理見對應功能文件；年度報告是沉浸式年度記帳回顧 |
| 設定 | 個人資料 | 主題色、語言、[二次驗證 2FA](../app/security/app-lock.md#web-端二次驗證2fa) |
| 設定 | AI 設定 | 請參閱 [AI 設定](../app/ai/overview.md#web-端-ai-設定) |
| 設定 | 健康 | 伺服器健康檢查，請參閱[管理員功能](./admin.md#健康檢查) |
| 設定 | 裝置 | 登入過的設備列表，請參閱[管理員功能](./admin.md#線上裝置) |
| 設定 | 開發者 | MCP 個人存取權杖，請參閱 [MCP 文件](../mcp/intro.md) |
| 管理 | 使用者管理 / 備份 / 資料清理 | 僅管理員可見，請參閱[管理員功能](./admin.md)和[自動備份](./backup.md) |
| 偏好 | 切換主題 / 語言 | 深色模式、繁簡/英文切換 |

## Web 端專屬功能

以下這些在手機 App 裡沒有對應介面，是 Web 端獨有的：

| 功能 | 說明 |
|---|---|
| [指令面板 ⌘K / Ctrl+K](./command-palette.md) | 鍵盤驅動的快速操作與頁面跳躍 |
| [管理員功能](./admin.md) | 平台使用者管理、伺服器健康檢查、全站在線路設備 |
| [自動備份](./backup.md) | 基於 rclone 的定時備份到 S3 / WebDAV / GDrive 等遠端 |
| [MCP 個人存取權杖](../mcp/intro.md) | 讓 Claude Desktop / Cursor 等 LLM 用戶端直接讀寫帳簿 |
| 批次操作 | 交易清單多選刪除、匯出 CSV，請參閱[交易管理](../app/features/record.md) |
| 桌面貼上記帳 | ⌘V 直接貼上文字/圖片給 AI 記賬，見 [AI 圖片識別](../app/ai/image.md#web-端圖片記帳) |

## 跟 App 的主要差異

- Web 端沒有生物辨識應用鎖，登入態用 2FA + 裝置管理保護
- 批次操作（多選刪除、CSV 匯出）只有 Web 端有，手機端需要逐條操作
- 管理員相關功能（使用者管理、備份、健康檢查）只有 Web 端能看到，且需要 `is_admin` 權限
- 鍵盤快速鍵和指令面板是 Web 端獨有的效率工具
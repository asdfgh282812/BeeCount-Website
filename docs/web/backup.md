---
sidebar_position: 5
description: 蜜蜂記帳 BeeCount Cloud 自動備份－基於 rclone 把資料庫定時備份到 S3、WebDAV、Google Drive 等遠端儲存。
keywords: [BeeCount Cloud 備份, 蜜蜂記帳資料備份, rclone 記帳備份]
---

# 自動備份

頭像選單 → **備份**（僅管理員可見），給整個 BeeCount Cloud 伺服器設定自動化的定時備份，把資料推到你自己的遠端存儲，而不只是依賴本機的 `data/` 目錄。

分三個分頁：**歷史與進度**、**定時任務**、**遠端設定**。建議依照「遠端設定 → 定時任務 → 歷史與進度」的順序配置。

## 遠端設定

先設定備份要推去哪裡－支援 [rclone](https://rclone.org) 能對接的遠端類型：S3、Google Drive、WebDAV、B2 等。

![遠端設定](/img/web/backup-remote.jpg)

:::warning 強烈建議開啟加密
配置遠端時勾選加密層（crypt）。這樣即使遠端儲存帳號洩露，沒有你設定的密語（passphrase）也打不開備份檔案裡的資料。
:::

可以同時配置多個遠端，定時任務可以同時推給多個目標做冗餘備份（例如 S3 + 一份本地 WebDAV）。

## 定時任務

設定自動備份的執行計劃（例如每天幾點）。需要先在「遠端設定」建好至少一個遠端才能新建定時任務。

![定時任務](/img/web/backup-schedule.jpg)

## 歷史與進度

查看每次備份的執行記錄和即時進度—成功 / 失敗、耗時、備份到了哪個遠端。

![歷史與進度](/img/web/backup-history.jpg)

在「定時任務」頁點「立即執行」可以手動觸發一次備份，不用等到下個排程時間，適合升級前、大批量匯入資料前手動做一次保險備份。

## 跟本機 `data/` 目錄備份的關係

[BeeCount Cloud 部署文件](../app/cloud-sync/beecount-cloud.md#資料備份)提到的手動 `rsync data/ 目錄`，和這裡的自動備份是**兩種互補的方案**：

| | `data/` 目錄 rsync | Web 端自動備份 |
|---|---|---|
| 觸發方式 | 手動，或自行寫 cron | Web 介面設定定時任務，自動執行 |
| 備份目標 | 你自己指定的任意位置 | rclone 支援的遠端（S3 / WebDAV / GDrive 等） |
| 加密 | 需要自行處理 | 內建 crypt 加密層選項 |
| 適合場景 | 遷移伺服器、臨時手動備份 | 長期無人值守的定期異地備份 |

建議至少配置一個自動遠端備份，作為日常兜底；遷移伺服器時仍可以用 `data/` 目錄直接 rsync（更完整、恢復更簡單）。
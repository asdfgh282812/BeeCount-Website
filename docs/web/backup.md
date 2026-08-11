---
sidebar_position: 4
description: 蜜蜂记账 BeeCount Cloud 自动备份——基于 rclone 把数据库定时备份到 S3、WebDAV、Google Drive 等远端存储。
keywords: [BeeCount Cloud 备份, 蜜蜂记账数据备份, rclone 记账备份]
---

# 自动备份

头像菜单 → **备份**（仅管理员可见），给整个 BeeCount Cloud 服务器设置自动化的定时备份，把数据推到你自己的远端存储，而不只是依赖本机的 `data/` 目录。

分三个分页：**历史与进度**、**定时任务**、**远端设定**。建议按「远端设定 → 定时任务 → 历史与进度」的顺序配置。

## 远端设定

先设置备份要推去哪——支持 [rclone](https://rclone.org) 能对接的远端类型：S3、Google Drive、WebDAV、B2 等。

![远端设定](/img/web/backup-remote.jpg)

:::warning 强烈建议开启加密
配置远端时勾选加密层（crypt）。这样即使远端存储账号泄露，没有你设置的密语（passphrase）也打不开备份文件里的数据。
:::

可以同时配置多个远端，定时任务可以同时推给多个目标做冗余备份（例如 S3 + 一份本地 WebDAV）。

## 定时任务

设定自动备份的执行计划（例如每天几点）。需要先在「远端设定」建好至少一个远端才能新建定时任务。

![定时任务](/img/web/backup-schedule.jpg)

## 历史与进度

查看每次备份的执行记录和实时进度——成功 / 失败、耗时、备份到了哪个远端。

![历史与进度](/img/web/backup-history.jpg)

在「定时任务」页点「立即执行」可以手动触发一次备份，不用等到下个排程时间，适合升级前、大批量导入数据前手动做一次保险备份。

## 跟本机 `data/` 目录备份的关系

[BeeCount Cloud 部署文档](../app/cloud-sync/beecount-cloud.md#数据备份)提到的手动 `rsync data/ 目录`，和这里的自动备份是**两种互补的方案**：

| | `data/` 目录 rsync | Web 端自动备份 |
|---|---|---|
| 触发方式 | 手动，或自己写 cron | Web 界面配置定时任务，自动执行 |
| 备份目标 | 你自己指定的任意位置 | rclone 支持的远端（S3 / WebDAV / GDrive 等） |
| 加密 | 需要自己处理 | 内置 crypt 加密层选项 |
| 适合场景 | 迁移服务器、临时手动备份 | 长期无人值守的定期异地备份 |

建议至少配置一个自动远端备份，作为日常兜底；迁移服务器时仍然可以用 `data/` 目录直接 rsync（更完整、恢复更简单）。

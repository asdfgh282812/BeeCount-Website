---
sidebar_position: 1
description: 蜜蜂记账 Web 版使用指南——BeeCount Cloud 内置的浏览器管理端，登录方式、PWA 安装、界面导览与 Web 端专属功能一览。
keywords: [蜜蜂记账 Web 版, BeeCount Web, 记账网页版, PWA 记账]
---

# Web 版总览

BeeCount 3.0 起，[BeeCount Cloud](../app/cloud-sync/beecount-cloud.md) 自建云服务内置了一个**浏览器管理端**——不用装 App，打开网址就能记账、看统计、管理账本，数据跟手机 App 双向实时同步。

这一节只讲 **Web 端独有**的操作（命令面板、管理员功能、自动备份等）。其余功能（记账、预算、分类、AI 助手……）Web 端的操作方式已经分别写在对应功能的文档里，各篇最后都有一段「Web 端」小节，例如[记账](../app/record/basic.md#web-端记账)、[预算管理](../app/account/budget.md#web-端预算管理)、[AI 配置](../app/ai/overview.md#web-端-ai-配置)。

## 快速开始

### 登录

浏览器访问你的 BeeCount Cloud 地址（例如 `http://192.168.1.100:8869` 或自定义域名），用邮箱 + 密码登录——账号跟手机 App 共用，两边看到的是同一份数据。

![Web 版首页](/img/web/overview.jpg)

### 安装成 PWA（可选）

Web 管理端是渐进式 Web 应用（PWA）：

- 浏览器地址栏右侧会出现「安装」图标，点一下装到桌面 / Dock / 开始菜单
- 装成独立 App 后，打开没有浏览器地址栏，体验接近原生应用
- 离线时可以读缓存数据，回网后自动同步

详见 [BeeCount Cloud 部署文档](../app/cloud-sync/beecount-cloud.md#web-端支持-pwa)。

## 界面导览

顶部导航栏：**首页 / 交易 / 账户 / 分类 / 标签**，右上角是**搜索（命令面板）**和**头像菜单**。

点开头像菜单，按分组说明如下：

| 分组 | 项目 | 说明 |
|---|---|---|
| 工具 | 预算 / 账本 / 年度报告 | 预算和账本管理见对应功能文档；年度报告是沉浸式年度记账回顾 |
| 设定 | 个人资料 | 主题色、语言、[二次验证 2FA](../app/security/app-lock.md#web-端二次验证2fa) |
| 设定 | AI 设定 | 见 [AI 配置](../app/ai/overview.md#web-端-ai-配置) |
| 设定 | 健康 | 服务器健康检查，见[管理员功能](./admin.md#健康检查) |
| 设定 | 装置 | 登录过的设备列表，见[管理员功能](./admin.md#线上装置) |
| 设定 | 开发者 | MCP 个人存取权杖，见 [MCP 文档](../mcp/intro.md) |
| 管理 | 使用者管理 / 备份 / 资料清理 | 仅管理员可见，见[管理员功能](./admin.md)和[自动备份](./backup.md) |
| 偏好 | 切换主题 / 语言 | 深色模式、繁简/英文切换 |

## Web 端专属功能

以下这些在手机 App 里没有对应界面，是 Web 端独有的：

| 功能 | 说明 |
|---|---|
| [命令面板 ⌘K / Ctrl+K](./command-palette.md) | 键盘驱动的快捷操作与页面跳转 |
| [管理员功能](./admin.md) | 平台用户管理、服务器健康检查、全站在线设备 |
| [自动备份](./backup.md) | 基于 rclone 的定时备份到 S3 / WebDAV / GDrive 等远端 |
| [MCP 个人存取权杖](../mcp/intro.md) | 让 Claude Desktop / Cursor 等 LLM 客户端直接读写账本 |
| 批量操作 | 交易列表多选删除、导出 CSV，见[交易管理](../app/features/record.md) |
| 桌面粘贴记账 | ⌘V 直接粘贴文字/图片给 AI 记账，见 [AI 图片识别](../app/ai/image.md#web-端图片记账) |

## 跟 App 的主要差异

- Web 端没有生物识别应用锁，登录态用 2FA + 设备管理保护
- 批量操作（多选删除、CSV 导出）只有 Web 端有，手机端需要逐条操作
- 管理员相关功能（用户管理、备份、健康检查）只有 Web 端能看到，且需要 `is_admin` 权限
- 键盘快捷键和命令面板是 Web 端独有的效率工具

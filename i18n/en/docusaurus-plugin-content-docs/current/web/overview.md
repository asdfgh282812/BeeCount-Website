---
sidebar_position: 1
description: BeeCount Web guide — the browser admin console built into BeeCount Cloud. Sign-in, PWA install, layout tour, and web-only features.
keywords: [BeeCount Web, expense tracker web app, PWA budgeting]
---

# Web Overview

Starting with BeeCount 3.0, [BeeCount Cloud](../app/cloud-sync/beecount-cloud.md) ships a **browser admin console** — no app install needed, just open the URL to record transactions, check stats, and manage ledgers. Data syncs both ways with the mobile app in real time.

This section only covers what's **web-only** (command palette, admin tools, automated backups, etc). For everything else (recording, budgets, categories, AI assistant...), the web-specific steps already live inside each feature's own doc, usually in a "Web" section near the bottom — for example [Recording](../app/record/basic.md#web-recording), [Budget management](../app/account/budget.md#web-budget-management), [AI configuration](../app/ai/overview.md#web-ai-configuration).

## Getting started

### Sign in

Open your BeeCount Cloud URL in a browser (e.g. `http://192.168.1.100:8869` or your own domain) and sign in with email + password — the same account as the mobile app, same data on both sides.

![Web home](/img/web/overview.jpg)

### Install as a PWA (optional)

The web console is a Progressive Web App (PWA):

- An "Install" icon appears on the right side of the address bar — click it to add the app to your desktop / dock / start menu
- Once installed, it opens without the browser chrome, feeling close to a native app
- Cached data is available offline, and syncs automatically once you're back online

See [BeeCount Cloud deployment docs](../app/cloud-sync/beecount-cloud.md#pwa-support) for more.

## Layout tour

Top nav: **Home / Transactions / Accounts / Categories / Tags**. Top right: **search (command palette)** and the **avatar menu**.

Opening the avatar menu, grouped by section:

| Group | Item | Notes |
|---|---|---|
| Tools | Budget / Ledgers / Annual report | Budget and ledgers are covered in their own docs; annual report is an immersive year-in-review |
| Settings | Profile | Theme color, language, [two-factor auth](../app/security/app-lock.md#web-two-factor-authentication-2fa) |
| Settings | AI Settings | See [AI configuration](../app/ai/overview.md#web-ai-configuration) |
| Settings | Health | Server health check, see [Admin features](./admin.md#health-check) |
| Settings | Devices | Devices you've signed in from, see [Admin features](./admin.md#online-devices) |
| Settings | Developer | MCP personal access tokens, see the [MCP doc](../mcp/intro.md) |
| Admin | Users / Backup / Data cleanup | Admin-only, see [Admin features](./admin.md) and [Automated backups](./backup.md) |
| Preferences | Theme / Language | Dark mode, locale switching |

## Web-only features

These have no equivalent screen in the mobile app — they're web-only:

| Feature | Notes |
|---|---|
| [Command palette ⌘K / Ctrl+K](./command-palette.md) | Keyboard-driven quick actions and page navigation |
| [Admin features](./admin.md) | Platform user management, server health check, sitewide online devices |
| [Automated backups](./backup.md) | rclone-based scheduled backups to S3 / WebDAV / Google Drive and more |
| [MCP personal access tokens](../mcp/intro.md) | Let Claude Desktop / Cursor and other LLM clients read and write your ledger directly |
| Bulk operations | Multi-select delete and CSV export in the transaction list, see [Transaction management](../app/features/record.md) |
| Paste-to-record | ⌘V to paste text/images straight into AI recording, see [AI image recognition](../app/ai/image.md#web-image-recording) |

## Key differences from the app

- No biometric app lock on the web — session security relies on 2FA + device management instead
- Bulk operations (multi-select delete, CSV export) are web-only; mobile requires handling transactions one at a time
- Admin-only features (user management, backups, health check) are visible only on the web and require `is_admin` permission
- Keyboard shortcuts and the command palette are a web-only productivity tool

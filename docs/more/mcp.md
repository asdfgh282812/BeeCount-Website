---
sidebar_position: 5
sidebar_label: MCP 與個人 API Key
title: MCP 與個人 API Key 🔖
description: 建立個人 API Key，讓 Claude、Cursor 等 AI 工具用聊天的方式查詢或記錄你的帳本。
---

想直接對 AI 說「上個月餐費花了多少？」或「幫我記一筆：剛剛在便利店買水 35 元」，而不用打開 App？**帳好嗎**支援 MCP（Model Context Protocol）：你在 Web 建立一把「個人 API Key」，貼到 Claude Desktop、Cursor 等 AI 工具裡，這些工具就能代替你查詢帳本，甚至新增交易。

> 💻 Web（建立 Key）　進階功能 🔖　需要一點電腦操作的基礎

## 為什麼這樣設計

- Key 可以只給「唯讀」權限，AI 只能看、不能改，適合第一次嘗試。
- 需要讓 AI 幫你記帳時才另外開「讀寫」。
- 每把 Key 都能隨時撤銷，不會影響你自己的登入。

## 怎麼操作

### 1. 在 Web 建立個人 API Key

1. 登入 Web，點右上角頭像，展開「設定」群組，選「開發者」。
2. 頁面標題是「個人存取權杖」。按右上角「新建 Token」。
3. 填寫：
   - 「名稱」：用來辨識是給哪個工具用，例如「Claude Desktop」。
   - 「授權範圍」：「唯讀 (mcp:read)」只能查資料；「讀寫 (mcp:read + mcp:write)」還能新增、修改、刪除交易。建議先選唯讀。
   - 「有效期」：30、90、180、365 天或「永不過期」，預設 90 天。
4. 建立後會出現「已建立，請立即複製」，按「複製 Token」。這串以 `bcmcp_` 開頭的文字只會顯示這一次，關掉視窗就看不到了。

![新建存取權杖視窗，填寫名稱、授權範圍與有效期](/img/more/mcp-1.png)
*圖中：「新建存取權杖」視窗，填名稱（辨識這個 token 用在哪）、選授權範圍與有效期，最後按「新建 Token」*

### 2. 在 AI 工具裡設定

連線方式是 Streamable HTTP，端點是「你的伺服器網址」加上 `/api/v1/mcp`。下面的範例請把 `https://你的伺服器網址` 換成你平常登入 Web 的網址，`bcmcp_你的Token` 換成剛才複製的內容。

**Claude Code**（支援直接連線）

```bash
claude mcp add --transport http beecount https://你的伺服器網址/api/v1/mcp \
  --header "Authorization: Bearer bcmcp_你的Token"
```

**Claude Desktop**

編輯設定檔（macOS 在 `~/Library/Application Support/Claude/claude_desktop_config.json`，Windows 在 `%APPDATA%\Claude\claude_desktop_config.json`），加入：

```json
{
  "mcpServers": {
    "beecount": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://你的伺服器網址/api/v1/mcp",
        "--header",
        "Authorization:Bearer bcmcp_你的Token"
      ]
    }
  }
}
```

存檔後完全結束 Claude Desktop 再重新開啟。

**Cursor**

編輯 `~/.cursor/mcp.json`，內容與上面 Claude Desktop 的 `mcpServers` 區塊相同，存檔後重新啟動 Cursor。

:::note 為什麼用 mcp-remote
Claude Desktop、Cursor 這類工具傳統上只支援在本機執行的程式，`mcp-remote` 是一個小橋接程式，負責把它們接到上面的 HTTP 端點，需要電腦已安裝 Node.js。如果你的工具本身就支援遠端 HTTP 的 MCP，也可以直接填端點網址和 `Authorization` 標頭，不需要橋接。
:::

### 3. 試試看

連上後直接問：

- 「我有哪些帳本？」
- 「這個月支出多少？前三名分類是什麼？」
- 「把昨天星巴克那筆 38 元改成 42 元。」（需要讀寫權限）

AI 透過 MCP 新增的交易會自動加上「MCP」標籤，方便和你自己記的區分。

### 目前可用的功能（共 20 個）

**查詢（唯讀即可）：13 個**

| 工具 | 做什麼 |
|---|---|
| `list_ledgers` | 列出所有帳本 |
| `get_active_ledger` | 取得預設帳本 |
| `list_transactions` | 依日期、分類、帳戶、關鍵字、金額範圍查交易 |
| `get_transaction` | 查單筆交易 |
| `list_categories` | 列出分類 |
| `list_accounts` | 列出帳戶 |
| `list_tags` | 列出標籤 |
| `list_budgets` | 列出預算與本期進度（讀的是舊版的帳本總預算資料；4.0 起 App 與 Web 都沒有總預算畫面，專案預算不在這裡） |
| `list_stock_holdings` | 列出股票持股 |
| `get_stock_realized_pnl` | 股票已實現損益報表 |
| `get_ledger_stats` | 帳本統計 |
| `get_analytics_summary` | 本月、本年或全部的收支摘要與分類排行 |
| `search` | 全文搜尋 |

**寫入（需要讀寫權限）：7 個**

| 工具 | 做什麼 |
|---|---|
| `create_transaction` | 新增一筆交易 |
| `create_transactions` | 一次新增多筆 |
| `update_transaction` | 修改交易 |
| `delete_transaction` | 刪除交易（需要二次確認） |
| `create_category` | 新增分類 |
| `update_budget` | 修改預算金額（同上，只對舊版的帳本總預算資料有作用） |
| `parse_and_create_from_text` | 用**帳好嗎**自己的 AI 解析一段文字並記帳 |

## 注意事項／小提醒

:::warning Token 等同帳號密碼
Token 能讀取你的全部帳本資料，請只設定在信任的工具上，不要貼到公開的地方或放進程式碼倉庫。外洩時，立刻回到「開發者」頁按「撤銷」或「刪除」，該 Token 馬上失效。
:::

- 刪除交易時，AI 會先回報「待確認」，需要你同意後才會真的刪除。
- 修改 Token 的授權範圍後，要重新連線 AI 工具才會生效；有效期建立後不能改，要延長請重新建立。
- 「開發者」頁下方有「呼叫紀錄」，保留 30 天的 MCP 呼叫，可以查看 AI 做了什麼。
- Token 只能用在 MCP，不能拿去呼叫一般的 API。
- `parse_and_create_from_text` 需要先在 Web 頭像選單的「設定」群組→「智慧記帳」，在 AI 服務管理裡設好 AI 服務商。
- 有多個帳本卻沒指定時，會使用最早建立的帳本；建議先請 AI 列出帳本，再指定要操作哪一本。
- 連不上時，先確認 Token 完整、沒有多餘空格，且還沒過期或被撤銷。

## 相關頁面

- [Web 版](../sync/web.md)
- [AI 記帳](../record/ai.md)
- [AI 聊天與查帳](../record/ai-chat.md)
- [裝置與安全](../sync/devices.md)

import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'App 使用手冊',
      items: [
        {
          type: 'category',
          label: '快速开始',
          items: ['app/getting-started/installation', 'app/getting-started/first-record'],
        },
        {
          type: 'category',
          label: '记账',
          items: [
            'app/record/basic',
            'app/record/recurring',
            'app/record/attachment',
            'app/record/flags',
            'app/record/auto-ios',
            'app/record/auto-android',
            'app/record/import-export',
            'app/record/quick-actions',
            'app/record/widgets',
          ],
        },
        {
          type: 'category',
          label: '分类与标签',
          items: [
            'app/category/manage',
            'app/category/subcategory',
            'app/category/tag',
          ],
        },
        {
          type: 'category',
          label: '账户与账本',
          items: [
            'app/account/manage',
            'app/account/ledger',
            'app/account/month-start-day',
            'app/account/multi-currency',
            'app/account/net-worth-trend',
            'app/account/budget',
          ],
        },
        {
          type: 'category',
          label: '统计分析',
          items: [
            'app/statistics/overview',
            'app/statistics/chart',
            'app/statistics/calendar',
          ],
        },
        {
          type: 'category',
          label: 'AI 助手',
          items: [
            'app/ai/overview',
            'app/ai/voice',
            'app/ai/image',
            'app/ai/chat',
          ],
        },
        {
          type: 'category',
          label: '云同步',
          items: [
            'app/cloud-sync/overview',
            'app/cloud-sync/beecount-cloud',
            'app/cloud-sync/icloud',
            'app/cloud-sync/supabase',
            'app/cloud-sync/webdav',
            'app/cloud-sync/s3',
          ],
        },
        'app/shared-ledger',
        {
          type: 'category',
          label: 'Cloud 進階功能',
          items: [
            'app/cloud-advanced/recurring',
            'app/cloud-advanced/installment',
            'app/cloud-advanced/split-refund',
            'app/cloud-advanced/debt',
            'app/cloud-advanced/credit-card-billing',
            'app/cloud-advanced/card-rewards',
            'app/cloud-advanced/swipesmart-recommend',
            'app/cloud-advanced/swipesmart-quickadd',
            'app/cloud-advanced/reconciliation',
            'app/cloud-advanced/project',
            'app/cloud-advanced/tx-template',
          ],
        },
        {
          type: 'category',
          label: '数据维护',
          items: [
            'app/maintenance/data-cleanup',
          ],
        },
        {
          type: 'category',
          label: '安全与隐私',
          items: [
            'app/security/app-lock',
          ],
        },
        {
          type: 'category',
          label: '个性化',
          items: [
            'app/personalize/theme',
            'app/personalize/dark-mode',
            'app/personalize/color-scheme',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Web 版使用手冊',
      items: [
        'web/overview',
        'web/command-palette',
        'web/admin',
        'web/backup',
      ],
    },
    'mcp/intro',
    'faq',
    'contributing',
    'changelog',
  ],
};

export default sidebars;

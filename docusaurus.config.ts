import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '帳好嗎使用手冊',
  tagline: '一步一步學會記帳、管卡、看報表',
  favicon: 'img/favicon.ico',

  url: 'https://tallycheck-manual.pages.dev',
  baseUrl: '/',

  organizationName: 'asdfgh282812',
  projectName: 'BeeCount-Website',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      // 圖片檔不存在時讓建置失敗，避免上線後出現破圖
      onBrokenMarkdownImages: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant'],
    localeConfigs: {
      'zh-Hant': {
        label: '繁體中文',
        htmlLang: 'zh-TW',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/asdfgh282812/BeeCount-Website/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // App 內嵌(embed)模式:App 的「使用說明」WebView 開啟文件站時帶
    // ?embed=1&theme=dark|light&primary=RRGGBB。行內腳本必須在 Docusaurus
    // 啟動前執行(preBody),否則暗黑主題首屏閃白。
    // - embed 標記存 sessionStorage:query 只在首次載入存在,SPA 內部導航靠
    //   <html data-bee-embed> 屬性維持(不用 class:hydration 會重寫 className),硬重新整理/直接連結靠 sessionStorage 還原
    // - theme 寫 localStorage['theme'](Docusaurus colorMode 的儲存鍵)
    // - primary 設定 --ifm-color-primary 及衍生明暗檔(對齊 App 主題色)
    // 對應隱藏規則見 src/css/custom.css 的 html[data-bee-embed] 段。
    function beeEmbedPlugin() {
      return {
        name: 'bee-embed-mode',
        injectHtmlTags() {
          return {
            preBodyTags: [
              {
                tagName: 'script',
                innerHTML: `(function(){try{
var q=new URLSearchParams(location.search);
if(q.get('embed')==='1'){sessionStorage.setItem('bee-embed','1');}
if(sessionStorage.getItem('bee-embed')==='1'){document.documentElement.setAttribute('data-bee-embed','1');}
var t=q.get('theme');
if(t==='dark'||t==='light'){localStorage.setItem('theme',t);document.documentElement.setAttribute('data-theme',t);}
var p=q.get('primary');
if(p&&/^[0-9a-fA-F]{6}$/.test(p)){sessionStorage.setItem('bee-primary',p);}
var sp=sessionStorage.getItem('bee-primary');
if(sp){
  var n=parseInt(sp,16),r=(n>>16)&255,g=(n>>8)&255,b=n&255;
  var mix=function(c,t2,k){return Math.round(c+(t2-c)*k);};
  var rgb=function(k,t2){return 'rgb('+mix(r,t2,k)+','+mix(g,t2,k)+','+mix(b,t2,k)+')';};
  var s=document.documentElement.style;
  s.setProperty('--ifm-color-primary','#'+sp);
  s.setProperty('--ifm-color-primary-dark',rgb(0.1,0));
  s.setProperty('--ifm-color-primary-darker',rgb(0.15,0));
  s.setProperty('--ifm-color-primary-darkest',rgb(0.3,0));
  s.setProperty('--ifm-color-primary-light',rgb(0.1,255));
  s.setProperty('--ifm-color-primary-lighter',rgb(0.15,255));
  s.setProperty('--ifm-color-primary-lightest',rgb(0.3,255));
}
}catch(e){}})();`,
              },
            ],
          };
        },
      };
    },
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "zh"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: "/docs",
        indexBlog: false,
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: '帳好嗎使用手冊',
      logo: {
        alt: '帳好嗎 TallyCheck 標誌',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '使用手冊',
        },
        {
          to: '/docs/changelog',
          label: '更新紀錄',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `帳好嗎 TallyCheck 使用手冊 · 本手冊對應 App 4.0.0`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

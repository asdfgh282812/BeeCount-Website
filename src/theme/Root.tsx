import React, {useEffect} from 'react';
import Head from '@docusaurus/Head';

/**
 * Root wrapper component
 *
 * 支援透過 URL 參數傳遞主題模式與嵌入模式：
 * - ?mode=dark 或 ?mode=light - 設定主題模式
 * - ?embed=true - 嵌入模式，隱藏導覽列與頁尾
 *
 * App 內「使用說明」的 WebView 使用的是 docusaurus.config.ts 的 beeEmbedPlugin
 *（?embed=1&theme=...&primary=...），這裡保留舊參數是為了相容。
 */
export default function Root({children}: {children: React.ReactNode}): JSX.Element {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams(window.location.search);

    const mode = searchParams.get('mode');
    if (mode === 'dark' || mode === 'light') {
      document.documentElement.setAttribute('data-theme', mode);
      localStorage.setItem('theme', mode);
    }

    const embed = searchParams.get('embed');
    if (embed === 'true' || embed === '1') {
      document.body.classList.add('embed-mode');
    }
  }, []);

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="帳好嗎使用手冊" />
        <meta name="keywords" content="帳好嗎, TallyCheck, 記帳, 信用卡, 股票, 預算, 農場, 使用手冊" />
      </Head>
      {children}
    </>
  );
}

import React from 'react';
import {Redirect} from '@docusaurus/router';

/** 手冊站沒有行銷首頁，直接進入手冊。 */
export default function Home(): JSX.Element {
  return <Redirect to="/docs/intro" />;
}

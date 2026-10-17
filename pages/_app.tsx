import '@/css/global.css';
import '@/css/prism.css';
import '@/css/tailwind.css';
import 'katex/dist/katex.css';

import '@fontsource/fira-code';

import { ThemeProvider, useTheme } from 'next-themes';
import { MotionConfig } from 'motion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Analytics from '@/components/analytics';
import { ClientReload } from '@/components/ClientReload';
import CustomCursor from '@/components/CustomCursor';
import LayoutWrapper from '@/components/LayoutWrapper';
import Preloader from '@/components/Preloader';
import * as siteMetadata from '@/data/siteMetadata';

import { GeistProvider } from '@geist-ui/core';

const isDevelopment = process.env.NODE_ENV === 'development';
const isSocket = process.env.SOCKET;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      {/* Motion degrades transforms/layout animations to opacity for users
          who prefer reduced motion — springs stay interruptible for everyone else */}
      <MotionConfig reducedMotion='user'>
        <Preloader />
        <CustomCursor />
        <GeistProviderWithTheme>
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </GeistProviderWithTheme>
      </MotionConfig>
    </ThemeProvider>
  );
}

function GeistProviderWithTheme(props): React.ReactElement {
  const { resolvedTheme } = useTheme();

  return (
    <GeistProvider themeType={resolvedTheme}>{props.children}</GeistProvider>
  );
}

/**********************************************************
 * Documents
 *
 * @author Yoshitsugu Tahara <arisahyper0000@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {GA_TRACKING_ID} from '../utils/gtag';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          {GA_TRACKING_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
                `,
                }}
              />
            </>
          )}
          {/* ogp */}
          <meta name="description" content="" />
          <meta property="og:title" content="ふぁいんど！" />
          <meta
            property="og:description"
            content="待ち合わせ相手が楽に見つかるWebアプリ"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://find.cateiru.com" />
          <meta
            property="og:image"
            content="https://find.cateiru.com/ogp.png"
          />
          {/* Twitter ogp */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="ふぁいんど！" />
          <meta
            name="twitter:description"
            content="待ち合わせ相手が楽に見つかるWebアプリ"
          />
          <meta
            name="twitter:image"
            content="https://find.cateiru.com/ogp.png"
          />
          <meta name="twitter:site" content="@cateiru" />
          <meta name="twitter:creator" content="@cateiru" />

          <meta name="referrer" content="strict-origin-when-cross-origin" />

          {/* favicons */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

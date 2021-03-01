/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets();
    const enhanceApp = (App: any) => {
      return (props: any) => sheets.collect(<App {...props} />);
    };

    const { html, head } = await ctx.renderPage({ enhanceApp });
    const initialProps = await Document.getInitialProps(ctx);
    return {
      html,
      head,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* 1. MetaData
                    2. Static Resources
                    3. Global Styles */}
          <meta charSet="utf-8" />
          <meta name="google" content="notranslate" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Muli:300,400:latin"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            rel="stylesheet"
            href="https://storage.googleapis.com/builderbook/nprogress.min.css"
          />
          <style>
            {`
                  a, a:focus {
                  font-weight: 400;
                  color: #080808;
                  text-decoration: none;
                  outline: none;
                  }
                  a:hover, button:hover {
                  opacity: 0.75;
                  cursor: pointer;
                  }
              `}
          </style>
        </Head>
        <body
          style={{
            font: "18px Muli",
            fontWeight: 300,
            padding: 0,
            margin: 0,
            backgroundColor: "#f7f7f7",
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

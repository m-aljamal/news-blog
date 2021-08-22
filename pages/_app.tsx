import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "next-auth/client";
import { SWRConfig } from "swr";
import axios from "axios";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SWRConfig value={{ fetcher: (url) => axios(url).then((r) => r.data) }}>
        <Provider session={pageProps.session}>
          <hr />
          <Component {...pageProps} />
          {/* <div className="p-4">Footer</div> */}
        </Provider>
      </SWRConfig>
    </>
  );
}
export default MyApp;

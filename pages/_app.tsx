import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import LogoNav from "src/components/navbar/LogoNav";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider session={pageProps.session}>
        <LogoNav />
        <hr />
        <Component {...pageProps} />
        {/* <div className="p-4">Footer</div> */}
        
      </Provider>
    </>
  );
}
export default MyApp;

import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import NavBar from "src/components/navbar";
import Footer from "src/components/footer";
import { prisma } from "src/prisma";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;

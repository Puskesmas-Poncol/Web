import Header from "@/components/layouts/header";
import Sidebar from "@/components/layouts/sidebar";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "dayjs";
import PageContext from "@/hooks/pageContext";

export default function App({ Component, pageProps }) {
  return (
    <PageContext>
      <div className="flex w-screen">
        <Sidebar />
        <div className="w-full">
          <Header />
          <Component {...pageProps} />
        </div>
        <ToastContainer autoClose={1500} />
      </div>
    </PageContext>
  );
}

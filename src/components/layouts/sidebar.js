import { useEffect, useRef, useState } from "react";
import DashboardIcon from "../icons/dashboardIcon";
import UploadIcon from "../icons/uploadIcon";
import { useContainerDimensions } from "@/hooks/useContainerDimension";
import { useRouter } from "next/router";
import { getUserToken } from "@/utils/userToken";

export default function Sidebar() {
  const router = useRouter();
  const [isDashboard, setIsDashboard] = useState(true);

  useEffect(() => {
    if (router.pathname.toLowerCase().includes("upload")) {
      setIsDashboard(false);
    }
  }, [router.pathname]);

  return (
    <div className="">
      <div className="bg-primary  fixed left-0 top-0 bottom-0 shadow-xl h-screen py-6 w-[280px]">
        <div className="flex items-center pl-6 gap-2 mb-12">
          <img
            src="/assets/images/magetan.png"
            className="w-10 h-10 object-fill"
          />
          <h1 className="body3 text-slate-100">Puskesmas Poncol</h1>
        </div>
        <div className="text-slate-400 px-4 mb-2">Menu Utama</div>
        <div
          className={`flex mb-1 ${
            isDashboard ? "bg-secondary" : ""
          } hover:bg-secondary items-center py-2 px-4 rounded-3xl cursor-pointer text-slate-200  gap-2`}
          onClick={() => {
            router.push("/");
            setIsDashboard(true);
          }}
        >
          <DashboardIcon className=" text-slate-300 w-5 h-5" />
          <div className="w-[1px] h-[20px] bg-slate-400"></div>
          <div className="body4 font-medium">Dashboard</div>
        </div>
        <div
          onClick={() => {
            if (!getUserToken()) {
              return;
            }
            router.push("/upload");
            setIsDashboard(false);
          }}
          className={`flex mb-1 ${
            !isDashboard ? "bg-secondary" : ""
          } hover:bg-secondary items-center py-2 px-4 rounded-3xl cursor-pointer text-slate-200  gap-2`}
        >
          <UploadIcon className=" text-slate-300 w-5 h-5" />
          <div className="w-[1px] h-[20px] bg-slate-400"></div>
          <div className="body4 font-medium">Upload Data</div>
        </div>
      </div>
      <div className="bg-red-50 w-[280px]"></div>
    </div>
  );
}

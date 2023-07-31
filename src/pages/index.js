import Image from "next/image";
import { Inter } from "next/font/google";
import Sidebar from "@/components/layouts/sidebar";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import Stunting from "../data/stunting.json";
import axios from "axios";
import { BASE_URL } from "@/hooks/pageContext";
import { DatePicker } from "antd";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [date, setDate] = useState(null);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const request = await axios.get(`${BASE_URL}/api/data`, {
        params: { date },
      });
      setData(request.data.data);
      console.log(request.data.data);
    } catch (err) {
      toast.error(e?.response?.data?.message ?? e.message);
    }
  };

  useEffect(() => {
    getData();
  }, [date]);

  return (
    <div>
      <div className="px-24 mt-8">
        <div className="w-[60vw] bg-white pb-6 pt-10 px-8 shadow-md rounded-xl">
          <div className="flex justify-end mb-4">
            <DatePicker
              picker="month"
              onChange={(e) => {
                setDate(e.format("YYYY-MM"));
              }}
            ></DatePicker>
          </div>
          <ResponsiveContainer width="100%" height={450} className="">
            {data.length == 0 ? (
              <div className="w-full justify-center items-center flex h-full">
                <div className="flex flex-col items-center">
                  <img src="/assets/icons/no_data.svg" className="w-24 mb-4" />
                  <div>Tidak ada data di bulan ini</div>
                </div>
              </div>
            ) : (
              <BarChart height={450} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis width={20} dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="buruk" fill="rgb(239 68 68)" />
                <Bar dataKey="baik" fill="rgb(96 165 250)" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

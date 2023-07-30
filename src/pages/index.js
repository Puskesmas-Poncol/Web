import Image from "next/image";
import { Inter } from "next/font/google";
import Sidebar from "@/components/layouts/sidebar";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import Stunting from "../data/stunting.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(Stunting);
  }, []);

  return (
    <div>
      <div>
        <BarChart width={600} height={450} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="rgb(239 68 68)" />
          <Bar dataKey="uv" fill="rgb(96 165 250)" />
        </BarChart>
      </div>
    </div>
  );
}

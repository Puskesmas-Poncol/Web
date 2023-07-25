import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <div>
        <div className="flex items-center">
          <img src="/assets/images/magetan.png" width={60} height={60} />
          <div className="text-xl font-bold">Puskesmas Poncol</div>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@mui/material";

export default function Header() {
  return (
    <div className="w-full bg-slate-50 py-4 shadow-sm">
      <div className="flex justify-end pr-8">
        <button className="btn btn-primary" color="rgb(82, 116, 131)">
          LOGIN
        </button>
      </div>
    </div>
  );
}

import { AppContext, BASE_URL } from "@/hooks/pageContext";
import { getUserToken } from "@/utils/userToken";
import { DatePicker, Form, Input, Select } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UploadPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    excel_file: null,
    id_posyandu: null,
    tanggal: "",
  });

  const handleFile = (e) => {
    setForm({ ...form, excel_file: e.target.files[0] });
  };

  const handleSubmit = async () => {
    if (form.excel_file == null) {
      return toast.error("File tidak boleh kosong!");
    }
    const formData = new FormData();
    formData.append("excel_file", form.excel_file);
    formData.append("id_posyandu", form.id_posyandu);
    formData.append("tanggal", form.tanggal);

    try {
      const request = await axios.post(`${BASE_URL}/api/data`, formData, {
        headers: { Authorization: `Bearer ${getUserToken()}` },
      });

      toast.success("Berhasil upload data");
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e.message);
    }
  };

  useEffect(() => {
    if (!getUserToken()) {
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="py-10 px-8">
      <div className="flex justify-between mb-4">
        <div className="text-lg font-bold">UNGGAH BERKAS</div>
        <button className="btn btn-secondary">
          <a
            href="https://api-ruang-bersama.mfadlihs.com/public/images/TEMPLATE.xls"
            download
          >
            UNDUH TEMPLATE
          </a>
        </button>
      </div>

      <Form onFinish={handleSubmit}>
        <div class="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-10 h-10 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 ">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-base text-gray-500 ">.xls, .xlsx</p>
            </div>
            <input
              onChange={handleFile}
              className="!hidden"
              id="dropzone-file"
              type="file"
            />
          </label>
        </div>
        <div>{form.excel_file?.name}</div>

        <div className="flex gap-4">
          <div className="mt-4 basis-[50%]">
            <label htmlFor="id_posyandu" className="mb-1">
              Pilih Posyandu
            </label>
            <Form.Item
              name="posyandu"
              rules={[
                {
                  required: true,
                  message: "Posyandu tidak boleh kosong!",
                },
              ]}
            >
              <Select
                size="large"
                id="id_posyandu"
                placeholder="Pilih Posyandu"
                onChange={(e) => {
                  setForm({ ...form, id_posyandu: e });
                }}
                options={[
                  { label: "Posyandu Gondang Lor 2", value: 1 },
                  { label: "Posyandu Gondang Lor 1", value: 2 },
                  { label: "Posyandu Gondang Kidul", value: 3 },
                  { label: "Posyandu Dali", value: 4 },
                  { label: "Posyandu Turus", value: 5 },
                  { label: "Posyandu Duwet Garut", value: 6 },
                  { label: "Posyandu Alastuwo", value: 7 },
                  { label: "Posyandu Banaran", value: 8 },
                  { label: "Posyandu Dali 1", value: 9 },
                ]}
              />
            </Form.Item>
          </div>
          <div className="grow mt-4 basis-[50%]">
            <label htmlFor="id_posyandu" className="mb-1">
              Pilih Tanggal
            </label>
            <Form.Item
              name="tanggal"
              rules={[
                {
                  required: true,
                  message: "Tanggal tidak boleh kosong!",
                },
              ]}
            >
              <DatePicker
                size="large"
                id="id_posyandu"
                placeholder="Pilih Posyandu"
                onChange={(e) => {
                  setForm({ ...form, tanggal: e.format("YYYY-MM-DD") });
                }}
                className="w-full"
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            UPLOAD
          </button>
        </div>
      </Form>
    </div>
  );
}

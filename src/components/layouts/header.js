import { AppContext, BASE_URL } from "@/hooks/pageContext";
import { deleteUserToken, getUserToken, setUserToken } from "@/utils/userToken";
import { Form, Input, Modal } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

export default function Header() {
  const { setUser, user } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const getUserProfile = async () => {
    try {
      const request = await axios.get(`${BASE_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${getUserToken()}` },
      });
      setUser(request.data.data);
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e.message);
      deleteUserToken();
    }
  };

  const login = async () => {
    try {
      const request = await axios.post(`${BASE_URL}/api/login`, form);
      toast.success(request.data.message);
      setUserToken(request.data.data.token);
      getUserProfile();
      setIsModalOpen(false);
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e.message);
    }
  };

  return (
    <div className="w-full bg-slate-50 py-4 shadow-sm">
      <div className="flex justify-end pr-8">
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/pp.jpeg"
              className="w-8 rounded-full h-8"
            />
            <div className="text-xl font-bold">{user?.name}</div>
          </div>
        ) : (
          <button
            onClick={openModal}
            className="btn btn-primary"
            color="rgb(82, 116, 131)"
          >
            LOGIN
          </button>
        )}
      </div>
      <Modal
        title="LOGIN"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        footer={[
          <button className="btn btn-primary" form="login-form" type="submit">
            LOGIN
          </button>,
        ]}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form onFinish={login} id="login-form">
          <div className="-mb-2">
            <label htmlFor="email">Email</label>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Email tidak valid!",
                },
              ]}
            >
              <Input
                id="email"
                name="email"
                onChange={handleChange}
                type="email"
              ></Input>
            </Form.Item>
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password tidak boleh kosong!",
                },
              ]}
            >
              <Input
                id="password"
                name="password"
                onChange={handleChange}
                type="password"
              ></Input>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

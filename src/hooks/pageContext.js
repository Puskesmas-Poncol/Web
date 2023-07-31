import { deleteUserToken, getUserToken } from "@/utils/userToken";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext(null);
export const BASE_URL = "https://api-puskesmas.mfadlihs.com";

export default function PageContext({ children }) {
  const [user, setUser] = useState(null);

  const getUserProfile = async () => {
    try {
      const request = await axios.get(`${BASE_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      });
      setUser(request.data.data);
    } catch (e) {
      deleteUserToken();
    }
  };

  useEffect(() => {
    if (!!getUserToken()) {
      getUserProfile();
    }
  }, []);

  const value = {
    user,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

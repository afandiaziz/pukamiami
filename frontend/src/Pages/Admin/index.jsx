import React, { useContext, useEffect, useState } from "react";
import { getProfile } from "../../api/auth";
import { useCookie } from "../../hooks/useCookie";

export default function AdminPages() {
  const { getItem } = useCookie();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      async function fetchData() {
        const token = getItem("token");
        //   const token = cookieCutter.get("token");
        await getProfile({ token: token }).then((res) => {
          setUser(res.data.data);
        });
      }
      fetchData();
    }
  }, [user]);

  console.log(user);

  return <div>AdminPages</div>;
}

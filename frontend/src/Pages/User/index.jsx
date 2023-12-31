import React, { useContext, useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";
import { getProfile } from "../../api/auth";
import { useCookie } from "../../hooks/useCookie";

export default function UserPages() {
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

  return (
    <>
      {!user ? (
        <div>ini button masuk</div>
      ) : (
        <div>
          {user?.name}
          {user?.role?.name == "user" ? <div>ini untuk user</div> : <div>untuk admin</div>}
        </div>
      )}
    </>
  );
}

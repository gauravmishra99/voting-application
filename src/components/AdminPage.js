import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AdminBody from "./AdminBody";
import Loading from "./Loading";
import Unauthorized from "./Unauthorized";
import { UserContext } from "./context/UserContext";

const AdminPage = () => {
  const { userValue, loginValue } = useContext(UserContext);
  const [user, setUser] = userValue;
  const [isLoggedIn, setIsLoggedIn] = loginValue;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadingfun();
  }, []);

  const loadingfun = async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>{isLoggedIn ? <AdminBody /> : <Unauthorized />}</>
      )}
    </div>
  );
};

export default AdminPage;

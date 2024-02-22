import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

export default function Profile() {
  const [name, setName] = useState("");

  const handleResetPassword = () => {
    axiosInstance.get("user")
      .then((response) => {
        setName(response.data);
      })
      .catch((error) => {
        console.error("İstek hatası:", error);
      });
  };

  useEffect(() => {
    handleResetPassword();
    console.log("Component mounted");

    return () => {
      console.log("Component unmounted");
    };
  }, []);

  return (
    <div>
      <h3>{`HOŞ GELDİN ${name}`}</h3>
    </div>
  );
}

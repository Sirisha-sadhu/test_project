// import React from 'react'

// const MainDashboard = () => {
//   return (
//     <div>
//       <h1>MAINDASHBOARD</h1>
//     </div>
//   )
// }

// export default MainDashboard
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.register);

  useEffect(() => {
    if (userInfo?.kycStatus === "approved") {
      navigate("/maindashboard");
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      
    </div>
  );
}

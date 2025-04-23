// pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  return (<h1>Dashboard</h1>);
  /*const [data, setData] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      setData(json.message);
    };

    fetchData();
  }, [token]);

  return <div>{data ? <p>{data}</p> : <p>Loading...</p>}</div>;*/
};

export default Dashboard;




// import React, { useEffect, useState } from "react";
// import styles from "./AdminDashboard.module.css";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// import Httpservices from "../../Components/Services/Httpservices";
// import Auth from "../../Components/Services/Auth";
// const Card = ({ title, value, children }) => {
//   return (
//     <div className={styles.card}>
//       <h2 className={styles.cardTitle}>{title}</h2>
//       {value !== undefined && <p className={styles.cardValue}>{value}</p>}
//       {children}
//     </div>
//   );
// };

// const AdminDashboard = () => {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [activeUsers, setActiveUsers] = useState(0);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const token = Auth.getToken();
//     if (!token) {
//       setError("User is not authenticated. Please log in.");
//       return;
//     }
//     try {
//       const userRes = await Httpservices.get("https://admediaagency.online/kimi/user-count", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTotalUsers(userRes.data.totalUsers);

//       const revenueRes = await Httpservices.get("https://admediaagency.online/kimi/total-revenue", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTotalRevenue(revenueRes.data.totalRevenue);

//       const activeRes = await Httpservices.get("https://admediaagency.online/kimi/active-accounts", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setActiveUsers(activeRes.data.activeCount);
//     } catch (error) {
//       console.error("Error fetching data:", error.response || error.message);
//       setError("Failed to fetch dashboard data.");
//     }
//   };

//   return (
//     <div className={styles.dashboardContainer}>
     
      
//       {/* Main Content */}
//       <div className={styles.mainContent}>
//         <h1 className={styles.title}>Admin Dashboard</h1>
        
//         {error ? <p className={styles.error}>{error}</p> : (
//           <div className={styles.statsGrid}>
//             <Card title="Total Users" value={totalUsers} />
//             <Card title="Total Revenue" value={`$${totalRevenue}`} />
//             <Card title="Active Users" value={activeUsers} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



// import React, { useEffect, useState } from "react";
// import styles from "./AdminDashboard.module.css";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// import Httpservices from "../../Components/Services/Httpservices";
// import Auth from "../../Components/Services/Auth";

// const Card = ({ title, value, children }) => {
//   return (
//     <div className={styles.card}>
//       <h2 className={styles.cardTitle}>{title}</h2>
//       {value !== undefined && <p className={styles.cardValue}>{value}</p>}
//       {children}
//     </div>
//   );
// };

// const AdminDashboard = () => {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [activeUsers, setActiveUsers] = useState(0);
//   const [dailyRevenue, setDailyRevenue] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchData();
//     fetchDailyRevenue();
//   }, []);

//   const fetchData = async () => {
//     const token = Auth.getToken();
//     if (!token) {
//       setError("User is not authenticated. Please log in.");
//       return;
//     }
//     try {
//       const userRes = await Httpservices.get("https://admediaagency.online/kimi/user-count", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTotalUsers(userRes.data.totalUsers);

//       const revenueRes = await Httpservices.get("https://admediaagency.online/kimi/total-revenue", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTotalRevenue(revenueRes.data.totalRevenue);

//       const activeRes = await Httpservices.get("https://admediaagency.online/kimi/active-accounts", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setActiveUsers(activeRes.data.activeCount);
//     } catch (error) {
//       console.error("Error fetching data:", error.response || error.message);
//       setError("Failed to fetch dashboard data.");
//     }
//   };

//   const fetchDailyRevenue = async () => {
//     const token = Auth.getToken();
//     if (!token) return;

//     try {
//       const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
//       const today = new Date();
//       const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      
//       const last7Days = [...Array(7).keys()].map(offset => {
//         const date = new Date();
//         date.setDate(today.getDate() - ((currentDay + 6 - offset) % 7));
//         return {
//           date: date.toISOString().split('T')[0],
//           day: daysOfWeek[offset]
//         };
//       });

//       const revenueData = await Promise.all(
//         last7Days.map(async ({ date, day }) => {
//           const res = await Httpservices.get(`https://admediaagency.online/kimi/daily-revenue?date=${date}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           return { date: day, revenue: res.data.revenue || 0 };
//         })
//       );

//       setDailyRevenue(revenueData);
//     } catch (error) {
//       console.error("Error fetching daily revenue:", error.response || error.message);
//     }
//   };

//   return (
//     <div className={styles.dashboardContainer}>
//       <div className={styles.mainContent}>
//         <h1 className={styles.title}>Admin Dashboard</h1>
        
//         {error ? <p className={styles.error}>{error}</p> : (
//           <div className={styles.statsGrid}>
//             <Card title="Total Users" value={totalUsers} />
//             <Card title="Total Revenue" value={`$${totalRevenue}`} />
//             <Card title="Active Users" value={activeUsers} />
//           </div>
//         )}

//         <div className={styles.chartContainer}>
//           <Card title="Daily Revenue">
//             <BarChart width={600} height={300} data={dailyRevenue}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="revenue" fill="#82ca9d" />
//             </BarChart>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Httpservices from "../../Components/Services/Httpservices";
import Auth from "../../Components/Services/Auth";

const Card = ({ title, value, children }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>{title}</h2>
      {value !== undefined && <p className={styles.cardValue}>{value}</p>}
      {children}
    </div>
  );
};

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    fetchDailyRevenue();
  }, []);

  const fetchData = async () => {
    const token = Auth.getToken();
    if (!token) {
      setError("User is not authenticated. Please log in.");
      return;
    }
    try {
      const userRes = await Httpservices.get("https://admediaagency.online/kimi/user-count", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalUsers(userRes.data.totalUsers);

      const revenueRes = await Httpservices.get("https://admediaagency.online/kimi/total-revenue", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalRevenue(revenueRes.data.totalRevenue);

      const activeRes = await Httpservices.get("https://admediaagency.online/kimi/active-accounts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActiveUsers(activeRes.data.activeCount);
    } catch (error) {
      console.error("Error fetching data:", error.response || error.message);
      setError("Failed to fetch dashboard data.");
    }
  };

  const fetchDailyRevenue = async () => {
    const token = Auth.getToken();
    if (!token) return;

    try {
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const today = new Date();
      
      const last7Days = [...Array(7).keys()].map(offset => {
        const date = new Date();
        date.setDate(today.getDate() - offset);
        return {
          date: date.toISOString().split('T')[0],
          day: daysOfWeek[date.getDay()]
        };
      }).reverse();

      const revenueData = await Promise.all(
        last7Days.map(async ({ date, day }) => {
          const res = await Httpservices.get(`https://admediaagency.online/kimi/daily-revenue?date=${date}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return { dayWithDate: `${day} (${date})`, revenue: res.data.revenue || 0 };
        })
      );

      setDailyRevenue(revenueData);
    } catch (error) {
      console.error("Error fetching daily revenue:", error.response || error.message);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        
        {error ? <p className={styles.error}>{error}</p> : (
          <div className={styles.statsGrid}>
            <Card title="Total Users" value={totalUsers} />
            <Card title="Total Revenue" value={`$${totalRevenue}`} />
            <Card title="Active Users" value={activeUsers} />
          </div>
        )}

        <div className={styles.chartContainer}>
          <Card title="Daily Revenue">
            <BarChart width={600} height={300} data={dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dayWithDate" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#ef9273" />
            </BarChart>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

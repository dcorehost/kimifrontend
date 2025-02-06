import React from "react";
import styles from "./AdminDashboard.module.css";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Card = ({ title, value, children }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>{title}</h2>
      {value && <p className={styles.cardValue}>{value}</p>}
      {children}
    </div>
  );
};

const Table = ({ data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const AdminDashboard = () => {
  const users = [
    { name: "John Doe", email: "john@example.com", status: "Active" },
    { name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
  ];

  const userGrowthData = [
    { name: "Jan", users: 100 },
    { name: "Feb", users: 200 },
    { name: "Mar", users: 300 },
    { name: "Apr", users: 400 },
  ];

  const revenueData = [
    { name: "Jan", revenue: 1000 },
    { name: "Feb", revenue: 2500 },
    { name: "Mar", revenue: 3500 },
    { name: "Apr", revenue: 5000 },
  ];

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      {/* <AdminSidebar /> */}
      
      {/* Main Content */}
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        
        {/* Stats Section */}
        <div className={styles.statsGrid}>
          <Card title="Total Users" value="1,234" />
          <Card title="Revenue" value="$45,678" />
          <Card title="Active Sessions" value="56" />
        </div>

        {/* Charts Section */}
        <div className={styles.chartsGrid}>
          <Card title="User Growth">
            <BarChart width={300} height={200} data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#8884d8" />
            </BarChart>
          </Card>
          <Card title="Revenue Trends">
            <BarChart width={300} height={200} data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </Card>
        </div>

        {/* Users Table */}
        <div className={styles.tableContainer}>
          <h2 className={styles.cardTitle}>Recent Users</h2>
          <Table data={users} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
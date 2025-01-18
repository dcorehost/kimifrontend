// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./AddMoneyTable.module.css";

// const AddMoneyTable = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalData, setModalData] = useState(null);

//   const handleNextPage = () => {
//     navigate("/next-page");
//   };

//   const handleAddMoney = () => {
//     alert("Add Money Here button clicked");
//   };

//   const handleExportExcel = () => {
//     alert("Export to Excel clicked");
//   };

//   const handleRowClick = (rowData) => {
//     setModalData(rowData);
//     setIsModalOpen(true); // Open the modal when a row is clicked
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false); // Close the modal
//   };

//   const handleConfirm = () => {
//     alert("Confirmed");
//     setIsModalOpen(false); // Close the modal after confirming
//   };

//   const data = [
//     {
//       applyId: "APP001",
//       chargeMoney: "$100",
//       transactionId: "TXN001",
//       state: "Pending",
//       image: "image1.png",
//       payway: "Credit Card",
//       createTime: "2025-01-01",
//     },
//     {
//       applyId: "APP002",
//       chargeMoney: "$200",
//       transactionId: "TXN002",
//       state: "Approved",
//       image: "image2.png",
//       payway: "PayPal",
//       createTime: "2025-01-02",
//     },
//     {
//       applyId: "APP003",
//       chargeMoney: "$150",
//       transactionId: "TXN003",
//       state: "Reject",
//       image: "image3.png",
//       payway: "Bank Transfer",
//       createTime: "2025-01-03",
//     },
//   ];

//   return (
//     <div className={styles.container}>
//       <button className={styles.button} onClick={handleAddMoney}>
//         Add Money Here
//       </button>

//       <a
//         href="#"
//         className={`${styles.button} ${styles.exportButton}`}
//         onClick={handleExportExcel}
//       >
//         Export Excel
//       </a>

//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Apply ID</th>
//               <th>Charge Money</th>
//               <th>Transaction ID</th>
//               <th>State</th>
//               <th>Image</th>
//               <th>Payway</th>
//               <th>Create Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, index) => (
//               <tr key={index} onClick={() => handleRowClick(row)}>
//                 <td>{row.applyId}</td>
//                 <td>{row.chargeMoney}</td>
//                 <td>{row.transactionId}</td>
//                 <td>{row.state}</td>
//                 <td>
//                   <img src={row.image} alt="image" className={styles.image} />
//                 </td>
//                 <td>{row.payway}</td>
//                 <td>{row.createTime}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal Popup */}
//       {isModalOpen && modalData && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modalContent}>
//             <h2>Confirm Details</h2>
//             <div className={styles.modalBody}>
//               <p><strong>Payway:</strong> {modalData.payway}</p>
//               <p><strong>Charge Money:</strong> {modalData.chargeMoney}</p>
//               <p><strong>Transaction ID:</strong> {modalData.transactionId}</p>
//               <div className={styles.imageWrapper}>
//                 <img src={modalData.image} alt="image" className={styles.modalImage} />
//               </div>
//             </div>
//             <div className={styles.modalActions}>
//               <button className={styles.modalButton} onClick={handleCloseModal}>
//                 Cancel
//               </button>
//               <button className={styles.modalButton} onClick={handleConfirm}>
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddMoneyTable;

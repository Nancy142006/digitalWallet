// import React from "react";
// import axios from "axios";

// const DownloadPDF=()=>{
//     const handleDownload= async ()=>{
//         try{
//             const response = await axios.get("http://localhost:5000/pdf/generate",{
//                 responseType:"blob",
//             });
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement("a");
//             link.href = url;
//             link.setAttribute("download", "report.pdf");
//             document.body.appendChild(link);
//             link.click();
//         } catch(error){
//             console.error("Error downloading PDF",error);
//         }
//     };

//      const handleViewPDF = () => {
//        window.open("http://localhost:5000/pdf/generate", "_blank");
//      };

// return (
//     <div>
//     <button
//       onClick={handleDownload}
//       className="bg-blue-500 text-white p-2 rounded"
//     >
//       Download PDF
//     </button>

//     <button onClick={handleViewPDF} className="bg-blue-500 text-white p-2 rounded">
//       View User Report
//     </button>
//     </div>
//   );
// };

// export default DownloadPDF;

import React, { useState } from "react";
import axios from "axios";

const DownloadPDF = () => {
  const [transactionId, setTransactionId] = useState("");

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/receipt/${transactionId}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt_${transactionId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading receipt:", error);
    }
  };

  const handleViewPDF = () => {
    window.open(`http://localhost:5000/api/receipt/${transactionId}`, "_blank");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Transaction ID"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Download Receipt
      </button>
      <button
        onClick={handleViewPDF}
        className="bg-blue-500 text-white p-2 rounded"
      >
        View Receipt
      </button>
    </div>
  );
};

export default DownloadPDF;

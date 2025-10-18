import React, { useEffect, useState } from "react";
import { API } from "../../api/api";

export const Touch = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("admintoken");
  // Fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/getintouch", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">User Messages</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-xl">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Phone</th>
              <th className="py-3 px-4 border-b">Company</th>
              <th className="py-3 px-4 border-b">Message</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((entry, index) => (
                <tr key={entry._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{index + 1}</td>
                  <td className="py-3 px-4 border-b">{entry.name}</td>
                  <td className="py-3 px-4 border-b">{entry.email}</td>
                  <td className="py-3 px-4 border-b">{entry.phonenumber}</td>
                  <td className="py-3 px-4 border-b">{entry.companyname}</td>
                  <td className="py-3 px-4 border-b">{entry.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

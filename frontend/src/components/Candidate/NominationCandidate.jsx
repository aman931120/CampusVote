import React, { useEffect, useState } from "react";
import axios from "axios";

const NominationCandidate = () => {
  const [nominees, setNominees] = useState([]);

  useEffect(() => {
    const fetchNominees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/nominee/all");
        setNominees(res.data);
      } catch (err) {
        console.error("Failed to fetch nominees", err);
      }
    };

    fetchNominees();
  }, []);

  const BASE_URL = "http://localhost:5000";

  const downloadFile = (filePath, fileName) => {
    const link = document.createElement("a");
    link.href = `${BASE_URL}/download?file=${encodeURIComponent(filePath)}`;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this nominee?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/nomination/delete/${id}`, // <-- fixed
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        // Optional: reload or filter out deleted nominee from UI
        setNominees(nominees.filter((n) => n._id !== id));
      } else {
        alert(data.message || "Failed to delete nominee");
      }
    } catch (error) {
      console.error("Error deleting nominee:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-700 text-white flex flex-col items-center py-10 pt-20">
      <div className="bg-gray-300 text-black rounded-2xl p-6 w-[90%] max-w-[1200px]">
        <h2 className="text-2xl font-bold text-center mb-6">NOMINATION LIST</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nominees.map((nominee) => (
            <div
              key={nominee._id}
              className="bg-white text-black p-4 rounded-xl shadow-md flex flex-col"
            >
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center mb-4 rounded overflow-hidden">
                <img
                  src={`${BASE_URL}${nominee.image}`}
                  alt="Candidate"
                  className="object-cover h-full w-full rounded"
                />
              </div>
              <p>
                <strong>Name:</strong> {nominee.name}
              </p>
              <p>
                <strong>Roll Number:</strong> {nominee.rollNumber}
              </p>
              <p>
                <strong>Passing Year:</strong> {nominee.passoutYear}
              </p>
              <p>
                <strong>Position:</strong> {nominee.position}
              </p>
              <p>
                <strong>Manifesto:</strong>{" "}
                <button
                  onClick={() =>
                    downloadFile(nominee.manifesto, "Manifesto.pdf")
                  }
                  className="text-blue-600 underline"
                >
                  Download Manifesto
                </button>
              </p>
              <p>
                <strong>Image:</strong>{" "}
                <button
                  onClick={() =>
                    downloadFile(nominee.image, "CandidateImage.jpg")
                  }
                  className="text-blue-600 underline"
                >
                  Download Image
                </button>
              </p>
              <button
                onClick={() => handleDelete(nominee._id)}
                className="bg-red-500 text-white px-3 mb-1 mt-1 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NominationCandidate;

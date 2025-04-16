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

  return (
    <div className="min-h-screen bg-gray-700 text-white flex flex-col items-center py-10 pt-20">
      <div className="bg-gray-300 text-black rounded-2xl p-6 w-[90%] max-w-[1200px]">
        <h2 className="text-2xl font-bold text-center mb-6">NOMINATION LIST</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nominees.map((nominee) => (
            <div
              key={nominee._id}
              className="bg-white text-black p-4 rounded-xl shadow-md flex flex-col items-center"
            >
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center mb-4 rounded">
                <img
                  src={nominee.image}
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
                <a
                  href={nominee.manifesto}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Download
                </a>
              </p>
              <p>
                <strong>Image:</strong>{" "}
                <a
                  href={nominee.image}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Download
                </a>
              </p>
              <button
                onClick={() => alert(`Deleted ${nominee.name}`)}
                className="bg-red-600 text-white px-4 py-1 mt-4 rounded hover:bg-red-700"
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

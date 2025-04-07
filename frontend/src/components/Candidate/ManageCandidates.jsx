import { useEffect, useState } from "react";
import axios from "axios";

const ManageCandidates = () => {
  const [candidatesByPosition, setCandidatesByPosition] = useState({});

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/candidates/grouped"
      );
      setCandidatesByPosition(res.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const deleteCandidate = async (candidateId) => {
    try {
      await axios.delete(`http://localhost:5000/api/candidates/${candidateId}`);
      fetchCandidates(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="p-10 bg-gray-500 mt-7">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Candidates</h2>
      {Object.keys(candidatesByPosition).map((position) => (
        <div key={position} className="mb-6 bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-4">{position}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {candidatesByPosition[position].map((candidate) => (
              <div
                key={candidate._id}
                className="bg-white p-4 border-2 rounded-lg shadow text-center"
              >
                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className="w-full h-40 object-cover rounded"
                />
                <p className="mt-2 text-lg font-semibold">{candidate.name}</p>
                <button
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => deleteCandidate(candidate._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageCandidates;

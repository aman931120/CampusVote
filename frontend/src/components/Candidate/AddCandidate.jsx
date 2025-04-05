import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";

const AddCandidate = () => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [currentPosition, setCurrentPosition] = useState("");
  const [candidates, setCandidates] = useState({});

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/", { replace: true });
  };

  const goToResults = () => {
    navigate("/admin/Result");
  };

  const addPosition = () => {
    if (currentPosition.trim() && !positions.includes(currentPosition)) {
      setPositions([...positions, currentPosition]);
      setCandidates({ ...candidates, [currentPosition]: [] });
      setCurrentPosition("");
    }
  };

  const removePosition = (position) => {
    setPositions(positions.filter((pos) => pos !== position));
    const updatedCandidates = { ...candidates };
    delete updatedCandidates[position];
    setCandidates(updatedCandidates);
  };

  const addCandidate = (position) => {
    setCandidates({
      ...candidates,
      [position]: [...candidates[position], { name: "", image: null }],
    });
  };

  const removeCandidate = (position, index) => {
    const updatedCandidates = candidates[position].filter(
      (_, i) => i !== index
    );
    setCandidates({ ...candidates, [position]: updatedCandidates });
  };

  const updateCandidate = (position, index, field, value) => {
    const updatedCandidates = candidates[position].map((c, i) =>
      i === index ? { ...c, [field]: value } : c
    );
    setCandidates({ ...candidates, [position]: updatedCandidates });
  };

  const handleImageUpload = (position, index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCandidate(position, index, "image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Send all candidates in one go
  const handleSaveCandidates = async () => {
    try {
      for (const position of positions) {
        const candidateList = candidates[position];

        for (const candidate of candidateList) {
          if (!candidate.name || !candidate.image) {
            alert(`Candidate missing name/image in position: ${position}`);
            return;
          }
        }
      }

      await axios.post("http://localhost:5000/api/candidates/add", {
        candidates,
      });

      alert("All candidates submitted successfully!");
      setPositions([]);
      setCandidates({});
    } catch (error) {
      console.error(error);
      alert("Error submitting candidates. Check console for details.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 p-6 relative">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={goToResults}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View Results
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Candidates
        </h2>

        {/* Position Input */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter position name"
            value={currentPosition}
            onChange={(e) => setCurrentPosition(e.target.value)}
          />
          <button
            onClick={addPosition}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <FaPlus /> Add Position
          </button>
        </div>

        {/* Positions and Candidate Inputs */}
        {positions.map((position, posIndex) => (
          <div
            key={posIndex}
            className="mb-6 p-4 border rounded-lg bg-gray-100"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-gray-700">{position}</h3>
              <button
                onClick={() => removePosition(position)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
            {candidates[position].map((candidate, index) => (
              <div
                key={index}
                className="mb-4 p-3 border rounded-lg bg-white shadow-md"
              >
                <input
                  type="text"
                  placeholder="Candidate Name"
                  className="w-full px-3 py-2 border rounded-lg mb-2"
                  value={candidate.name}
                  onChange={(e) =>
                    updateCandidate(position, index, "name", e.target.value)
                  }
                />
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border rounded-lg"
                  onChange={(e) => handleImageUpload(position, index, e)}
                />
                {candidate.image && (
                  <img
                    src={candidate.image}
                    alt="Candidate"
                    className="mt-2 w-full h-auto object-contain rounded-lg border shadow-md"
                  />
                )}
                <button
                  onClick={() => removeCandidate(position, index)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full"
                >
                  Remove Candidate
                </button>
              </div>
            ))}
            <button
              onClick={() => addCandidate(position)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full mt-3 flex items-center justify-center gap-2"
            >
              <FaPlus /> Add Candidate
            </button>
          </div>
        ))}

        {/* ✅ Save All Candidates Button */}
        {positions.length > 0 && (
          <button
            onClick={handleSaveCandidates}
            className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 w-full"
          >
            Save All Candidates
          </button>
        )}
      </div>
    </div>
  );
};

export default AddCandidate;

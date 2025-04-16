import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";

const AddCandidate = () => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [currentPosition, setCurrentPosition] = useState("");
  const [candidates, setCandidates] = useState({});
  const [electionOn, setElectionOn] = useState(
    localStorage.getItem("electionStatus") === "on"
  );
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const toggleElection = () => {
    const newStatus = !electionOn;
    setElectionOn(newStatus);
    localStorage.setItem("electionStatus", newStatus ? "on" : "off");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/", { replace: true });
  };

  const goToResults = () => {
    navigate("/admin/Result");
  };

  const goToManageCandidates = () => {
    navigate("/admin/manageCandidates");
  };

  const goToNominationCandidates = () => {
    navigate("/admin/nominationCandidate");
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
    const updated = candidates[position].filter((_, i) => i !== index);
    setCandidates({ ...candidates, [position]: updated });
  };

  const updateCandidate = (position, index, field, value) => {
    const updated = candidates[position].map((c, i) =>
      i === index ? { ...c, [field]: value } : c
    );
    setCandidates({ ...candidates, [position]: updated });
  };

  const handleImageUpload = (position, index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCandidate(position, index, "image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
      alert("Error submitting candidates.");
    }
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleUploadPDF = async () => {
    if (!pdfFile) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/uploadPDF",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("PDF uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload PDF.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 p-6">
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <button
          onClick={goToResults}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          View Results
        </button>
        <button
          onClick={goToManageCandidates}
          className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          Manage Candidates
        </button>
        <button
          onClick={goToNominationCandidates}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          See Nominee
        </button>
        <button
          onClick={toggleElection}
          className={`px-6 py-3 ${
            electionOn ? "bg-green-600" : "bg-gray-600"
          } text-white rounded-lg hover:opacity-90`}
        >
          {electionOn ? "Election: ON" : "Election: OFF"}
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Candidates
        </h2>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
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

        {positions.length > 0 && (
          <button
            onClick={handleSaveCandidates}
            className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 w-full"
          >
            Save All Candidates
          </button>
        )}

        {/* PDF Upload Section */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-semibold mb-3">
            Upload Instructions PDF
          </h3>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mb-3 w-full border px-3 py-2 rounded-lg"
          />
          <button
            onClick={handleUploadPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Upload PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCandidate;

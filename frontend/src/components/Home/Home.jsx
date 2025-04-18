import { Link } from "react-router-dom";
import {
  FaUser,
  FaUserFriends,
  FaFileAlt,
  FaClipboardList,
} from "react-icons/fa";
import { useEffect, useState } from "react";

const Home = () => {
  const [electionOn, setElectionOn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("electionStatus");
    setElectionOn(status === "on");
  }, []);

  return (
    <div className="h-screen w-full bg-gray-600 flex flex-col">
      {/* Header */}
      <div className="w-full bg-white py-2 shadow-sm flex items-center justify-between px-4 border-b">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/8/80/IIIT_Manipur_logo.png"
          alt="IIIT Logo"
          className="h-10"
        />
        <h1 className="text-sm font-semibold text-center flex-grow -ml-10">
          Indian Institute of Information Technology, Manipur
        </h1>
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-gray-200 p-10 rounded-2xl shadow-xl text-center w-full max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900">
            CampusVote
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
            {/* Admin */}
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center w-32">
              <FaUser size={60} className="text-gray-800 mb-2" />
              <Link to="/admin">
                <button className="bg-green-500 text-white font-bold text-sm px-4 py-1 rounded-md hover:bg-green-600">
                  Admin
                </button>
              </Link>
            </div>

            {/* Student */}
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center w-32">
              <FaUserFriends size={60} className="text-gray-800 mb-2" />
              {electionOn ? (
                <Link to="/student">
                  <button className="bg-blue-600 text-white font-bold text-sm px-4 py-1 rounded-md hover:bg-blue-700">
                    Student
                  </button>
                </Link>
              ) : (
                <button
                  className="bg-gray-400 text-white font-bold text-sm px-4 py-1 rounded-md cursor-not-allowed"
                  disabled
                >
                  VotingOff
                </button>
              )}
            </div>

            {/* Nomination (Always Enabled) */}
            <div className="bg-white p-4 mr-5 rounded-xl shadow-md flex flex-col items-center w-32">
              <FaClipboardList size={60} className="text-gray-800 mb-2" />
              <Link to="/NomineeLogin">
                <button className="bg-lime-300 text-black font-bold text-sm px-4 py-1 rounded-md hover:bg-lime-400">
                  Nomination
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

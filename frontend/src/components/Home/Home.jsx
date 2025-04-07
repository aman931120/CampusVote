import { Link } from "react-router-dom";
import { FaUser, FaUserFriends } from "react-icons/fa";

const Home = () => {
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
        <div className="bg-gray-200 p-10 rounded-2xl shadow-xl text-center w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900">
            College Voting System
          </h1>

          <div className="flex gap-6 justify-center">
            {/* Admin */}
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center w-32">
              <FaUser size={70} className="text-gray-800 mb-2" />
              <Link to="/admin">
                <button className="bg-green-500 text-white font-bold text-sm px-4 py-1 rounded-md hover:bg-green-600">
                  Admin
                </button>
              </Link>
            </div>

            {/* Student */}
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center w-32">
              <FaUserFriends size={70} className="text-gray-800 mb-2" />
              <Link to="/student">
                <button className="bg-blue-600 text-white font-bold text-sm px-4 py-1 rounded-md hover:bg-blue-700">
                  Student
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

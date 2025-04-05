import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-500">

      <h1 className="text-4xl font-bold mb-8">College Voting System</h1>
      <div className="flex gap-6">
        <Link to="/admin">
          <button className="px-6 py-3 text-lg bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 border-2 ">
            Admin
          </button>
        </Link>
        <Link to="/student">
          <button className="px-6 py-3 text-lg bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 border-2">
            Student
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;


const ResultPage = () => {
  const electionResults = {
    "Vice President": [
      {
        name: "Alice Johnson",
        image: "https://via.placeholder.com/150",
        votes: 45,
      },
      {
        name: "Bob Smith",
        image: "https://via.placeholder.com/150",
        votes: 30,
      },
      {
        name: "Charlie Brown",
        image: "https://via.placeholder.com/150",
        votes: 50,
      },
      {
        name: "David Wilson",
        image: "https://via.placeholder.com/150",
        votes: 40,
      },
    ],
    "Prime Minister": [
      {
        name: "Emily Davis",
        image: "https://via.placeholder.com/150",
        votes: 60,
      },
      {
        name: "Frank Thomas",
        image: "https://via.placeholder.com/150",
        votes: 35,
      },
      {
        name: "Grace Lee",
        image: "https://via.placeholder.com/150",
        votes: 55,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-8">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-5xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Election Results
        </h2>
        {Object.entries(electionResults).map(([position, candidates]) => (
          <div
            key={position}
            className="mb-8 p-6 border rounded-xl bg-gray-200 shadow-md"
          >
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              {position}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {candidates.map((candidate, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-xl bg-white shadow-lg text-center transition-transform transform hover:scale-105"
                >
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className="w-full h-40 object-cover rounded-lg border shadow-md"
                  />
                  <h4 className="mt-4 text-xl font-semibold text-gray-900">
                    {candidate.name}
                  </h4>
                  <p className="mt-2 text-lg font-medium text-gray-700">
                    Votes: {candidate.votes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;

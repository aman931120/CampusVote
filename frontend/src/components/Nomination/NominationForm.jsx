import React from "react";

const NominationForm = () => {
  return (
    <div className="min-h-screen bg-gray-700 pt-20 px-4 flex items-center justify-center">
      <div className="bg-gray-200 rounded-lg p-8 shadow-md w-full max-w-5xl flex flex-col md:flex-row justify-between gap-8">
        {/* Left: Form Section */}
        <div className="flex-1">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Nominate Yourself</h2>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Name :</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Position :</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Passout Year :</label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email :</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Upload Manifesto :
              </label>
              <input
                type="file"
                className="w-full px-4 py-2 rounded-md border file:bg-gray-300 file:border-0 file:px-4 file:py-2 file:rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Upload Image :</label>
              <input
                type="file"
                className="w-full px-4 py-2 rounded-md border file:bg-gray-300 file:border-0 file:px-4 file:py-2 file:rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-gray-300 text-black px-6 py-2 rounded-md mt-4 border hover:bg-gray-400 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right: Note Section */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 max-w-sm self-center shadow-1xl">
          <h3 className="text-lg font-bold mb-2 text-center">Note</h3>
          <p className="text-sm text-gray-700">
            Please ensure that both your image and manifesto file are each under
            1MB in size.
            <br />
            <br />
            This is important to maintain consistency and ease of access during
            the review process. Submissions exceeding the size limit may not be
            accepted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NominationForm;

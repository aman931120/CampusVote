import React from "react";

const InstructionPage = () => {
  return (
    <div className="min-h-screen bg-[#595F6E] flex items-center justify-center p-4">
      <div className="bg-[#D9D9D9] rounded-lg shadow-lg p-8 max-w-3xl w-full">
        <h2 className="text-xl font-bold text-center mb-6">INSTRUCTION</h2>
        <p className="mb-3">Dear Candidate,</p>
        <p className="mb-3">
          We hope you're doing well and are all set for the upcoming college
          elections. Please download and carefully read the attached
          instructions, which include important details about the election
          process, campaign guidelines, and key dates.
        </p>
        <p className="mb-3">
          If you have any questions, feel free to reach out to the election
          committee. Wishing you all the best for your campaign!
        </p>
        <p className="mb-3">
          Warm regards,
          <br />
          [admin@iiitmanipur.ac.in]
        </p>
        <div className="flex justify-end">
          <a
            href="/instructions.pdf" // Replace with actual file path
            download
            className="bg-white text-black px-4 py-1 border-2 border-black rounded-md hover:bg-gray-200"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default InstructionPage;

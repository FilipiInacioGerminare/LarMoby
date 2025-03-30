import React from "react";

function Perfil() {
  return (
    <div className="min-h-[85vh] bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6">Account info</h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">Username</span>
            <div className="flex items-center space-x-3">
              <span className="text-gray-800 text-lg">inacio@gmail.com</span>
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">Password</span>
            <div className="flex items-center space-x-3">
              <span className="text-gray-800 text-lg">•••••••••••••</span>
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
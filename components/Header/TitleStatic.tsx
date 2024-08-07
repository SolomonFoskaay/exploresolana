// /components/Header/TitleStatic.tsx
import React from "react";

const TitleStatic = () => {
  return (
    <div className="container mx-auto py-8"> {/* Added mx-auto to center the container */}
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
          Explore <span className="text-purple-400">Web3 Blockchain Ecosystems</span>
        </h1>
        <h2 className="text-xl font-semibold text-white md:text-2xl">
          & Discover Opportunities!
        </h2>
        <p className="mt-2 px-4 text-sm text-purple-300 md:text-base">
          Easily Explore Web3 ecosystems like Solana Blockchain dApps/tools/resources/blinks updates, insights and opportunities (jobs, grants, bounty etc.):
        </p>
      </div>
    </div>
  );
};

export default TitleStatic;

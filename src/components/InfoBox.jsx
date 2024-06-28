import React from "react";

const InfoBox = ({ title, address, score }) => {
  const isAddressSet = address !== "0x0000000000000000000000000000000000000000";
  const shortenedAddress = isAddressSet
    ? `${address?.slice(0, 4)}...${address?.slice(-5, -1)}`
    : "Not set";

  return (
    <div className=" bg-gray-700 text-white p-1 rounded-lg shadow-lg border border-amber-200 w-38 text-sm">
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="truncate">Address: {shortenedAddress}</p>
      <p>Score: {score}</p>
    </div>
  );
};

export default InfoBox;

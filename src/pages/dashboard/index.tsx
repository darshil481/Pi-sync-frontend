import React, { useState } from "react";
import DeviceList from "../deviceList";
import ErrorList from "../errorList";

const DashBoard: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<"error" | "device">("device");

  const changeScreen = (screen: "error" | "device") => {
    setCurrentScreen(screen);
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <p
          onClick={() => changeScreen("device")}
          className={`cursor-pointer font-semibold ${
            currentScreen === "device" ? "text-blue-600 underline" : "text-gray-600"
          }`}
        >
          Device Management
        </p>
        <p
          onClick={() => changeScreen("error")}
          className={`cursor-pointer font-semibold ${
            currentScreen === "error" ? "text-blue-600 underline" : "text-gray-600"
          }`}
        >
          Recent Error
        </p>
      </div>

      <div>
        {currentScreen === "device" && <DeviceList />}
        {currentScreen === "error" && <ErrorList/>}
      </div>
    </div>
  );
};

export default DashBoard;

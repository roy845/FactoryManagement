import React from "react";
import { Audio } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Audio
        height={80}
        width={80}
        radius={9}
        color="blue"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Spinner;

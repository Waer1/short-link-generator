import React from "react";
import { Box } from "@mui/system";

const FullPageBackground = ({ svgLocation, children }) => {
  const containerStyle = {
    opacity: 0.6,
    filter: "blur(4px)",
  };

  const svgStyle = {
    width: "70%",
    margin: "0 auto",
  };

  const contentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
    zIndex: 1,
    width: "100%",
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(260deg, rgba(28,87,153,1) 0%, rgba(211,211,255,1) 34%, rgba(212,201,243,1) 57%, rgba(223,102,135,1) 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...containerStyle,
        }}
      >
        <img src={svgLocation} alt='Background' style={svgStyle} />
      </Box>
      <Box sx={contentStyle}>{children}</Box>
    </Box>
  );
};

export default FullPageBackground;

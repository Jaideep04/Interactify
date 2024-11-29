

export const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <p style={textStyle}>© 2024 Your Website Name. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: "#6a0dad", // Purple color
  padding: "20px",
  textAlign: "center",
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const textStyle = {
  color: "#ffffff",
  fontSize: "16px",
};



import React from "react";
import '../../css/header.css';

export default function footer() {
  return (
    <footer className="footer" style={{ backgroundColor: "#e6e6e6" }} >
      <hr style={{ backgroundColor: "white" }} />
      &copy; Copyright  {new Date().getFullYear()} All rights reserved
    </footer>
  );
}

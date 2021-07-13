import React from "react";
import "./styles.css";
import Home from "pages/Home";
import Header from "components/Header";

export default function App() {
  return (
    <div>
      {/* Header Component */}
      <Header />
      {/* Home Component */}
      <Home />
    </div>
  );
}

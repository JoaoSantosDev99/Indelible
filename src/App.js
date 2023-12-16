import React from "react";
import Header from "./components/Header";
import Main from "./Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Main />
    </>
  );
}

export default App;

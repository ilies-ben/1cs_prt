import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./AuthProvider";
import Modal from 'react-modal';

Modal.setAppElement('#root');
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
 
      <BrowserRouter>
      <Layout>
         <AuthProvider>
         <App />
         </AuthProvider>
      </Layout>
    </BrowserRouter>
  
);

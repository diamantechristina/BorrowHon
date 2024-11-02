import React, {useState} from "react";
import Login from "./pages/Login.jsx";
import Reader_Dashboard from "./pages/Reader/Dashboard.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Register from "./pages/Register.jsx";
import ContinueRegister from "./pages/ContinueRegister.jsx";
import ContinueForgotPassword from "./pages/ContinueForgotPassword.jsx";
import { Route, Routes } from "react-router-dom";
import LibrarianListOfBooks from "./pages/Librarian/ListOfBooks.jsx";
import SnackBar from "./components/SnackBar.jsx";
import { set } from "mongoose";
import AccountSettings from "./pages/AccountSettings.jsx";
import ViewBook from "./pages/Reader/ViewBook.jsx";
import History from "./pages/Reader/History.jsx";

function App() {
  const [open, setOpen] = useState(false);
  const updateOpen = (isOpen)=>{
      setOpen(isOpen)
  }
  const [successfulLogin,setSuccessfulLogin] = useState(false)
  const updateLogin = (isSuccessful) =>{
    setSuccessfulLogin(isSuccessful)
  }
  return (
    <Routes>
      <Route path="/borrow-history" element = {<History/>}/>
      <Route path="/view-book" element = {<ViewBook/>}/>
      <Route path="/settings" element = {<AccountSettings/>}/>
      <Route path="/reader-dashboard" element={<Reader_Dashboard open = {open} updateOpen = {updateOpen} successfulLogin = {successfulLogin}/>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/continue-forgot-password"
        element={<ContinueForgotPassword />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/continue-register" element={<ContinueRegister />} />
      <Route path="/" element={<Login open = {open} updateOpen = {updateOpen} successfulLogin = {successfulLogin} updateLogin = {updateLogin}/>} />
      <Route path="/login" element={<Login open = {open} updateOpen = {updateOpen} successfulLogin = {successfulLogin} updateLogin = {updateLogin}/>} />
      <Route path="/list-of-books" element={<LibrarianListOfBooks />} />
    </Routes>
  );
}

export default App;

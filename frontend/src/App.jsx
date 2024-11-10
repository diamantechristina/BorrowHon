import React, {useState} from "react";
import Login from "./pages/Login.jsx";
import Reader_Dashboard from "./pages/Reader/Dashboard.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Register from "./pages/Register.jsx";
import ContinueRegister from "./pages/ContinueRegister.jsx";
import ContinueForgotPassword from "./pages/ContinueForgotPassword.jsx";
import { Route, Routes } from "react-router-dom";
import LibrarianListOfBooks from "./pages/Librarian/ListOfBooks.jsx";
import PendingBooks from "./pages/Librarian/PendingBooks.jsx";
import AccountSettings from "./pages/AccountSettings.jsx";
import ViewBook from "./pages/Reader/ViewBook.jsx";
import History from "./pages/Reader/History.jsx";
import Librarian_Dashboard from "./pages/Librarian/Dashboard.jsx";
import LibrarianListOfReaders from "./pages/Librarian/ListOfReaders.jsx";

function App() {

  return (
    <Routes>
      <Route path="/list-of-readers" element = {<LibrarianListOfReaders/>}/>
      <Route path="/librarian-dashboard" element = {<Librarian_Dashboard/>}/>
      <Route path="/borrow-history" element = {<History/>}/>
      <Route path="/view-book" element = {<ViewBook/>}/>
      <Route path="/settings" element = {<AccountSettings/>}/>
      <Route path="/reader-dashboard" element={<Reader_Dashboard />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/continue-forgot-password"
        element={<ContinueForgotPassword />}
      />
      <Route path="/pending-books" element={<PendingBooks />} />
      <Route path="/register" element={<Register />} />
      <Route path="/continue-register" element={<ContinueRegister />} />
      <Route path="/" element={<Login/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/list-of-books" element={<LibrarianListOfBooks />} />
    </Routes>
  );
}

export default App;

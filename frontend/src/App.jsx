import React, {useEffect, useState, useMemo} from "react";
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
import {useStore} from "./library/store";
import { useHistory } from "./library/history.js";
import { useNotification } from "./library/notification.js";
import { useAccount } from "./library/account.js";
import { useBook } from "./library/book.js";
import ReaderSettings from "./pages/Librarian/ReaderSettings.jsx";
import ReaderHistory from "./pages/Librarian/ReaderHistory.jsx";
function App() {
  const {  isAdmin } = useStore();
  const {createNotification, fetchNotifications, notification} = useNotification();
  const {fetchHistory, history} = useHistory();
  const {fetchAccount, account} = useAccount();
  const {fetchBook, books} = useBook();
  useEffect(() => {
    fetchHistory();
  },[fetchHistory])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  useEffect(() => {
    fetchAccount();
  },[fetchAccount])

  useEffect(() => {
    fetchBook();
  },[fetchBook])
  
  useEffect(() => {
    if(history){
      const overdueHistory = history.filter((history)=> history.returndate < new Date())
      overdueHistory.map((history)=>{
        const borrowedBook = books.find((book) => book._id === history.book_id)
        const borrower = account.find((acc) => acc.acc_id === history.acc_id)
        const borrowerNotification = {
          acc_id: history.acc_id,
          title: "Overdue Book",
          message: `Your borrowed book ${borrowedBook.title.toUpperCase()} was overdued at ${new Date(history.returndate).toLocaleString("default", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}! Please return it as soon as possible.`,
          date: new Date(),
        }
        const adminNotification = {
          acc_id: 8,
          title: "Overdue Book",
          message: `Borrowed book ${borrowedBook.title.toUpperCase()} by ${borrower.firstname} ${borrower.lastname} was overdued at ${new Date(history.returndate).toLocaleString("default", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}!`,
          date: new Date(),
        }
        if(!notification.find((notification) => notification.message === borrowerNotification.message) && !notification.find((notification) => notification.message === adminNotification.message)){
          handleCreateNotification(borrowerNotification)
          handleCreateNotification(adminNotification)
        }
      })
    }
  },[])
  const handleCreateNotification = async(notification) =>{
    const {success, message} = await createNotification(notification)
    console.log(success, message)
  }
  const dashboardRoute = useMemo(() => {
    if (isAdmin) {
      return <Route path="/dashboard" element={<Librarian_Dashboard />} />;
    } else {
      return <Route path="/dashboard" element={<Reader_Dashboard />} />;
    }
  }, [isAdmin]);

  const historyRoute = useMemo(() => {
    if (isAdmin) {
      return <Route path="/borrow-history" element={<ReaderHistory />} />;
    } else {
      return <Route path="/borrow-history" element={<History />} />;
    }
  }, [isAdmin]);
  return (
    <Routes>
      <Route path="/list-of-readers" element = {<LibrarianListOfReaders/>}/>
      <Route path="/view-book" element = {<ViewBook/>}/>
      <Route path="/settings" element = {<AccountSettings/>}/>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/resetpassword"
        element={<ContinueForgotPassword />}
      />
      <Route path="/pending-books" element={<PendingBooks />} />
      <Route path="/register" element={<Register />} />
      <Route path="/continue-register" element={<ContinueRegister />} />
      <Route path="/" element={<Login/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/list-of-books" element={<LibrarianListOfBooks />} />
      <Route path="/reader" element={<ReaderSettings/>} />
      {dashboardRoute}
      {historyRoute}
    </Routes>
  );
}

export default App;

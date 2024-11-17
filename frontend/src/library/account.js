import { create } from "zustand";

export const useAccount = create((set) => ({
  accounts: [],
  setAccounts: (accounts) => set({ accounts }),

  createAccount: async (newAccount) => {
    if (
      !newAccount.firstName.trim() ||
      !newAccount.lastName.trim() ||
      !newAccount.address.trim() ||
      !newAccount.phoneNumber.trim() ||
      !newAccount.username.trim() ||
      !newAccount.email.trim() ||
      !newAccount.password.trim()
    ) {
      return { success: false, message: "Please fill in all fields!" };
    }
    const checkerRes = await fetch("/api/accounts");
    const checkerData = await checkerRes.json();

    const existingAccount = checkerData.data.find((account) => {
      return (
        account.username === newAccount.username && 
        account.email === newAccount.email
      );
    });

    if (existingAccount) {
      return {
        success: false,
        message: "Username and email already taken!",
      };
    }

    const checkUsername = checkerData.data.find((account) => {
      return (
        account.username === newAccount.username
      );
    });

    if (checkUsername) {
      return {
        success: false,
        message: "Username already taken!",
      };
    }

    const checkEmail = checkerData.data.find((account) => {
      return (
        account.email === newAccount.email
      );
    });

    if (checkEmail) {
      return {
        success: false,
        message: "Email already taken!",
      };
    }

    const res = await fetch("/api/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
    });
    const data = await res.json();
    set((state) => ({
      accounts: [...state.accounts, data.data],
    }));
    return { success: true, message: "Registration Successful!" };
  },
  updateAccount: async (id, updatedAccount, usernameEdited) => {
    const checkerRes = await fetch("/api/accounts");
    const checkerData = await checkerRes.json();

    const existingAccount = checkerData.data.find((account) => {
      return (
        account.username === updatedAccount.username
      );
    });

    if (existingAccount && usernameEdited) {
      return {
        success: false,
        message: "Username already taken!",
      };
    }
    const res = await fetch(`/api/accounts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAccount),
    });
    const data = await res.json();
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account._id === id ? data.data : account
      ),
    }));
    return { success: true, message: "Account updated successfully!" };
  },
  fetchAccount: async () => {
    const res = await fetch("/api/accounts");
    const data = await res.json();
    set({
      account: data.data,
    });
  },
}));

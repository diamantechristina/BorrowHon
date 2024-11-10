import { create } from "zustand";

export const useAccount = create((set) => ({
  accounts: [],
  setAccounts: (accounts) => set({ accounts }),

  createAccount: async (newAccount) => {
    if (
      !newAccount.firstName ||
      !newAccount.lastName ||
      !newAccount.address ||
      !newAccount.phoneNumber ||
      !newAccount.username ||
      !newAccount.email ||
      !newAccount.password
    ) {
      return { success: false, message: "Please fill in all fields." };
    }
    const checkerRes = await fetch("/api/accounts");
    const checkerData = await checkerRes.json();

    const existingAccount = checkerData.data.find((account) => {
      return (
        account.email === newAccount.email ||
        account.username === newAccount.username ||
        account.phoneNumber === newAccount.phoneNumber
      );
    });

    if (existingAccount) {
      return {
        success: false,
        message: "Email or username or phone number already exists.",
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
    return { success: true, message: "Registration Successful." };
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

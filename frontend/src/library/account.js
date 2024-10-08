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

  fetchAccount: async () => {
    const res = await fetch("/api/accounts");
    const data = await res.json();
    set({
      account: data.data,
    });
  },
}));

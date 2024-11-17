import { create } from "zustand";

export const useSnackbar = create((set) => ({

    openSnackbar: false,
    snackbarSuccess: false,
    snackbarMessage: '',
    setSnackbarSuccess: (success) => set({ snackbarSuccess: success }),
    setSnackbarMessage: (message) => set({ snackbarMessage: message }),
    setOpenSnackbar: (bool) => set({ openSnackbar: bool }),
}));
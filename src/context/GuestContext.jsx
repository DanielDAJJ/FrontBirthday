import { createContext } from "react";

export const GuestContext = createContext({
    guest:{
        name: '',
        companion: '',
        isComing: null,
        message: ''
    },
    updateGuest: () => {},
    confirmAttendance: () => {},
    declineAttendance: () => {},
    submitMessage: () => {},
    resetGuest: () => {}
});


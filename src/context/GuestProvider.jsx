import { useState, useEffect, useCallback } from "react";
import { GuestContext } from "./GuestContext.jsx";
import { useNavigate } from "react-router-dom";

export function GuestProvider({ children }) {
    const [guest, setGuest] = useState(() =>{
        const savedData = localStorage.getItem('guest');
        return savedData ? JSON.parse(savedData): {
            name: '',
            companion: '',
            isComing: null,
            message: ''
        };
    });
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('guest', JSON.stringify(guest));
    }, [guest]);

    const updateGuest = useCallback((data)=>{
        setGuest(prev => ({
            ...prev,
            ...data
        }));
    },[]);

    const confirmAttendance = useCallback(()=>{
        setGuest(prev => ({
            ...prev,
            isComing: true
        }));
        navigate('/confirmed');
    },[navigate]);

    const declineAttendance = useCallback(()=>{
        setGuest(prev => ({
            ...prev,
            isComing: false
        }));
        navigate('/decline');
    }, [navigate]);

    const submitMessage = useCallback((message)=>{
        setGuest(prev =>({
            ...prev,
            message
        }));
        navigate('/thank-you');
    }, [navigate]);

    const resetGuest = useCallback(()=>{
        setGuest({
            name: '',
            companion: '',
            isComing: null,
            message: ''
        });
        localStorage.removeItem('guest');
        navigate('/');
    }, [navigate]);

    const contextValue = {
        guest,
        updateGuest,
        confirmAttendance,
        declineAttendance,
        submitMessage,
        resetGuest
    };

    return (
        <GuestContext.Provider value={contextValue}>
            {children}
        </GuestContext.Provider>
    )
}
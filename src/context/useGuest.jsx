import { useContext } from 'react';
import { GuestContext } from './GuestContext.jsx';

export function useGuest(){
    const context = useContext(GuestContext);
    if (!context) {
        throw new Error('useGuest must be used within a GuestProvider');
    }
    return context;
}
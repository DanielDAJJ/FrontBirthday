import React, { useEffect, useState } from "react";
import { useNickname } from "../hooks/useNickname.jsx";
import { useNavigate } from "react-router-dom";
import { useGuest } from "../context/useGuest.jsx";
import { motion as Motion } from "framer-motion";

const FormPage = () => {
    const nickName = useNickname(3000);
    const navigate = useNavigate();
    const {guest, updateGuest, resetGuest} = useGuest();

    const [formData, setFormData] = useState({
        name: guest.name || '',
        companion: guest.companion || ''
    });

    useEffect(()=>{
        if(guest.isComing !== null) resetGuest();
    }, [guest.isComing, resetGuest]);

    const handleChange = (e) => {
        const {name, value} =  e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateGuest(formData);
        navigate("/info");
    };

    return (
        <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <h1>¡{nickName} está de cumple y la fiesta es a lo grande!</h1>
            <form onSubmit={handleSubmit}>
                <label>Tu nombre</label>
                <input
                    name="name"
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label>Nombre acompañante</label>
                <input 
                    type="text"
                    name="companion"
                    placeholder="Nombre de tu acompañante"
                    value={formData.companion}
                    onChange={handleChange}
                />
                <Motion.button 
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    Continuar
                </Motion.button>
            </form>
        </Motion.div>
    )
}

export default FormPage;
import React, { useEffect, useState } from "react";
import { useNickname } from "../hooks/useNickname.jsx";
import { useNavigate } from "react-router-dom";
import { useGuest } from "../context/useGuest.jsx";
import { motion as Motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;
const FormPage = () => {
    const nickName = useNickname(3000);
    const navigate = useNavigate();
    const {guest, updateGuest, resetGuest} = useGuest();

    const [formData, setFormData] = useState({
        name: guest.name || '',
        companion: guest.companion || ''
    });

    const [error, setError] = useState('');

    useEffect(()=>{
        if(guest.isComing !== null) resetGuest();
    }, [guest.isComing, resetGuest]);

    const handleChange = (e) => {
        const {name, value} =  e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.name.trim()){
            setError('El nombre es obligatorio');
            return;
        }
        
        try {
            const res =  await fetch(API_URL);
            const data = await res.json();

            const nameExists = data.guests.some(
                (g) => g.name.toLowerCase() === formData.name.trim().toLowerCase()
            );

            if(nameExists){
                setError('El nombre ya existe');
                return;
            }
            updateGuest(formData);
            navigate('/info');
        } catch (error) {
            console.error('Error al validar el nombre', error);
            setError('Error de conexión con el servidor')
        }
    };

    return (
        <main>
            <div className="bola-disco">
                <img src="/assets/BolaDisco.gif" alt="Bola girando"/>
            </div>
            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                <h1>¡{nickName} está de cumple y la fiesta es a lo grande!</h1>
                <form onSubmit={handleSubmit}>
                    <label>Tu nombre<strong>*</strong></label>
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
                    {error && <p className="error">{error}</p>}
                    <Motion.button 
                        className="buttom-form"
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        Continuar
                    </Motion.button>
                </form>
            </Motion.div>
        </main>
    )
}

export default FormPage;
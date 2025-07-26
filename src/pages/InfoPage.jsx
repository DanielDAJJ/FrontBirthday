import React from "react";
import "./InfoPage.css"
import { useGuest } from "../context/useGuest.jsx";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
//import "./InfoPage.css";

const API_URL = import.meta.env.VITE_API_URL;
const InfoPage = () =>{
    const {guest, confirmAttendance, declineAttendance} = useGuest();
    const navigate = useNavigate();

    if (!guest.name) {
        navigate("/");
        return null;
    }
        const handleConfirm = async () =>{
            try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...guest, isComing: true })
        });
        confirmAttendance();
        } catch (err) {
        console.error("Error al confirmar asistencia", err);
        alert("Hubo un problema al confirmar tu asistencia. Intenta de nuevo.");
        }
    };

    const handleDecline = async () => {
        try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...guest, isComing: false })
        });
        declineAttendance();
        } catch (err) {
        console.error("Error al procesar declinación", err);
        alert("Hubo un problema. Intenta de nuevo.");
        }
    }
    return (
        <main>
            <Motion.div
            className="info-page"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}>
                <h2>
                    ¡Henry está de cumple <br />y la fiesta es a lo grande!
                </h2>
                <p className="guest-names">
                    <strong>{guest.name}</strong>
                    {guest.companion && (
                        <>
                            <strong>
                                {' y '}
                                {guest.companion}
                            </strong>
                        </>
                    )}
                </p>
                <div className="event-info">
                    <p>
                        Vamos a celebrar sus 75 con un almuerzo bien sabroso que se alarga hasta la rumba. ¡Puro estilo setentas!
                    </p>
                    <p>
                        <strong>Fecha</strong><br />
                        03 de agosto de 2025
                    </p>
                    <p>
                        <strong>Hora</strong><br />
                        1:00 p.m.
                    </p>
                    <p>
                        <strong>Lugar</strong><br />
                        Portal de Pontevedra I <br />
                        Calle 97 #70c-69, Bogotá
                    </p>
                    <p>
                        <strong>Código de vestuario</strong><br />
                        Look años 70's - <span>¡saca tu mejor outfit vintage!</span>
                    </p>
                    <p className="dedication-prompt">
                        <strong>¡Recuerda que es sorpresa!</strong>
                    </p>
                    <em><span>Esperamos tu respuesta en los próximos días</span></em>
                </div>
                <div className="buttons">
                    <Motion.button
                    className="btn-yes"
                    onClick={handleConfirm}
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}>
                        ¡Allá estaré con todo el flow!
                    </Motion.button>
                    <Motion.button
                    className="btn-no"
                    onClick={handleDecline}
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}>
                        No puedo acompañarlos
                    </Motion.button>
                </div>
            </Motion.div>
        </main>
    );
}

export default InfoPage;
import React from "react";
import "./InfoPage.css"
import { useGuest } from "../context/useGuest.jsx";
import { useNavigate } from "react-router-dom";
import { useNickname } from "../hooks/useNickname.jsx";
import { motion as Motion } from "framer-motion";
//import "./InfoPage.css";

const InfoPage = () =>{
    const nickName = useNickname(3000);
    const {guest, confirmAttendance, declineAttendance} = useGuest();
    const navigate = useNavigate();

    if (!guest.name) {
        navigate("/");
        return null;
    }
    return (
        <main>
            <Motion.div
            className="info-page"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}>
                <h2>
                    ¡{nickName} está de cumple y la fiesta es a lo grande!
                </h2>
                <p className="guest-names">
                    <strong>{guest.name}</strong>
                    {guest.companion && (
                        <>
                            {'y'}
                            <strong>
                                {guest.companion}
                            </strong>
                        </>
                    )}
                </p>
                <div className="event-info">
                    <p>
                        Vamos a celebrar sus <strong>75</strong> con un almuerzo bien sabroso que se alarga hasta la rumba. ¡Puro estilo setentas!
                    </p>
                    <p>
                        <strong>Fecha</strong><br />
                        03 de agosto de 2025
                    </p>
                    <p>
                        <strong>Hora</strong><br />
                        desde la 1:00 p.m.
                    </p>
                    <p>
                        <strong>Lugar</strong><br />
                        Portal de Pontevedra I <br />
                        Calle 97 #70c-69, Bogotá
                    </p>
                    <p>
                        <strong>Código de vestuario</strong><br />
                        Look años 70's - ¡saca tu mejor outfit vintage!
                    </p>
                    <p className="dedication-prompt">
                        Escríbele unas palabras para que puedas dedicárselas personalmente en su día
                    </p>
                </div>
                <div className="buttons">
                    <Motion.button
                    className="btn-yes"
                    onClick={confirmAttendance}
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}>
                        ¡Allá estaré con todo el flow!
                    </Motion.button>
                    <Motion.button
                    className="btn-no"
                    onClick={declineAttendance}
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
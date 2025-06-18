import React, {useState} from "react";
import { useGuest } from "../context/useGuest.jsx";
import {motion as Motion} from "framer-motion";
import { useNickname } from "../hooks/useNickname.jsx";
import "./DeclinePage.css"

const API_URL = import.meta.env.VITE_API_URL;
const DeclinePage = () => {
    const {guest, resetGuest, submitMessage} = useGuest();
    const [message, setMessage] = useState(guest.message || "");
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const nickname = useNickname(3000);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!message.trim()){
            setError("Por favor escribe un mensaje.");
            return;
        }
        try {
            await fetch (API_URL, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({...guest, isComing: false, message})
            })
            submitMessage(message);
            setShowPopup(true);
        } catch (error) {
            console.error("Error al enviar el mensaje", error);
            setError("Error al enviar el mensaje. Intentalo de nuevo");
        }
    }
    return (
        <main>
            <Motion.div
            className="decline-page"
            initial={{x:100, opacity:0}}
            animate={{x:0, opacity:1}}
            exit={{opacity:0}}>
                <h2>
                    ¡Gracias por avisarnos!
                </h2>
                <p>
                    Te vamos a extrañar, pero <strong>{nickname}</strong> se alegra con tu cariño. ¿Quiéres dejarle un mensaje?
                </p>
                <form onSubmit={handleSubmit}>
                    <textarea placeholder="Escribe tu mensaje"
                    value={message}
                    onChange={(e)=>{
                        setMessage(e.target.value);
                        setError("");
                    }}
                    maxLength={1000}
                    required>
                        {error && <p className="error">{error}</p>}
                    </textarea>
                    <Motion.button
                    type="submit"
                    whileHover={{scale: 1.05}}
                    whileTap={{scale:0.95}}>
                        Enviar mensaje
                    </Motion.button>
                </form>
                {showPopup && (
                    <Motion.div
                    className="modal-backdrop"
                    initial={{opacity:0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}>
                        <Motion.div
                        className="modal"
                        initial={{opacity:0, scale: 0.8}}
                        animate={{opacity:1, scale:1}}
                        exit={{opacity: 0}}>
                            <h3>¡Gracias por tu mensaje!</h3>
                            <p>
                                Le haremos llegar tus palabras.
                            </p>
                            <Motion.button
                            onClick={()=>{
                                resetGuest();
                                window.close();
                            }}
                            whileHover={{scale:1.05}}
                            whileTap={{scale:0.95}}>
                                Cerrar página
                            </Motion.button>
                        </Motion.div>
                    </Motion.div>
                )}
            </Motion.div>
        </main>
    )
};

export default DeclinePage;
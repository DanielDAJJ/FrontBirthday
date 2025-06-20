import React, { useEffect, useState } from 'react';
import { useGuest } from '../context/useGuest.jsx';
import { motion as Motion } from 'framer-motion';
import "./ConfirmedPage.css";

const API_URL = import.meta.env.VITE_API_URL;
const ConfirmedPage = () => {
    const {guest, resetGuest} = useGuest();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        (async () =>{try {
            await fetch(API_URL, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({...guest, isComing:true})
            });
        } catch (error) {
            console.error('Error al confirmar asistencia:', error)
        }finally{
            setLoading(false);
        }
    })(); 
    }, [guest]);

    if(loading)
        return (
            <Motion.div
            initial={{opacity: 0}} animate={{opacity:1}}>
                <p>Enviando tu confirmación...</p>
            </Motion.div>
        );
    return(
        <main>
            <Motion.div
            className="confirmed-page"
            initial={{scale:0.8, opacity:0}}
            animate={{scale:1, opacity:1}}
            exit={{opacity:0}}>
                <h2>
                    ¡Gracias por confirmar tu asistencia!
                </h2>
                <p>
                    ¡Qué nota! La vamos a pasar buenísimo.
                </p><br />
                <p className='center'>¡Nos vemos pa' la comilona y la bailada!</p>
                <Motion.button
                onClick={()=>{
                    resetGuest();
                    window.close();
                }}
                whileHover={{scale:1.05}}
                whileTap={{scale:0.95}}>
                    Finalizar
                </Motion.button>
            </Motion.div>
        </main>
    )
}
export default ConfirmedPage;
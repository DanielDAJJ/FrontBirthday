import { useState, useEffect } from "react";

const nickNames = ["Enrique", "Henry", "Delgaito", "Enriquito", "Henrito", "Kike", "Pichuco"];
/** 
*@param {number} intervalMs - milisegundos entre cada cambio (por defecto 5000)
*@returns {string} apodo actual
**/

export function useNickname(intervalMs = 5000){
    const [idx, setIdx] = useState(0);

    useEffect(()=>{
        const id = setInterval(()=>{
            setIdx((i)=>(i + 1) % nickNames.length);
        }, intervalMs);
        return () => clearInterval(id);
    },[intervalMs] );

    return nickNames[idx];
}
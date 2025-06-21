import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useGuest } from "../context/useGuest.jsx";

import FormPage from "../pages/FormPage.jsx";
import InfoPage from "../pages/InfoPage.jsx";
import ConfirmedPage from "../pages/ConfirmedPage.jsx";
import DeclinePage from "../pages/DeclinePage.jsx";

import discoGif from "/assets/BolaDisco.gif";

const API_URL = import.meta.env.VITE_API_URL

function ProtectedRoute({ children }) {
    const { guest } = useGuest();
    return guest.name ? children : <Navigate to="/" replace />;
}
function ConfirmedRouteGuard() {
    const { guest } = useGuest();
    return guest.isComing === true ? <ConfirmedPage/> : <Navigate to="/info" replace />;
}
function DeclineRouteGuard() {
    const { guest } = useGuest();
    return guest.isComing === false ? <DeclinePage/> : <Navigate to="/info" replace />;
}


export default function AppRoutes() {
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch(API_URL)
            .then(()=>{
                setTimeout(()=> setLoading(false), 1000);
            })
            .catch((error)=>{
                console.error("No se pudo despertar el back", error);
                setLoading(false);
            });
    }, []);

    if(loading){
        return(
            <main>
                <img src={discoGif} alt="cargando" />
                <h2>Preparando la pista de baile...</h2>
            </main>
        )
    }
    return (
        <Routes>
            <Route path="/" element={<FormPage/>}></Route>
            <Route path="/info" element={
                <ProtectedRoute>
                    <InfoPage/>
                </ProtectedRoute>}></Route>
            <Route path="/confirmed" element={
                <ProtectedRoute>
                    <ConfirmedRouteGuard/>
                </ProtectedRoute>}></Route>
            <Route path="/decline" element={
                <ProtectedRoute>
                    <DeclineRouteGuard/>
                </ProtectedRoute>}></Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
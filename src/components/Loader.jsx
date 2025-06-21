import React from "react";
import "./Loader.css";

const Loader = () => {
    return (
        <div className="loader-container">
            <img src="/assets/BolaDisco.gif" alt="Perparando la pista..." />
            <h2>Preparando la pista de baile</h2>
        </div>
    );
};

export default Loader;
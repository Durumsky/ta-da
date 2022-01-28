import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer">
        <Link style={{textDecoration: 'none'}}to="/app/secrets">
        <span className="secret-button">Secrets</span>
        </Link> 
        </div>
    )
}

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap";
import "../styles/bootstrap.css";

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <div>
            Hello world! I'm React Component
        </div>
    </StrictMode>
)
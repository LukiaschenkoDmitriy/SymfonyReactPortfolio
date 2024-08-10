import "bootstrap";
import "./styles/bootstrap.css";
import "./styles/base.scss";

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <div className="container">
            Hello world. I'm a React component!
        </div>
    </StrictMode>
)
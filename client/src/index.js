import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.js";
import { ProjectProvider } from "./context/ProjectProvider";

ReactDOM.render(
    <Router>
        <AuthProvider>
            <ProjectProvider>
                <App />
            </ProjectProvider>
        </AuthProvider>
    </Router>,
    document.getElementById("root")
);

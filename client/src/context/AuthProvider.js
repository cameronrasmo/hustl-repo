import React, { createContext, useState } from "react";
import Axios from "axios";

const AuthContext = createContext();

const AuthProvider = (props) => {
    const initUserState = {
        user: JSON.parse(localStorage.getItem("user")) || "",
        token: localStorage.getItem("token") || "",
    };
    const [userState, setUserState] = useState(initUserState);
    const [errState, setErrState] = useState("");

    const authorize = (type, body) => {
        Axios.post(`/auth/${type}`, body)
            .then((res) => {
                const { token, user } = res.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                setUserState((prev) => {
                    return {
                        ...prev,
                        user,
                        token,
                    };
                });
            })
            .catch((err) => {
                setErrState(err.response.data.errMsg);
            });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
    };
    return (
        <AuthContext.Provider
            value={{ authorize, userState, errState, logout }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };

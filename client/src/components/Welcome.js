import React, { useRef, useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthProvider.js";
import { ProjectContext } from "../context/ProjectProvider.js";
import logo from "../img/logo/logo.svg";
import logoDarkMode from "../img/logo/logoDarkMode.svg";
import loginIcon from "../img/icons/loginIcon.svg";
import signupIcon from "../img/icons/signupIcon.svg";
import logodim from "../img/icons/yeets.png";

const Welcome = () => {
    const { authorize, errState } = useContext(AuthContext);
    const { darkTheme } = useContext(ProjectContext);

    const [authState, setAuthState] = useState("");
    const [authFields, setAuthFields] = useState({
        username: "",
        password: "",
    });

    const authPanelRef = useRef(null);
    const authCTARef = useRef(null);
    const unRef = useRef(null);
    const pwRef = useRef(null);

    const triggerAuth = () => {
        authCTARef.current.style.display = "flex";
        setTimeout(() => {
            authCTARef.current.style.opacity = 1;
            authCTARef.current.style.height = "75px";
        }, 25);

        unRef.current.style.display = "flex";
        pwRef.current.style.display = "flex";
        setTimeout(() => {
            unRef.current.style.opacity = 1;
            unRef.current.style.height = "75px";
            pwRef.current.style.opacity = 1;
            pwRef.current.style.height = "75px";
        }, 25);
    };

    const submit = () => {
        const type = authState === "Sign Up" ? "signup" : "login";
        authorize(type, authFields);
        setAuthFields({
            username: "",
            password: "",
        });
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setAuthFields((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    useEffect(() => {
        authPanelRef.current.style.bottom = "0px";
        authPanelRef.current.style.opacity = 1;
        authPanelRef.current.style.boxShadow = "0px 4px 5px 0px #22222275";
    }, []);

    return (
        <Container>
            <ContentContainer>
                <HeaderContainer>
                    <h4>Hustl</h4>
                </HeaderContainer>
                <GreetingContainer>
                    <h1>
                        Hi!{" "}
                        <span role='img' aria-label='greeting'>
                            👋
                        </span>
                    </h1>
                    <p>
                        Organize your work into projects, add to your backlog,
                        keep track of your progress, and hustle like you’ve
                        never hustled before.
                    </p>
                </GreetingContainer>
            </ContentContainer>
            <AuthContainer>
                <div>
                    <img
                        src={darkTheme.matches ? logoDarkMode : logo}
                        alt='logo'
                    />
                </div>
                <AuthPanel ref={authPanelRef}>
                    <h2>{authState === "" ? `Get HUSTLIN` : authState}</h2>
                    <AuthFields
                        value={authFields.username}
                        name='username'
                        placeholder='Username'
                        ref={unRef}
                        onChange={onChange}
                        type='text'
                    />
                    {authState === "" ? (
                        <>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAuthState("Log In");
                                    triggerAuth();
                                }}
                            >
                                <p>Log In</p>
                                <div>
                                    <img src={loginIcon} alt='login' />
                                </div>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAuthState("Sign Up");
                                    triggerAuth();
                                }}
                            >
                                <p>Sign Up</p>
                                <div>
                                    <img src={signupIcon} alt='signup' />
                                </div>
                            </button>
                        </>
                    ) : null}
                    <AuthFields
                        value={authFields.password}
                        name='password'
                        placeholder='Password'
                        ref={pwRef}
                        onChange={onChange}
                        type='password'
                    />
                    <AuthCTA ref={authCTARef}>
                        <div>
                            {errState === "" ? null : <div>{errState}</div>}
                        </div>
                        <AuthCTAButton
                            onClick={(e) => {
                                e.preventDefault();
                                submit();
                            }}
                        >
                            <img
                                src={
                                    authState === "Sign Up"
                                        ? signupIcon
                                        : loginIcon
                                }
                                alt='Go'
                            />
                        </AuthCTAButton>
                    </AuthCTA>
                </AuthPanel>
            </AuthContainer>
            <img src={logodim} alt='3d logo' />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;

    z-index: 0;

    background: linear-gradient(#ffffff, #dbdbdb);

    & > img {
        position: absolute;
        display: none;
        left: 0px;
        bottom: 0px;
        z-index: -1;

        width: 90%;
    }

    @media (prefers-color-scheme: dark) {
        background: linear-gradient(#222222, #444444);
    }

    @media (min-width: 1024px) {
        flex-direction: row;

        & > img {
            display: inline-block;
        }
    }
`;
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
`;
const HeaderContainer = styled.div`
    padding: 30px;
    display: flex;

    & > h4 {
        font-size: 15px;
    }

    @media (prefers-color-scheme: dark) {
        & > h4 {
            color: #f2f2f2;
        }
    }

    @media (min-width: 1024px) {
        padding-top: 80px;
        padding-left: 80px;

        & > div {
            margin-top: 55px;
            margin-right: 80px;
        }
    }
`;
const GreetingContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    padding: 30px;

    & > h1 {
        font-size: 50px;
    }

    & > p {
        font-size: 15px;
        font-weight: 400;
    }

    @media (prefers-color-scheme: dark) {
        & > h1 {
            color: #f2f2f2;
        }
        & > p {
            color: #f2f2f2;
        }
    }

    @media (min-width: 1024px) {
        padding-top: 0px;
        padding-left: 80px;
        & > p {
            width: 55%;
        }
    }
`;
const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 0px;

    & > div {
        width: 60px;
        position: absolute;
        right: 0px;
        top: 0px;

        opacity: 1;

        margin-top: 10px;
        margin-right: 15px;

        transition: 0.2s;
        transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

        & > img {
            width: 100%;
            height: 100%;
        }
    }

    @media (min-width: 1024px) {
        padding: 80px;
        justify-content: center;
        flex: 1;
        & > div {
            margin-top: 60px;
            margin-right: 60px;
        }
    }
`;
const AuthPanel = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;

    padding: 30px;
    position: relative;
    bottom: 15px;
    opacity: 0;

    border-radius: 5px 5px 0px 0px;
    box-shadow: 0px 10px 10px 0px #222222;

    background: linear-gradient(45deg, #3a3648, #222222);

    transition: 0.2s;
    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

    & > h2 {
        color: #f2f2f2;
        margin-bottom: 5px;
    }

    & > button {
        width: 100%;
        flex: 1;

        font-size: 20px;
        font-weight: 800;
        margin-top: 5px;
        margin-bottom: 5px;
        opacity: 1;

        display: flex;
        align-items: center;
        justify-content: space-between;

        border-radius: 5px;
        background-color: #f2f2f2;
        outline: none;
        border: 2px solid white;

        transition: 0.4s;
        cursor: pointer;

        & > div {
            height: 55px;
            padding: 0px 20px;

            display: flex;
            align-items: center;

            & > img {
                height: 80%;
            }
        }

        & > p {
            padding: 10px 30px;
            transition: 0.3s;
            transition-timing-function: cubic-bezier(0, 0, 0.056, 1);
        }

        &:hover {
            background-color: white;
            border: 2px solid #f2f2f225;
            color: #222222;
            transition: 0.3s;
        }

        &:active {
            background-color: #f2f2f225;
            border: 2px solid #f2f2f225;
            color: #f2f2f250;
            transition: 0s;
        }
    }

    @media (prefers-color-scheme: dark) {
        background: linear-gradient(45deg, #222222, #111111);
    }

    @media (min-width: 1024px) {
        border-radius: 5px;

        & button {
            & > p {
                padding: 10px 30px;
            }
        }
    }

    @media (min-width: 1820px) {
        max-width: 80%;
    }
`;
const AuthCTA = styled.div`
    width: 100%;
    height: 0px;
    display: none;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    opacity: 0;
    padding-top: 5px;
    padding-bottom: 5px;

    transition: 0.3s;
    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

    & > div > div {
        color: #f2f2f2;
    }
`;
const AuthCTAButton = styled.button`
    width: 75px;
    height: 100%;

    font-size: 20px;
    font-weight: 800;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 5px;
    background-color: #f2f2f2;
    outline: none;
    border: 2px solid white;
    text-decoration: none;

    transition: 0.4s;
    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);
    cursor: pointer;

    & > img {
        width: 45px;
        height: 45px;
        margin-left: 3px;
    }

    &:hover {
        background-color: white;
        border: 2px solid #f2f2f225;
        color: #222222;
        transition: 0.3s;
    }

    &:active {
        background-color: #f2f2f225;
        border: 2px solid #f2f2f225;
        color: #f2f2f250;
        transition: 0s;
    }
`;
const AuthFields = styled.input`
    width: 100%;
    padding: 20px 20px;

    font-size: 18px;
    font-weight: 400;
    margin-top: 5px;
    margin-bottom: 5px;

    display: none;
    opacity: 0;
    align-items: center;
    justify-content: flex-start;

    border-radius: 5px;
    background: none;
    outline: none;
    border: 2px solid #f2f2f230;

    color: #f2f2f2;

    transition: 0.2s;

    &:hover {
        border: 2px solid #f2f2f270;
    }
    &:focus {
        border: 2px solid white;
    }
`;

export default Welcome;

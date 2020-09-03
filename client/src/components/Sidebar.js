import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthProvider.js";
import logo from "../img/logo/logo.svg";
import logoDarkMode from "../img/logo/logoDarkMode.svg";
import addIcon from "../img/icons/addIcon.svg";
import addIconLight from "../img/icons/addIconLight.svg";
import Project from "./Project.js";
import { ProjectContext } from "../context/ProjectProvider.js";

const Sidebar = () => {
    const {
        logout,
        userState: {
            user: { username },
        },
    } = useContext(AuthContext);

    const {
        getProjects,
        projectState,
        selected,
        setSelected,
        newProject,
        darkTheme,
    } = useContext(ProjectContext);

    const sidebarHeaderContainerRef = useRef(null);
    const sidebarContainerRef = useRef(null);
    const projectsContainerRef = useRef(null);

    const scrollListen = e => {
        const { scrollTop } = e.target;
        if (scrollTop > 5) {
            darkTheme.matches
                ? (sidebarHeaderContainerRef.current.style.backgroundColor =
                      "#222")
                : (sidebarHeaderContainerRef.current.style.backgroundColor =
                      "#fff");
            sidebarHeaderContainerRef.current.style.boxShadow =
                "0px 4px 5px 0px #22222225";
        } else {
            sidebarHeaderContainerRef.current.style.background = "none";
            sidebarHeaderContainerRef.current.style.boxShadow = "none";
        }
    };

    useEffect(() => {
        getProjects();
        window.addEventListener("scroll", () => {
            if (window.scrollY > 5) {
                darkTheme.matches
                    ? (sidebarHeaderContainerRef.current.style.backgroundColor =
                          "#222")
                    : (sidebarHeaderContainerRef.current.style.backgroundColor =
                          "#fff");
                sidebarHeaderContainerRef.current.style.boxShadow =
                    "0px 4px 5px 0px #22222225";
            } else {
                sidebarHeaderContainerRef.current.style.background = "none";
                sidebarHeaderContainerRef.current.style.boxShadow = "none";
            }
        });
        setTimeout(() => {
            sidebarContainerRef.current.style.left = "0px";
            sidebarContainerRef.current.style.opacity = 1;
        }, 150);
    }, []);

    useEffect(() => {
        if (selected && window.innerWidth < 1024) {
            sidebarContainerRef.current.style.left = "-100%";
            sidebarContainerRef.current.style.opacity = 0;
        } else {
            sidebarContainerRef.current.style.left = "0px";
            sidebarContainerRef.current.style.opacity = 1;
        }
    }, [selected]);

    return (
        <SidebarContainer ref={sidebarContainerRef}>
            <SidebarHeaderContainer ref={sidebarHeaderContainerRef}>
                <Logo>
                    <img
                        src={darkTheme.matches ? logoDarkMode : logo}
                        alt='logo'
                    />
                </Logo>
                <button onClick={logout}>Log Out</button>
            </SidebarHeaderContainer>
            <ProjectsContainer
                ref={projectsContainerRef}
                onScroll={scrollListen}
            >
                <ProjectHeaderContainer>
                    <p>Hello, {username}</p>
                    <div>
                        <h1>Projects</h1>
                        <button
                            onClick={() => {
                                newProject();
                                setSelected(true);
                                getProjects();
                            }}
                        >
                            <img
                                src={darkTheme.matches ? addIconLight : addIcon}
                                alt='+'
                            />
                        </button>
                    </div>
                </ProjectHeaderContainer>
                {projectState.map(project => {
                    return <Project {...project} />;
                })}
            </ProjectsContainer>
        </SidebarContainer>
    );
};

const SidebarContainer = styled.div`
    width: 100%;

    position: absolute;
    left: -15px;
    opacity: 0;

    display: flex;
    flex-direction: column;

    background-color: #f2f2f2;

    z-index: 1;

    transition: 0.4s;
    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

    @media (prefers-color-scheme: dark) {
        background-color: #222222;
    }

    @media (min-width: 1024px) {
        height: 100vh;
        position: relative;
        flex: 1;
        box-shadow: 5px 0px 5px 0px #22222225;
    }

    @media (min-width: 2300px) {
        flex: 0.7;
    }
`;
const SidebarHeaderContainer = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: none;
    background-color: none;
    position: fixed;
    width: 100%;
    z-index: 1;

    transition: 0.2s;
    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

    & > button {
        padding: 6px 13px;
        border-radius: 5px;

        color: #f2f2f2;
        font-size: 15px;
        font-weight: 500;

        background-color: #222222;
        border: 2px solid #00000020;

        cursor: pointer;
        outline: none;

        transition: 0.4s;
        transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

        &:hover {
            background-color: #444444;
        }

        &:active {
            background-color: #22222275;
            transition: 0s;
        }
    }

    @media (prefers-color-scheme: dark) {
        background-color: #222222;

        & > button {
            color: #222222;
            background-color: #f2f2f2;
        }
    }

    @media (min-width: 1024px) {
        position: relative;
        padding-left: 20px;
        padding-right: 30px;
    }
    @media (min-width: 1480px) {
        padding-left: 30px;
        padding-right: 40px;
    }
`;
const Logo = styled.div`
    width: 60px;

    opacity: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    transition: 0.2s;
    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

    & > img {
        width: 100%;
        height: 100%;
    }
`;
const ProjectsContainer = styled.div`
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20%;

    @media (prefers-color-scheme: dark) {
        &::-webkit-scrollbar {
            background-color: #222222;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #333333;
            border-radius: 10px;
        }
        &::-webkit-scrollbar-corner {
            background-color: #222222;
        }
    }

    @media (min-width: 1024px) {
        padding-left: 30px;
        padding-right: 30px;
        margin-top: 0;
        overflow: scroll;
    }
    @media (min-width: 1480px) {
        padding-left: 40px;
        padding-right: 40px;
    }
`;
const ProjectHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 50px;

    & > p {
        color: #22222295;
    }

    & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    & > div > h1 {
        font-size: 35px;
    }

    & > div > button {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 5px;
        outline: none;
        border: none;
        background-color: #f2f2f2;

        transition: 0.2s;
        transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

        cursor: pointer;

        & img {
            width: 50%;
            height: 50%;
        }

        &:hover {
            background-color: #e2e2e2;
        }

        &:active {
            background-color: #c2c2c2;
            transition: 0s;
        }
    }

    @media (prefers-color-scheme: dark) {
        & > p {
            color: #f2f2f295;
        }

        & > div > h1 {
            color: #f2f2f2;
        }

        & > div > button {
            background-color: #222222;

            &:hover {
                background-color: #333333;
            }
        }
    }

    @media (min-width: 1024px) {
        & > div > h1 {
            font-size: 50px;
        }
    }
`;

export default Sidebar;

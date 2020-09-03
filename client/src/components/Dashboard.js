import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import ProjectFull from "../components/ProjectFull.js";
import { ProjectContext } from "../context/ProjectProvider.js";
import menuIcon from "../img/icons/menuIcon.svg";

const Dashboard = () => {
    const pRef = useRef(null);
    const menuRef = useRef(null);

    const { project, projectState, selected, setSelected } = useContext(
        ProjectContext
    );

    useEffect(() => {
        setTimeout(() => {
            pRef.current.style.opacity = 1;
            pRef.current.style.top = "0px";
        }, 250);
    }, []);

    useEffect(() => {
        if (selected) {
            menuRef.current.style.opacity = 1;
            menuRef.current.style.zIndex = 1;
        } else {
            menuRef.current.style.opacity = 0;
            menuRef.current.style.zIndex = 0;
        }
    }, [selected]);

    return (
        <DashboardContainer>
            <Sidebar />
            <PromptArea>
                <Menu
                    ref={menuRef}
                    onClick={() => {
                        setSelected(false);
                    }}
                >
                    <img src={menuIcon} alt='borgar' />
                </Menu>
                {selected ? (
                    <ProjectFull />
                ) : (
                    <p ref={pRef}>Pick a project or make one!</p>
                )}
            </PromptArea>
        </DashboardContainer>
    );
};

const DashboardContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
`;
const PromptArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    position: relative;

    & > p {
        font-size: 22px;
        font-weight: 500;
        color: #22222275;
        display: none;

        position: relative;
        top: 15px;
        opacity: 0;

        transition: 0.4s;
        transition-timing-function: cubic-bezier(0, 0, 0.056, 1);
    }

    @media (prefers-color-scheme: dark) {
        background-color: #111111;

        & > p {
            color: #f2f2f275;
        }
    }

    @media (min-width: 1024px) {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 2;

        & > p {
            display: flex;
        }
    }

    @media (min-width: 1480px) {
        flex: 3;
    }
`;
const Menu = styled.div`
    width: 50px;
    height: 50px;
    margin: 20px;

    position: absolute;
    left: 0px;
    top: 0px;

    opacity: 0;

    z-index: 1;

    cursor: pointer;

    transition: 0.8s;
    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

    & > img {
        width: 100%;
        height: 100%;
    }

    @media (min-width: 1024px) {
        display: none;
    }
`;

export default Dashboard;

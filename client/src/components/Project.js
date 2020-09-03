import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import arrow from "../img/icons/arrow.svg";
import trash from "../img/icons/trash.svg";
import submitChanges from "../img/icons/submitChanges.svg";
import { ProjectContext } from "../context/ProjectProvider.js";
import { Link } from "react-router-dom";

const Project = ({ title, color, backlog, inProgress, completed, _id }) => {
    const {
        getProject,
        setSelected,
        deleteProject,
        getProjects,
        darkTheme,
    } = useContext(ProjectContext);
    const [deleteHover, setDeleteHover] = useState(false);
    const containerRef = useRef(null);
    const projectContainerRef = useRef(null);

    const lower = title.split(" ").join("").toLowerCase();

    const percentage =
        Math.round(
            (completed.length /
                (backlog.length + inProgress.length + completed.length)) *
                100
        ) || 0;

    useEffect(() => {
        projectContainerRef.current.style.background = `linear-gradient(135deg, ${color[0]}, ${color[1]})`;
        setTimeout(() => {
            containerRef.current.style.opacity = 1;
            containerRef.current.style.bottom = "0px";
        }, 25);
    }, []);

    return (
        <Container ref={containerRef}>
            <ProjectContainer
                ref={projectContainerRef}
                onMouseOver={() => {
                    projectContainerRef.current.style.background = `linear-gradient(-45deg, ${color[0]}, ${color[1]})`;
                }}
                onMouseLeave={() => {
                    projectContainerRef.current.style.background = `linear-gradient(135deg, ${color[0]}, ${color[1]})`;
                }}
                onClick={() => {
                    if (!deleteHover) {
                        getProject(_id);
                    }
                }}
            >
                <Progress>
                    <strong>{percentage}%</strong> complete
                </Progress>
                <Header>{title}</Header>
                <DetailsContainer>
                    <p>{backlog.length} items in backlog</p>
                    <p>{inProgress.length} items in progress</p>
                    <p>{completed.length} items completed</p>
                </DetailsContainer>
                <img src={arrow} alt='>' />
                <DeleteContainer
                    onMouseOver={() => setDeleteHover(true)}
                    onMouseLeave={() => setDeleteHover(false)}
                    onClick={() => {
                        deleteProject(_id);
                        setSelected(false);
                        getProjects();
                    }}
                >
                    <img src={trash} />
                </DeleteContainer>
            </ProjectContainer>
        </Container>
    );
};

const DeleteContainer = styled.div`
    position: absolute;
    bottom: 0px;
    right: 30px;
    width: 40px;
    height: 40px;
    margin: 16px 40px;

    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    z-index: 2;

    transition: 0.2s;

    & > img {
        width: 100%;
        height: 100%;
        position: relative;
        top: 1px;
    }

    @media (max-width: 1024px) {
        opacity: 1;
    }
`;
const Container = styled.div`
    opacity: 0;
    position: relative;
    bottom: -15px;

    transition: 0.2s;
    transition-timing-function: cubic-bezier(0, 0, 0.006, 1);
`;
const ProjectContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    padding: 30px 20px;
    position: relative;

    margin-top: 30px;
    margin-bottom: 30px;

    border-radius: 5px;

    box-shadow: 0px 4px 7px 0px #22222275;

    background: linear-gradient(135deg, #f2f2f2, #d2d2d2);

    transition: 0.2s;
    transition-timing-function: cubic-bezier(0, 0, 0.006, 1);

    cursor: pointer;

    & > img {
        position: absolute;

        margin: 20px 23px;

        width: 30px;
        height: 30px;

        bottom: 0px;
        right: 0px;

        transition: 0.2s;
        transition-timing-function: cubic-bezier(0, 0, 0.006, 1);
    }

    &:hover {
        opacity: 0.9;
        box-shadow: 0px 5px 6px 0px #22222255;
        background: linear-gradient(-45deg);
        & > img {
            margin: 20px 20px;
        }
        ${DeleteContainer} {
            opacity: 1;
        }
    }

    &:active {
        background: linear-gradient(-45deg);
        opacity: 1;
        transition: 0s;
        bottom: -1px;
        box-shadow: 0px 2px 2px 0px #22222255;
        & > img {
            transition: 0s;
            opacity: 0.8;
            margin: 20px 25px;
        }
    }
`;
const Progress = styled.h4`
    font-weight: 300;
    opacity: 0.75;

    color: #f2f2f2;

    & > strong {
        font-weight: 600;
        color: #f2f2f2;
    }
`;
const Header = styled.h1`
    font-size: 27px;
    line-height: 1.3;
    color: #f2f2f2;
    max-width: 350px;
    word-wrap: break-word;

    @media (min-width: 1024px) {
        font-size: 30px;
    }
`;
const DetailsContainer = styled.div`
    margin-top: 15px;
    color: #f2f2f2;

    & > p {
        margin: 10px 0px;
        opacity: 0.75;
        font-weight: 500;
        color: #f2f2f2;
    }
`;

export default Project;

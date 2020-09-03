import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ProjectContext } from "../context/ProjectProvider.js";
import Board from "./Board.js";

const ProjectFull = () => {
    const {
        selected,
        setProject,
        getProjects,
        updateProject,
        darkTheme,
        project,
        getTasks,
        finishProject,
        project: {
            title,
            description,
            color,
            backlog,
            inProgress,
            completed,
            _id,
        },
    } = useContext(ProjectContext);

    const [fieldState, setFieldState] = useState({
        title: "",
        description: "",
    });
    const [editState, setEditState] = useState(false);

    const containerRef = useRef(null);
    const headerRef = useRef(null);
    const titleInputRef = useRef(null);
    const descInputRef = useRef(null);

    const onChangeFields = e => {
        const { name, value } = e.target;
        let { scrollHeight } = e.target;

        if (name === "title") {
            titleInputRef.current.style.height = "65px";
            titleInputRef.current.style.height = `${scrollHeight}px`;
        } else if (name === "description") {
            descInputRef.current.style.height = "65px";
            descInputRef.current.style.height = `${scrollHeight}px`;
        }
        setFieldState(prev => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    let alphaCode = darkTheme.matches ? "cc" : "";

    useEffect(() => {
        setEditState(false);
        getProjects();

        setFieldState({ title, description });
        containerRef.current.style.background = `linear-gradient(135deg, ${color[0]}${alphaCode}, ${color[1]}${alphaCode} )`;
        containerRef.current.style.opacity = 1;

        setTimeout(() => {
            titleInputRef.current.style.height = `${titleInputRef.current.scrollHeight}px`;
            descInputRef.current.style.height = `${descInputRef.current.scrollHeight}px`;
            headerRef.current.style.transition = "0.2s";
            headerRef.current.style.opacity = 1;
            headerRef.current.style.left = "0px";
        }, 50);

        return () => {
            titleInputRef.current.style.height = "65px";
            descInputRef.current.style.height = `25px`;
            headerRef.current.style.transition = "0s";
            headerRef.current.style.opacity = 0;
            headerRef.current.style.left = "-10px";
        };
    }, [_id]);

    return (
        <Container ref={containerRef}>
            <Header ref={headerRef}>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        setEditState(false);
                        updateProject(_id, fieldState);
                        setTimeout(() => {
                            getProjects();
                        }, 150);
                    }}
                >
                    <TitleDesc>
                        <TitleInput
                            ref={titleInputRef}
                            value={fieldState.title}
                            name='title'
                            onChange={onChangeFields}
                            placeholder='Title'
                            onFocus={e => {
                                setEditState(true);
                            }}
                            onBlur={() => {
                                setEditState(false);
                                updateProject(_id, fieldState);
                                getProjects();
                            }}
                        />
                        <DescInput
                            ref={descInputRef}
                            value={fieldState.description}
                            name='description'
                            onChange={onChangeFields}
                            placeholder='Description'
                            onFocus={() => {
                                setEditState(true);
                            }}
                            onBlur={() => {
                                setEditState(false);
                                updateProject(_id, fieldState);
                                getProjects();
                            }}
                        />
                    </TitleDesc>
                </form>
            </Header>
            <BoardContainer>
                <Board type='Backlog' project={project} />
                <Board type='In-Progress' project={project} />
                <Board type='Completed' project={project} />
            </BoardContainer>
        </Container>
    );
};
const Container = styled.div`
    flex: 1;
    background: linear-gradient(135deg, #222, #fff);

    height: 100vh;

    display: flex;
    align-items: center;
    flex-direction: column;

    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20vh;
    padding-bottom: 5vh;
    position: relative;
    z-index: 0;
    overflow: scroll;

    transition: 0.2s;
    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

    @media (prefers-color-scheme: dark) {
        &::-webkit-scrollbar {
            background-color: #f2f2f200;
        }
        &::-webkit-scrollbar-corner {
            background-color: #f2f2f200;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #33333350;
            border-radius: 10px;
        }
    }

    @media (min-width: 1024px) {
        flex: 2;
        padding-right: 40px;
        padding-left: 40px;
    }

    @media (min-width: 1480px) {
        flex: 2;
        padding-right: 120px;
        padding-left: 80px;
    }

    @media (min-width: 2300px) {
        flex: 3;
    }
`;
const Header = styled.div`
    flex: 1;
    padding-bottom: 40px;
    width: 100%;

    position: relative;
    left: -15px;

    display: flex;
    flex-direction: column;

    opacity: 0;

    transition: 0.2s;
    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

    & > form {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    @media (min-width: 1024px) {
        flex-direction: row;
        padding-left: 10px;
        padding-right: 10px;

        & > form {
            flex-direction: row;
        }
    }
`;
const TitleDesc = styled.div`
    flex: 0;
    padding-bottom: 15px;

    line-height: 1.1;
    padding-bottom: 10px;

    @media (min-width: 1024px) {
        flex: 5;
        align-self: center;
        & > textarea {
            width: 75%;
        }
        & > input {
            width: 75%;
        }
        & > p {
            font-size: 17px;
            width: 45%;
        }
    }
`;
const TitleInput = styled.textarea`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    resize: none;
    color: #f2f2f2;
    font-size: 27px;
    font-weight: 700;
    background: none;
    outline: none;
    border: 2px solid #f2f2f200;
    border-radius: 5px;
    transition: 0s;
    overflow: hidden;

    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);
    &::placeholder {
        color: #f2f2f250;
    }

    &:hover {
        border: 2px solid #f2f2f230;
    }

    &:focus {
        border: 2px solid #f2f2f270;
    }

    @media (min-width: 1024px) {
        font-size: 39px;
    }
`;
const DescInput = styled.textarea`
    resize: none;
    color: #f2f2f2;
    background: none;
    font-size: 14px;
    font-weight: 400;
    width: 100%;
    height: 75px;
    line-height: 1.3;
    padding-bottom: 10px;
    overflow: hidden;
    padding-top: 5px;
    padding-bottom: 15px;

    outline: none;
    border: 2px solid #f2f2f200;
    border-radius: 5px;
    transition: 0.2s height 0s;
    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

    &::placeholder {
        color: #f2f2f250;
    }

    &:hover {
        border: 2px solid #f2f2f230;
    }

    &:focus {
        border: 2px solid #f2f2f270;
    }

    @media (min-width: 1024px) {
        width: 60%;
        font-size: 16px;
    }
`;
const ButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media (min-width: 1024px) {
        justify-content: flex-end;

        & > button {
            width: 125px;
        }
    }
`;
const CompletedButton = styled.button`
    width: 100%;
    height: 75px;

    background: none;
    border: 2px solid #f2f2f2;

    color: #f2f2f2;

    border-radius: 5px;

    font-size: 15px;
    font-weight: 800;

    cursor: pointer;

    opacity: ${props => (props.inactive ? 1 : 0)};

    outline: none;

    z-index: ${props => (props.inactive ? 5 : -10)};

    transition: 0.2s;
    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

    &:hover {
        background-color: #f2f2f2;
        color: #222222;
    }

    &:active {
        background-color: #d2d2d2;
        transition: 0s;
    }
`;
const SubmitChangesButton = styled.button`
    width: 100%;
    height: 75px;

    background-color: #f2f2f2;
    border: 2px solid #f2f2f2;
    padding-left: 10px;
    padding-right: 10px;

    color: #222222;

    border-radius: 5px;

    font-size: 15px;
    font-weight: 800;

    cursor: pointer;

    outline: none;

    transition: 0.2s;
    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

    &:hover {
        background-color: #d2d2d2;
        color: #222222;
    }

    &:active {
        background-color: #d2d2d2;
        transition: 0s;
    }
`;
const BoardContainer = styled.div`
    flex: 4;
    width: 100%;
    display: flex;
    flex-direction: column;

    @media (min-width: 1480px) {
        flex-direction: row;
    }
`;

export default ProjectFull;

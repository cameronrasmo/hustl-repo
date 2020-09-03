import React, { useRef, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import taskArrow from "../img/icons/taskArrow.svg";
import submitChanges from "../img/icons/submitChanges.svg";
import trashDark from "../img/icons/trashDark.svg";
import { ProjectContext } from "../context/ProjectProvider.js";
import Axios from "axios";

const userAxios = Axios.create();
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const Task = ({ _id }) => {
    const {
        darkTheme,
        project,
        getProject,
        getProjects,
        moveTask,
        deleteProject,
        deleteTask,
    } = useContext(ProjectContext);
    const textAreaRef = useRef(null);
    const formRef = useRef(null);
    const containerRef = useRef(null);

    const [editState, setEditState] = useState(false);
    const [taskState, setTaskState] = useState({
        title: "",
        board: "",
        _id: "",
    });

    const onTaskChange = e => {
        // textAreaRef.current.style.height = "25px";
        textAreaRef.current.style.height = `${e.target.scrollHeight}px`;
        setTaskState({ title: e.target.value });
    };

    const getTask = taskId => {
        userAxios.get(`/api/task/${taskId}`).then(res =>
            setTaskState(prev => {
                if (res.data[0]) {
                    return {
                        title: res.data[0].title,
                        board: res.data[0].board,
                        _id: res.data[0]._id,
                    };
                }
                return {
                    title: "",
                    board: "",
                    _id: "",
                };
            })
        );
    };

    const updateTask = (taskId, data) => {
        userAxios.put(`/api/task/${taskId}`, data).then(res =>
            setTaskState(prev => {
                return {
                    title: res.data.title,
                    board: res.data.board,
                    _id: res.data._id,
                };
            })
        );
    };

    useEffect(() => {
        getTask(_id);
        containerRef.current.style.padding = "30px 20px";
        containerRef.current.style.opacity = 1;
    }, []);

    return (
        <Container
            ref={containerRef}
            onClick={() => {
                textAreaRef.current.focus();
            }}
        >
            <form
                onSubmit={e => {
                    e.preventDefault();
                    setEditState(false);
                }}
                style={
                    taskState.board === "completed"
                        ? { width: "100%" }
                        : { width: "90%" }
                }
                ref={formRef}
            >
                <textarea
                    ref={textAreaRef}
                    placeholder='Task'
                    onChange={onTaskChange}
                    value={taskState.title}
                    onFocus={e => {
                        setEditState(true);
                        containerRef.current.style.backgroundColor = "#f2f2f2";
                        textAreaRef.current.style.height = `${e.target.scrollHeight}px`;
                        textAreaRef.current.style.cursor = "text";
                        containerRef.current.style.boxShadow =
                            "0px 5px 5px 0px #22222255";
                    }}
                    onBlur={e => {
                        containerRef.current.style.backgroundColor =
                            "#f2f2f2e6";
                        textAreaRef.current.style.height = "25px";

                        textAreaRef.current.style.height = `${e.target.scrollHeight}px`;

                        textAreaRef.current.style.cursor = "pointer";
                        containerRef.current.style.boxShadow = "none";
                    }}
                ></textarea>
                {editState ? (
                    <DeleteContainer
                        onClick={() => {
                            deleteTask(project._id, _id, taskState.board);
                            getProjects();
                            getProject(project._id);
                        }}
                    >
                        <img src={trashDark} />
                    </DeleteContainer>
                ) : (
                    <></>
                )}

                {editState ? (
                    <SubmitChangesButton
                        onClick={() => {
                            updateTask(_id, taskState);
                            setEditState(false);
                            getProject(project._id);
                            getProjects();
                        }}
                    >
                        <img src={submitChanges} alt='Edit' />
                    </SubmitChangesButton>
                ) : (
                    <MoveButton
                        style={{
                            display:
                                taskState.board === "completed"
                                    ? "none"
                                    : "flex",
                        }}
                        onClick={() => {
                            let type =
                                taskState.board === "backlog"
                                    ? "inProgress"
                                    : "completed";
                            moveTask(project._id, _id, type);
                            getProject(project._id);
                            getProjects();
                        }}
                    >
                        <img src={taskArrow} alt='move' />
                    </MoveButton>
                )}
            </form>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    padding: 0px 20px;
    margin-bottom: 20px;

    display: flex;
    flex-direction: row;

    position: relative;
    bottom: 0px;
    opacity: 0;

    background-color: #f2f2f2e6;
    border-radius: 5px;

    cursor: pointer;

    transition: 0.2s;
    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

    & > form {
        width: 90%;

        transition: 0.3s;
        transition-timing-function: cubic-bezier(0, 0, 0.056, 1);
    }

    & > form > textarea {
        font-weight: 600;
        font-size: 17px;
        color: #222222;
        resize: none;
        border: none;
        height: 100%;
        width: 70%;
        height: 25px;
        background: none;
        outline: none;
        cursor: pointer;
    }

    &:hover {
        bottom: 1px;
        box-shadow: 0px 5px 5px 0px #22222255;
    }
`;
const DeleteContainer = styled.div`
    width: 75px;
    height: 100%;
    position: absolute;
    right: 75px;
    top: 0px;

    display: flex;
    align-items: center;
    justify-content: center;

    opacity: 1;

    & > img {
        width: 55%;
    }

    &:hover {
        opacity: 0.8;
    }

    &:active {
        opacity: 0.5;
    }
`;
const MoveButton = styled.button`
    width: 75px;
    height: 100%;
    background-color: #222222;
    position: absolute;
    right: 0px;
    top: 0px;
    outline: none;
    border: none;
    z-index: 10;

    cursor: pointer;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 0px 5px 5px 0px;

    transition: 0.1s;
    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

    & > img {
        width: 65%;
        transform: rotate(90deg);
    }

    &:hover {
        background-color: #333333;
    }

    &:active {
        transition: 0s;
        background-color: #111111;

        ${Container} {
            transition: 0s;
            bottom: -1px;
        }
    }

    @media (min-width: 1480px) {
        & > img {
            transform: rotate(0deg);
        }
    }
`;
const SubmitChangesButton = styled.button`
    width: 75px;
    height: 100%;
    background-color: #222222;
    position: absolute;
    right: 0px;
    top: 0px;
    outline: none;
    border: none;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 0px 5px 5px 0px;

    transition: 0.1s;
    transition-timing-function: cubic-bezier(0, 0, 0.056, 1);

    & > img {
        width: 65%;
    }

    &:hover {
        background-color: #333333;
    }

    &:active {
        transition: 0s;
        background-color: #111111;

        ${Container} {
            transition: 0s;
            bottom: -1px;
        }
    }
`;
export default Task;

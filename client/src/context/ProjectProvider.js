import React, { createContext, useState, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "./AuthProvider.js";

const ProjectContext = createContext();
const userAxios = Axios.create();
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const ProjectProvider = props => {
    const { userState } = useContext(AuthContext);
    const initTaskState = {
        backlog: [],
        inProgress: [],
        completed: [],
    };
    const [projectState, setProjectState] = useState([]);
    const [selected, setSelected] = useState(false);
    const [project, setProject] = useState({
        title: "",
        description: "",
        color: [],
        backlog: [],
        inProgress: [],
        completed: [],
    });

    const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    console.log(userState);
    const getProjects = () => {
        userAxios
            .get(`/api/projects/${userState.user._id}/all`)
            .then(res => {
                setProjectState(res.data);
            })
            .catch(err => console.log(err));
    };

    const newProject = () => {
        userAxios
            .post(`/api/projects/${userState.user._id}`)
            .then(res => setProject(res.data))
            .catch(err => console.log(err));
    };

    const getProject = id => {
        setSelected(true);
        userAxios.get(`/api/projects/${id}`).then(res => {
            setProject(res.data);
        });
    };

    const updateProject = (id, data) => {
        userAxios
            .put(`/api/projects/${id}`, data)
            .then(res => {
                setProject(res.data);
            })
            .catch(err => console.log(err));
    };

    const deleteProject = id => {
        userAxios
            .delete(`/api/projects/${id}`)
            .then(res => console.log("Deleted"))
            .catch(err => console.log(err));
    };

    const addTask = (projectId, data) => {
        userAxios.post(`/api/task/add/${projectId}`, data);
    };

    const moveTask = (projectId, taskId, nextBoard) => {
        userAxios.put(`/api/task/${nextBoard}/${projectId}/${taskId}`);
    };

    const deleteTask = (projectId, taskId, board) => {
        userAxios
            .delete(`/api/task/${board}/${projectId}/${taskId}`)
            .then(res => console.log(res));
    };

    return (
        <ProjectContext.Provider
            value={{
                projectState,
                getProjects,
                selected,
                setSelected,
                project,
                setProject,
                getProject,
                updateProject,
                newProject,
                deleteProject,
                darkTheme,
                addTask,
                moveTask,
                deleteTask,
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    );
};

export { ProjectContext, ProjectProvider };

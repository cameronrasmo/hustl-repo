import React, { useContext } from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider.js";
import Welcome from "./components/Welcome.js";
import Dashboard from "./components/Dashboard.js";

const App = () => {
    const {
        userState: { token },
    } = useContext(AuthContext);
    return (
        <Container>
            <Switch>
                <Route
                    exact
                    path='/'
                    render={() =>
                        token ? <Redirect to='/dashboard' /> : <Welcome />
                    }
                ></Route>
                <Route
                    path='/dashboard'
                    render={() => (token ? <Dashboard /> : <Redirect to='/' />)}
                />
            </Switch>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default App;

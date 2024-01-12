import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Main from "./pages/Main";

import "./App.css";
import { store } from "./redux/reducers";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path='/login'>
                        <Login />
                    </Route>

                    <Route path='/'>
                        <Main />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;

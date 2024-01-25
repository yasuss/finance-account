import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { store } from "shared/redux/reducers";

import { Login } from "pages/login";
import { Main } from "pages/main";

import "./App.css";

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

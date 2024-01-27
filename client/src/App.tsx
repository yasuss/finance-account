import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { common, teal } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { store } from "shared/redux/reducers";

import { Login } from "pages/login";
import { Main } from "pages/main";

const theme = createTheme({
    palette: {
        primary: teal,
        secondary: {
            main: common.white,
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    );
};

export default App;

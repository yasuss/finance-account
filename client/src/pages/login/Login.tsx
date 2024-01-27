import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { Button, TextField } from "@mui/material";

import { signIn, signUp } from "shared/api";
import { store } from "shared/redux/reducers";
import { State } from "shared/types";
import Heading from "shared/ui/Heading";

import * as Styled from "./styles";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [tab, setTab] = useState("signIn");
    const [error, setError] = useState(null);

    const userData = useSelector((state: State) => state?.userData);

    const handleOnClick = () => {
        if (tab === "signIn") {
            signIn({ username, password }).then((res) => {
                const { status } = res;
                const { data } = res;

                if (status === 200) {
                    const { uuid } = data;

                    setError(null);

                    localStorage.setItem(
                        "userData",
                        JSON.stringify({ username, uuid, isAuthorised: true }),
                    );
                    store.dispatch({
                        type: "LOGIN",
                        userData: {
                            username,
                            uuid,
                            isAuthorised: true,
                        },
                    });
                } else {
                    const { message } = data;
                    setError(message);
                }
            });
        } else {
            signUp({ username, password, passwordConfirm }).then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    const { uuid } = data;

                    localStorage.setItem(
                        "userData",
                        JSON.stringify({ username, uuid, isAuthorised: true }),
                    );
                    store.dispatch({
                        type: "LOGIN",
                        userData: {
                            username,
                            uuid,
                            isAuthorised: true,
                        },
                    });
                } else {
                    const { message } = data;
                    setError(message);
                }
            });
        }
    };

    if (userData.isAuthorised) {
        return <Redirect to='/' />;
    }

    return (
        <Styled.PageBox>
            <Styled.Modal>
                <Heading>{tab === "signIn" ? "SignIn" : "SignUp"}</Heading>
                {error ? (
                    <Styled.ErrorMessage>{error}</Styled.ErrorMessage>
                ) : null}
                <Styled.InputBox>
                    <TextField
                        size='small'
                        variant='outlined'
                        placeholder='Username'
                        value={username}
                        onChange={(event) => {
                            setError(null);
                            setUsername(event.target.value);
                        }}
                    />
                    <TextField
                        size='small'
                        variant='outlined'
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={(event) => {
                            setError(null);
                            setPassword(event.target.value);
                        }}
                    />
                    {tab === "signUp" && (
                        <TextField
                            size='small'
                            placeholder='Confirm password'
                            type='password'
                            value={passwordConfirm}
                            onChange={(event) =>
                                setPasswordConfirm(event.target.value)
                            }
                        />
                    )}
                </Styled.InputBox>
                <Button variant='contained' onClick={handleOnClick}>
                    {tab === "signIn" ? "SignIn" : "SignUp"}
                </Button>
                <Button
                    onClick={() => {
                        setTab(tab === "signIn" ? "signUp" : "signIn");
                        setError(null);
                    }}>
                    {tab === "signIn"
                        ? "Not a user yet?"
                        : "Already have an account?"}
                </Button>{" "}
            </Styled.Modal>
        </Styled.PageBox>
    );
};

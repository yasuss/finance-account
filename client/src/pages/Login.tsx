﻿import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import styled from "styled-components";

import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";
import TextButton from "../components/TextButton";
import { store } from "../redux/reducers";
import { signIn, signUp } from "../requests";
import { State } from "../types";

const PageBox = styled.div`
    display: flex;
    height: 100vh;
`;

const Modal = styled.div`
    height: 450px;
    width: 400px;
    padding: 0 15px;
    margin: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    border: 1px solid palevioletred;
    border-radius: 4px;
`;

const InputBox = styled.div<{ height?: string }>`
    height: ${({ height }) => height || "80px"};

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ErrorMessage = styled.div`
    height: 18px;
    color: red;
    padding-left: 10px;
`;

const ChangeTabs = ({ tab, setTab, setError }: any) => {
    const handleOnClick = () => {
        setTab(tab === "signIn" ? "signUp" : "signIn");
        setError(null);
    };

    return (
        <div>
            <TextButton onClick={handleOnClick}>
                {tab === "signIn"
                    ? "Not a user yet?"
                    : "Already have an account?"}
            </TextButton>
        </div>
    );
};

const Login = () => {
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
        <PageBox>
            <Modal>
                <Heading>{tab === "signIn" ? "SignIn" : "SignUp"}</Heading>
                <ErrorMessage>{error}</ErrorMessage>
                <InputBox height={tab === "signIn" ? "80px" : "110px"}>
                    <Input
                        placeholder='Username'
                        value={username}
                        onChange={(event) => {
                            setError(null);
                            setUsername(event.target.value);
                        }}
                    />
                    <Input
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={(event) => {
                            setError(null);
                            setPassword(event.target.value);
                        }}
                    />
                    {tab === "signUp" && (
                        <Input
                            placeholder='Confirm password'
                            type='password'
                            value={passwordConfirm}
                            onChange={(event) =>
                                setPasswordConfirm(event.target.value)
                            }
                        />
                    )}
                </InputBox>

                <Button primary onClick={handleOnClick}>
                    {tab === "signIn" ? "SignIn" : "SignUp"}
                </Button>

                <ChangeTabs tab={tab} setTab={setTab} setError={setError} />
            </Modal>
        </PageBox>
    );
};

export default Login;

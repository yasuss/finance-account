import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { signIn, signUp } from "shared/api";
import { store } from "shared/redux/reducers";
import { State } from "shared/types";
import Button from "shared/ui/Button";
import Heading from "shared/ui/Heading";
import Input from "shared/ui/Input";
import TextButton from "shared/ui/TextButton";

import * as Styled from "./styles";

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
                <Styled.ErrorMessage>{error}</Styled.ErrorMessage>
                <Styled.InputBox height={tab === "signIn" ? "80px" : "110px"}>
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
                </Styled.InputBox>

                <Button primary onClick={handleOnClick}>
                    {tab === "signIn" ? "SignIn" : "SignUp"}
                </Button>

                <ChangeTabs tab={tab} setTab={setTab} setError={setError} />
            </Styled.Modal>
        </Styled.PageBox>
    );
};

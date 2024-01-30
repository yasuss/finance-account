import React from "react";
import { Link } from "react-router-dom";

import { Button, IconButton } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import { Plus } from "assets";

import { store } from "shared/redux/reducers";
import SVG from "shared/ui/Icon";
import Tab from "shared/ui/Tab";

import { setShowModal } from "widgets/modal/ModalItem";

import * as Styled from "./styles";

export const TABS = [
    {
        text: "Info",
        key: "info",
    },
    {
        text: "Account",
        key: "account",
    },
    {
        text: "Calendar",
        key: "calendar",
    },
    {
        text: "Graphs",
        key: "graphs",
    },
];

export const HeaderMenu = ({ currentTab, setCurrentTab }: any) => {
    const onLogout = () => {
        store.dispatch({
            type: "LOGOUT",
        });
    };

    return (
        <Styled.Container>
            <Styled.Menu>
                {TABS.map(({ key, text }) => (
                    <Link to={`/${key}`}>
                        <Tab
                            key={key}
                            id={`tab_${key}`}
                            selected={key === currentTab}
                            onClick={(e) =>
                                setCurrentTab(e.currentTarget.id.split("_")[1])
                            }>
                            {text}
                        </Tab>
                    </Link>
                ))}
            </Styled.Menu>

            <Styled.ButtonContainer>
                <IconButton
                    color='secondary'
                    onClick={() => setShowModal(true)}>
                    <SvgIcon>
                        <SVG src={Plus} />
                    </SvgIcon>
                </IconButton>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={onLogout}>
                    Logout
                </Button>
            </Styled.ButtonContainer>
        </Styled.Container>
    );
};

import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { Link, Route, Switch } from "react-router-dom";

import styled from "styled-components";

import { Plus } from "../assets";
import Button from "../components/Button";
import SVG from "../components/Icon";
import IconButton from "../components/IconButton";
import Tab from "../components/Tab";
import { ModalItem, setShowModal } from "../containers/ModalItem";
import { store } from "../redux/reducers";
import {
    getCategoriesRequest,
    getDataByCategoryRequest,
    getDataTableRequest,
    getUsersRequest,
} from "../requests";
import { State } from "../types";
import { Calendar } from "./Calendar";
import { Graphs } from "./Graphs";
import { Info } from "./Info";
import { Table } from "./Table";

const TABS = [
    {
        text: "Инфо",
        key: "Info",
    },
    {
        text: "Учет",
        key: "Account",
    },
    {
        text: "Календарь",
        key: "Calendar",
    },
    {
        text: "Графики",
        key: "Graphs",
    },
];

const Header = styled.div`
    height: 50px;

    display: flex;
    justify-content: space-around;
    top: 0;

    padding: 0 20px;

    background: #af5a76;
`;

const Menu = styled.div`
    height: 40px;

    align-self: flex-end;

    a + a {
        margin-left: 4px;
    }
`;

const LogoutButton = styled(Button)`
    align-self: center;
`;

const HeaderMenu = ({ currentTab, setCurrentTab }: any) => {
    const onLogout = () => {
        store.dispatch({
            type: "LOGOUT",
        });
    };

    return (
        <Header>
            <Menu>
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
            </Menu>
            <div style={{ alignSelf: "center" }}>
                <div
                    style={{
                        display: "inline-block",
                        marginRight: "10px",
                    }}>
                    <IconButton
                        fillColor='white'
                        fillColorHover='palevioletred'
                        onClick={() => setShowModal(true)}>
                        <SVG src={Plus} />
                    </IconButton>
                </div>
                <LogoutButton primary onClick={onLogout}>
                    Выйти
                </LogoutButton>
            </div>
        </Header>
    );
};

const ContentContainer = styled.div`
    height: 100%;

    padding: 0 20px;
`;

const Main = () => {
    const { pathname } = useLocation();
    const [currentTab, setCurrentTab] = useState(
        pathname.slice(1) || TABS[0].key,
    );

    const userData = useSelector((state: State) => state?.userData);
    console.log("userData", userData);
    const showModal = useSelector((state: State) => state?.showModal);
    const { startDate: startDateTable, endDate: endDateTable } = useSelector(
        (state: State) => state?.tableData,
    );
    const { startDate, endDate } = useSelector(
        (state: State) => state.dataGraphs,
    );

    const getDataTable = useCallback(
        () =>
            getDataTableRequest(userData, {
                startDate: new Date(startDateTable),
                endDate: new Date(endDateTable),
            }),
        [getDataTableRequest, userData],
    );
    const getDataByCategory = useCallback(
        () => getDataByCategoryRequest(userData, { startDate, endDate }),
        [getDataByCategoryRequest],
    );
    const getCategories = useCallback(getCategoriesRequest, [
        getCategoriesRequest,
    ]);
    const getUsers = useCallback(getUsersRequest, [getUsersRequest]);

    useEffect(() => {
        getUsers();
        getCategories();
        getDataTable();
        getDataByCategory();
    }, [getUsers, getCategories, getDataTable, getDataByCategory]);

    if (!userData.isAuthorised) {
        return <Redirect to='/login' />;
    }

    if (pathname === "/") {
        return <Redirect to='/info' />;
    }

    return (
        <div className='Main' style={{ height: "100vh" }}>
            <HeaderMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <ContentContainer>
                <Switch>
                    <Route path='/info'>
                        <Info />
                    </Route>
                    <Route path='/account'>
                        <Table />
                    </Route>
                    <Route path='/calendar'>
                        <Calendar />
                    </Route>
                    <Route path='/graphs'>
                        <Graphs />
                    </Route>
                </Switch>
            </ContentContainer>
            {showModal && <ModalItem />}
        </div>
    );
};

export default Main;

import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch,
    useLocation,
} from "react-router-dom";

import {
    getCategoriesRequest,
    getDataByCategoryRequest,
    getDataTableRequest,
    getUsersRequest,
} from "shared/api";
import { State } from "shared/types";

import { HeaderMenu, TABS } from "entities/header";

import { ModalItem } from "widgets/modal/ModalItem";

import { Calendar } from "pages/calendar";
import { Graphs } from "pages/graphs";
import { Info } from "pages/info";
import { Table } from "pages/table";

import * as Styled from "./styles";

export const Main = () => {
    const { pathname } = useLocation();
    const [currentTab, setCurrentTab] = useState(
        pathname.slice(1) || TABS?.[0]?.key,
    );

    const userData = useSelector((state: State) => state?.userData);
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

    return (
        <BrowserRouter>
            <div className='Main' style={{ height: "100vh" }}>
                <HeaderMenu
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                />
                <Styled.ContentContainer>
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

                        <Route exact path='/'>
                            <Redirect to='/info' />
                        </Route>
                    </Switch>
                </Styled.ContentContainer>

                {showModal && <ModalItem />}
            </div>
        </BrowserRouter>
    );
};

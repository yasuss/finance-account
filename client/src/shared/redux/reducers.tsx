import { createStore } from "redux";

import { makeTitle } from "shared/lib/helpers";

import { initalState } from "./initialState";

export const rootReducer = (state = initalState, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, userData: action.userData };
        case "LOGOUT":
            localStorage.removeItem("userData");
            return {
                ...state,
                userData: { username: "", isAuthorised: false },
            };
        case "SET_DATA":
            const { startDate: startDateTable, endDate: endDateTable } =
                action.dates;
            const tableData = {
                data: action.data,
                startDate: startDateTable,
                endDate: endDateTable,
            };
            return { ...state, tableData };
        case "SET_DATA_GRAPHS":
            const dataGraphsRaw = action.data || [];
            const { startDate: startDateGraphs, endDate: endDateGraphs } =
                action.dates;
            const dataGraphs: {
                data: any[];
                totalSumm: number;
                startDate: Date;
                endDate: Date;
            } = {
                data: [],
                totalSumm: 0,
                startDate: startDateGraphs,
                endDate: endDateGraphs,
            };
            dataGraphs.data = dataGraphsRaw.map((element: any) => {
                const summ = Number(element.value);
                dataGraphs.totalSumm += summ;
                return { ...element, color: element.color };
            });
            dataGraphs.data = dataGraphs.data.map((element) => {
                const summ = Number(element.summ);
                const percent = Math.round((summ / dataGraphs.totalSumm) * 100);
                return { ...element, angle: percent };
            });
            return { ...state, dataGraphs };
        case "SET_CALENDAR_DATA":
            const calendarDataRaw = action.data;
            const { startDate, endDate } = action.dates;
            const calendarData: any = {
                data: [],
                startDate,
                endDate,
            };

            calendarData.data = calendarDataRaw.map(
                ({ date, summ, category, id, comment, color, label }: any) => {
                    const item = {
                        category,
                        color,
                        comment,
                        date,
                        summ,
                        title: makeTitle({ summ, category: label }),
                        start: date,
                        allDay: true,
                        id,
                        description: comment,
                        backgroundColor: color,
                        borderColor: color,
                        editable: true,
                        extendedProps: {
                            comment,
                        },
                    };
                    return item;
                },
            );

            return { ...state, calendarData };
        case "SET_MODAL_ADD_SPENDING":
            const { showModal, preDataModal } = action.data;
            return {
                ...state,
                showModal,
                preDataModal: preDataModal || initalState.preDataModal,
            };
        case "SET_CATEGORIES":
            return { ...state, categories: action.categories };
        case "SET_MODAL_DATA":
            return { ...state, modalData: action.data };
        case "CLEAR_MODAL_DATA":
            return { ...state, modalData: initalState.modalData };
        default:
            return state;
    }
};

export const store = createStore(rootReducer);

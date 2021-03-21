﻿import { State } from "./types";
import {getUserDataStorage, getCalendarDates} from '../helpers';

// startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1);
//endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(1);

export const initalState: State = {
  userData: getUserDataStorage(),
  tableData: {
    data: [],
    startDate: new Date(new Date().setDate(1)),
    endDate: new Date(),
  },
  calendarData: {
    data: [],
    startDate: getCalendarDates().startDate,
    endDate: getCalendarDates().endDate,
  },
  showModal: false,
  categories: [],
  modalData: {},
  preDataModal: {
    summ: "",
    date: new Date(),
    category: "0",
    comment: "",
    editing: false,
  },
  dataGraphs: {
    data: [],
    totalSumm: 0,
    startDate: new Date(new Date().setDate(1)),
    endDate: new Date(),
  },
};
import axios from "axios";

import { store } from "../redux/reducers";
import { UserData } from "../types";

export const signIn = async ({ username, password }: UserData) => {
  return await axios
    .post("/signin", { username, password })
    .then((resp) => resp)
    .catch((err) => err.response);
};

export const signUp = async ({
  username,
  password,
  passwordConfirm,
}: UserData) => {
  if (password === passwordConfirm) {
    return await axios
      .post("/signup", { username, password })
      .then((resp) => resp)
      .catch((err) => err.response);
  } else {
    return { data: { message: "Пароли не совпадают. Повторите попытку" } };
  }
};

export const getUsersRequest = async () => {
  const { data } = await axios
    .get("/users")
    .then((resp) => resp)
    .catch((err) => err);
};

export const getDataTableRequest = async (userData: any, dates?: any) => {
  const { uuid } = userData;
  const { startDate, endDate } = dates
    ? dates
    : { startDate: new Date(), endDate: new Date() };

  const convertStartDate = new Date(startDate.setHours(0, 0, 0)).toISOString();
  const convertEndDate = new Date(endDate.setHours(23, 59, 59)).toISOString();

  const { data } = await axios
    .post("/data", {
      uuid,
      startDate: convertStartDate,
      endDate: convertEndDate,
    })
    .then((resp) => resp)
    .catch((err) => {
      if (err.response.status === 403) {
        store.dispatch({
          type: "LOGOUT",
        });
      }
      return { data: [] };
    });
  store.dispatch({
    type: "SET_DATA",
    data: data.data,
    dates: {
      startDate: startDate || new Date(new Date().setHours(0, 0, 0)),
      endDate: endDate || new Date(new Date().setHours(23, 59, 59)),
    },
  });
};

export const getDataCalendarRequest = async (userData: any, dates?: any) => {
  const { uuid } = userData;
  const { startDate, endDate } = dates
    ? dates
    : { startDate: new Date(), endDate: new Date() };

  const convertStartDate = startDate.toISOString();
  const convertEndDate = endDate.toISOString();

  const { data } = await axios
    .post("/data", {
      uuid,
      startDate: convertStartDate,
      endDate: convertEndDate,
    })
    .then((resp) => resp)
    .catch((err) => {
      if (err.response.status === 403) {
        store.dispatch({
          type: "LOGOUT",
        });
      }
      return { data: [] };
    });
  store.dispatch({
    type: "SET_CALENDAR_DATA",
    data: data.data,
    dates: {
      startDate: startDate || new Date(new Date().setHours(0, 0, 0)),
      endDate: endDate || new Date(new Date().setHours(23, 59, 59)),
    },
  });
};

export const getDataByCategoryRequest = async (userData: any, dates?: any) => {
  const { uuid } = userData;
  const { startDate, endDate } = dates;

  const convertStartDate = new Date(startDate.setHours(0, 0, 0)).toISOString();
  const convertEndDate = new Date(endDate.setHours(23, 59, 59)).toISOString();

  const { data } = await axios
    .post("/dataByCategory", {
      uuid,
      startDate: convertStartDate,
      endDate: convertEndDate,
    })
    .then((resp) => resp)
    .catch((err) => {
      if (err.response.status === 403) {
        store.dispatch({
          type: "LOGOUT",
        });
      }
      return { data: [] };
    });
  store.dispatch({
    type: "SET_DATA_GRAPHS",
    data: data.data,
    dates: {
      startDate: startDate || new Date(new Date().setHours(0, 0, 0)),
      endDate: endDate || new Date(new Date().setHours(23, 59, 59)),
    },
  });
};

export const getCategoriesRequest = async () => {
  const { data } = await axios
    .get("/categories")
    .then((resp) => resp)
    .catch((err) => {
      if (err.response.status === 403) {
        store.dispatch({
          type: "LOGOUT",
        });
      }
      return { data: [] };
    });
  store.dispatch({
    type: "SET_CATEGORIES",
    categories: data.data,
  });
};

export const addItem = async ({
  item,
  setShowModal,
  userData,
  tableDates,
  calendarDates,
  graphsDates,
}: any) => {
  const { uuid } = userData;
  const { summ, date, category, comment } = item;
  const convertDate = date.toISOString();

  return await axios
    .post("/additem", {
      summ,
      date: convertDate,
      category,
      comment,
      uuid,
    })
    .then(async (resp) => {
      Promise.all([
        getDataByCategoryRequest(userData, graphsDates),
        getDataTableRequest(userData, tableDates),
        getDataCalendarRequest(userData, calendarDates),
      ]).then((resp) => {
        setShowModal(false);
        store.dispatch({
          type: "CLEAR_MODAL_DATA",
        });
      });

      return resp;
    })
    .catch((err) => err);
};

export const editItem = async ({
  item,
  setShowModal,
  userData,
  tableDates,
  calendarDates,
  graphsDates,
}: any) => {
  const { uuid } = userData;
  const { summ, date, category, comment, id } = item;
  const convertDate = date.toISOString();

  return await axios
    .post("/editItem", {
      summ,
      date: convertDate,
      category,
      comment,
      id,
      uuid,
    })
    .then(async (resp) => {
      Promise.all([
        getDataByCategoryRequest(userData, graphsDates),
        getDataTableRequest(userData, tableDates),
        getDataCalendarRequest(userData, calendarDates),
      ]).then((resp) => {
        setShowModal(false);
        store.dispatch({
          type: "CLEAR_MODAL_DATA",
        });
      });

      return resp;
    })
    .catch((err) => err);
};

export const deleteItem = async ({
  id,
  setShowModal,
  userData,
  tableDates,
  calendarDates,
  graphsDates,
}: any) => {
  return await axios
    .post("/deleteItem", { id })
    .then((resp) => {
      Promise.all([
        getDataByCategoryRequest(userData, graphsDates),
        getDataTableRequest(userData, tableDates),
        getDataCalendarRequest(userData, calendarDates),
      ]).then((resp) => {
        setShowModal(false);
        store.dispatch({
          type: "CLEAR_MODAL_DATA",
        });
      });
    })
    .catch((err) => err);
};

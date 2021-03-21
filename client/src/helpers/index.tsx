import find from "lodash/find";

export const getCategoryName = (categories: any, category: any) => {
  const categoryItem = find(categories, (el: any) => el.category === category);
  const categoryName = categoryItem && categoryItem.name;
  return categoryName;
};

export const getDataById = (id: string, data: any[]) => {
  const item = find(data, (el: any) => el.id === Number(id));
  return { ...item, date: new Date(item.date) };
};

export const makeSumm = (summ: number | string) => `${summ}₽`;

export const makeTitle = (modalData: any) => {
  const { summ, category } = modalData;
  let resultStr = `${makeSumm(summ)}, ${category}`;

  return resultStr;
};

export const getUserDataStorage = () => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    return JSON.parse(userData);
  }
  return { username: "", uuid: "", isAuthorised: false };
};

export const getCalendarDates = () => {
  const currentMonth = new Date().getMonth();
  const startDate = new Date(new Date().setMonth(currentMonth - 1, 1));
  const endDate = new Date(new Date().setMonth(currentMonth + 1, 1));
  return { startDate, endDate };
};

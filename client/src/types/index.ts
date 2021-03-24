export type UserData = {
  username: string;
  password: string;
  passwordConfirm?: string;
};

export type State = {
  userData: {
    username: string;
    isAuthorised: boolean;
  };
  tableData: any;
  showModal: boolean;
  categories: any[];
  modalData: any;
  preDataModal: any;
  calendarData: any;
  dataGraphs: any;
};

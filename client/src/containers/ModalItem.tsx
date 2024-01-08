import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import ModalWindow from "../components/ModalWindow";
import Input from "../components/Input";
import DatePickerComponent from "../components/datepicker/DatePicker";
import Select from "../components/Select";
import Heading from "../components/Heading";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import SVG from "../components/Icon";
import { Delete } from "../assets";

import { store } from "../redux/reducers";
import { addItem, editItem, deleteItem } from "../requests";
import { State } from "../types";

const HeadingContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DatePickerContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 20px 20px 50px 20px;
  flex-direction: column;
  justify-content: space-around;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 20px;
`;

const IconButtonBox = styled.div`
  display: inline-block;
  position: absolute;
  right: 5px;
  top: 5px;
`;

export const setShowModal = (showModal: boolean, preDataModal?: any) => {
  store.dispatch({
    type: "SET_MODAL_ADD_SPENDING",
    data: { showModal, preDataModal },
  });
};

export const ModalItem = () => {
  const categories = useSelector((state: State) => state?.categories);
  const preDataModal = useSelector((state: State) => state?.preDataModal);
  const userData = useSelector((state: State) => state?.userData);
  const {
    startDate: startDateCalendar,
    endDate: endDateCalendar,
  } = useSelector((state: State) => state.calendarData);
  const { startDate: startDateTable, endDate: endDateTable } = useSelector(
    (state: State) => state?.tableData
  );
  const { startDate: startDateGraphs, endDate: endDateGraphs } = useSelector(
    (state: State) => state?.dataGraphs
  );

  const commonFunctions = {
    setShowModal,
    userData,
    tableDates: { startDate: startDateTable, endDate: endDateTable },
    calendarDates: { startDate: startDateCalendar, endDate: endDateCalendar },
    graphsDates: { startDate: startDateGraphs, endDate: endDateGraphs },
  };

  const {
    summ: preSumm,
    date: preDate,
    category: preCategory,
    comment: preComment,
    id,
    editing,
  } = preDataModal;
  const header = editing ? "Редактирование траты" : "Создание траты";

  const [summ, setSumm] = useState(preSumm);
  const [date, setDate] = useState(preDate);
  const [category, setСategory] = useState(preCategory);
  const [comment, setComment] = useState(preComment);

  const handleChange = useCallback((value) => {
    setDate(value);
  }, []);

  const onSave = () => {
    store.dispatch({
      type: "SET_MODAL_DATA",
      data: { summ, date, category, comment },
    });
    const item = { summ, date, category, comment, id };
    if (editing) {
      editItem({
        item,
        ...commonFunctions,
      });
    } else {
      addItem({
        item,
        ...commonFunctions,
      });
    }
  };

  const onDelete = () => {
    store.dispatch({
      type: "SET_MODAL_DATA",
      data: { summ, date, category, comment },
    });
    deleteItem({ id, ...commonFunctions }).then(() =>
      store.dispatch({
        type: "CLEAR_MODAL_DATA",
      })
    );
  };

  return (
    <ModalWindow>
      <IconButtonBox>
        <IconButton fillColor="gray" onClick={() => setShowModal(false)}>
          <SVG src={Delete} />
        </IconButton>
      </IconButtonBox>

      <HeadingContainer >
        <Heading style={{ paddingTop: "20px" }}>{header}</Heading>

        <DatePickerContainer>
          <Input
            placeholder="Сумма"
            pattern="[0-9]*"
            value={summ}
            onChange={(event) => 
              event.target.validity.valid ? setSumm(event.target.value) : summ
            }
          />
          <div style={{width: "100%"}}>
            <DatePickerComponent startDate={date} onChange={handleChange} />
          </div>
          <Select
            value={category}
            onChange={(event) => setСategory(event.target.value)}
          >
            {categories.map((el: any) => (
              <option value={el.category}>{el.name}</option>
            ))}
          </Select>
          <Input
            placeholder="Комментарий"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </DatePickerContainer>

        <ButtonContainer>
          <Button onClick={onSave}>Сохранить</Button>
          {editing && (
            <Button style={{ marginLeft: "15px" }} onClick={onDelete}>
              Удалить
            </Button>
          )}
        </ButtonContainer>
      </HeadingContainer>
    </ModalWindow>
  );
};

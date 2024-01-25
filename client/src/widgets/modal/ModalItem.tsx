import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { Delete } from "assets";

import { addItem, deleteItem, editItem } from "shared/api";
import { store } from "shared/redux/reducers";
import { State } from "shared/types";
import Button from "shared/ui/Button";
import Heading from "shared/ui/Heading";
import SVG from "shared/ui/Icon";
import IconButton from "shared/ui/IconButton";
import Input from "shared/ui/Input";
import ModalWindow from "shared/ui/ModalWindow";
import Select from "shared/ui/Select";
import DatePickerComponent from "shared/ui/datepicker/DatePicker";

import * as Styled from "./styles";

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
    const { startDate: startDateCalendar, endDate: endDateCalendar } =
        useSelector((state: State) => state.calendarData);
    const { startDate: startDateTable, endDate: endDateTable } = useSelector(
        (state: State) => state?.tableData,
    );
    const { startDate: startDateGraphs, endDate: endDateGraphs } = useSelector(
        (state: State) => state?.dataGraphs,
    );

    const commonFunctions = {
        setShowModal,
        userData,
        tableDates: { startDate: startDateTable, endDate: endDateTable },
        calendarDates: {
            startDate: startDateCalendar,
            endDate: endDateCalendar,
        },
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
    const header = editing ? "Editing a spend" : "Creation of a spend";

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
            }),
        );
    };

    return (
        <ModalWindow>
            <Styled.IconButtonBox>
                <IconButton
                    fillColor='gray'
                    onClick={() => setShowModal(false)}>
                    <SVG src={Delete} />
                </IconButton>
            </Styled.IconButtonBox>

            <Styled.HeadingContainer>
                <Heading style={{ paddingTop: "20px" }}>{header}</Heading>

                <Styled.DatePickerContainer>
                    <Input
                        placeholder='Amount'
                        pattern='[0-9]*'
                        value={summ}
                        onChange={(event) =>
                            event.target.validity.valid
                                ? setSumm(event.target.value)
                                : summ
                        }
                    />
                    <div style={{ width: "100%" }}>
                        <DatePickerComponent
                            startDate={date}
                            onChange={handleChange}
                        />
                    </div>
                    <Select
                        value={category}
                        onChange={(event) => setСategory(event.target.value)}>
                        {categories.map((el: any) => (
                            <option value={el.category}>{el.name}</option>
                        ))}
                    </Select>
                    <Input
                        placeholder='Comment'
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                </Styled.DatePickerContainer>

                <Styled.ButtonContainer>
                    <Button onClick={onSave}>Save</Button>
                    {editing && (
                        <Button
                            style={{ marginLeft: "15px" }}
                            onClick={onDelete}>
                            Delete
                        </Button>
                    )}
                </Styled.ButtonContainer>
            </Styled.HeadingContainer>
        </ModalWindow>
    );
};

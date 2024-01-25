import React from "react";

import { Delete, Edit } from "assets";

import { deleteItem, getDataTableRequest } from "shared/api";
import { getCategoryName, getDataById } from "shared/lib/helpers";
import SVG from "shared/ui/Icon";
import IconButton from "shared/ui/IconButton";

import { setShowModal } from "widgets/modal/ModalItem";

import * as Styled from "../styles";

export const Row = (props: any) => {
    const {
        row,
        categories,
        userData,
        data,
        tableDates,
        calendarDates,
        graphsDates,
    } = props;
    const { category, comment, date, summ, id, color } = row;
    const categoryName = getCategoryName(categories, category);

    const commonFunctions = {
        setShowModal,
        userData,
        tableDates,
        calendarDates,
        graphsDates,
    };

    return (
        <Styled.CustomTr>
            <Styled.CustomTd>{summ}</Styled.CustomTd>
            <Styled.CustomTd>
                {new Date(date).toLocaleDateString()}
            </Styled.CustomTd>
            <Styled.CustomTd style={{ background: color }}>
                {categoryName}
            </Styled.CustomTd>
            <Styled.CustomTd>{comment}</Styled.CustomTd>
            <Styled.CustomTd>
                <IconButton
                    height='22px'
                    width='22px'
                    fillColor='gray'
                    fillColorHover='red'
                    id={`row_id_${id}`}
                    onClick={(e: any) => {
                        const idArray = e.currentTarget.id.split("_");
                        const id = idArray[idArray.length - 1];
                        deleteItem({ id, ...commonFunctions }).then(() =>
                            getDataTableRequest(userData),
                        );
                    }}>
                    <SVG src={Delete} />
                </IconButton>
                <IconButton
                    height='22px'
                    width='22px'
                    fillColor='gray'
                    fillColorHover='palevioletred'
                    id={`row_id_${id}`}
                    onClick={(e: any) => {
                        const idArray = e.currentTarget.id.split("_");
                        const id = idArray[idArray.length - 1];
                        const item = getDataById(id, data);
                        setShowModal(true, { ...item, editing: true });
                    }}>
                    <SVG src={Edit} />
                </IconButton>
            </Styled.CustomTd>
        </Styled.CustomTr>
    );
};

import React, { useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

import { Delete, Edit, Left, LeftDouble, Right, RightDouble } from "../assets";
import DateFilters from "../components/DateFilters";
import SVG from "../components/Icon";
import IconButton from "../components/IconButton";
import Select from "../components/Select";
import { setShowModal } from "../containers/ModalItem";
import { getCategoryName, getDataById } from "../helpers";
import { deleteItem, getDataTableRequest } from "../requests";
import { State } from "../types";

const SettingRowsValues = [5, 10, 20, 30, 50, 100];

const HeaderTable = styled.tr`
    color: palevioletred;
`;

const CustomTh = styled.th`
    color: palevioletred;
    padding: 5px 10px;
`;

const CustomTd = styled.td`
    padding: 5px 10px;
`;

const CustomTr = styled.tr`
    &:hover {
        background: #f4e9ed;
    }
`;

const CustomTable = styled.table`
    width: 100%;
    border: 1px solid gray;
`;

const PaginatorBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid gray;
    border-top: 0;

    padding: 10px;
`;

const PaginationIconButton = styled(IconButton)`
    height: 25px;
    width: 25px;
`;

const FiltersContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 20px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const getRow = (
    row: any,
    categories: any,
    userData: any,
    data: any,
    tableDates: any,
    calendarDates: any,
    graphsDates: any,
) => {
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
        <CustomTr>
            <CustomTd>{summ}</CustomTd>
            <CustomTd>{new Date(date).toLocaleDateString()}</CustomTd>
            <CustomTd style={{ background: color }}>{categoryName}</CustomTd>
            <CustomTd>{comment}</CustomTd>
            <CustomTd>
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
            </CustomTd>
        </CustomTr>
    );
};

const Paginator = ({
    pages,
    currentPage,
    setCurrentPage,
    firstIndex,
    secondIndex,
    totalRows,
}: any) => {
    const next = () => setCurrentPage(currentPage + 1);
    const back = () => setCurrentPage(currentPage - 1);
    const onFisrt = () => setCurrentPage(1);
    const onLast = () => setCurrentPage(pages);

    return (
        <PaginatorBox>
            <div>{`Показаны строки ${
                firstIndex + 1
            }-${secondIndex} из ${totalRows}`}</div>
            <div>
                <PaginationIconButton
                    fillColorHover='palevioletred'
                    onClick={onFisrt}
                    disabled={currentPage == 1}>
                    <SVG src={LeftDouble} />
                </PaginationIconButton>
                <PaginationIconButton
                    fillColorHover='palevioletred'
                    onClick={back}
                    disabled={currentPage == 1}>
                    <SVG src={Left} />
                </PaginationIconButton>
                <PaginationIconButton
                    fillColorHover='palevioletred'
                    onClick={next}
                    disabled={currentPage == pages}>
                    <SVG src={Right} />
                </PaginationIconButton>
                <PaginationIconButton
                    fillColorHover='palevioletred'
                    onClick={onLast}
                    disabled={currentPage == pages}>
                    <SVG src={RightDouble} />
                </PaginationIconButton>
            </div>
        </PaginatorBox>
    );
};

export const Table = () => {
    const categories = useSelector((state: any) => state?.categories);
    const tableData = useSelector((state: any) => state?.tableData);
    const userData = useSelector((state: any) => state?.userData);
    const { startDate: startDateGraphs, endDate: endDateGraphs } = useSelector(
        (state: State) => state?.dataGraphs,
    );
    const { startDate: startDateCalendar, endDate: endDateCalendar } =
        useSelector((state: State) => state.calendarData);
    const { data, startDate, endDate } = tableData;

    const [settingRows, setSettingRows] = useState(SettingRowsValues[0]);
    const pages = Math.ceil(data.length / settingRows);
    const [currentPage, setCurrentPage] = useState(1);
    const totalRows = data.length;
    const firstIndex = currentPage === 1 ? 0 : (currentPage - 1) * settingRows;
    const secondIndex =
        currentPage * settingRows > totalRows
            ? totalRows
            : currentPage * settingRows;

    const dataByPage = data.slice(firstIndex, secondIndex);

    const handleOnSave = ({ startDate, endDate }: any) => {
        getDataTableRequest(userData, {
            startDate,
            endDate,
        });
    };

    return (
        <Container>
            <FiltersContainer>
                <DateFilters
                    startDate={startDate}
                    endDate={endDate}
                    handleOnSave={handleOnSave}
                />
                <div>
                    <Select
                        value={settingRows}
                        onChange={(event) =>
                            setSettingRows(Number(event.target.value))
                        }>
                        {SettingRowsValues.map((el) => (
                            <option value={el}>{el}</option>
                        ))}
                    </Select>
                    <div display='inline-block' pl={10} pt={20}>
                        строк на странице
                    </div>
                </div>
            </FiltersContainer>

            <div>
                <CustomTable>
                    <HeaderTable>
                        <CustomTh>Сумма</CustomTh>
                        <CustomTh>Дата</CustomTh>
                        <CustomTh>Категория</CustomTh>
                        <CustomTh>Комментарий</CustomTh>
                    </HeaderTable>
                    {dataByPage.map((el: any) =>
                        getRow(
                            el,
                            categories,
                            userData,
                            data,
                            { startDate, endDate },
                            {
                                startDate: startDateCalendar,
                                endDate: endDateCalendar,
                            },
                            {
                                startDate: startDateGraphs,
                                endDate: endDateGraphs,
                            },
                        ),
                    )}
                </CustomTable>
                <Paginator
                    pages={pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    firstIndex={firstIndex}
                    secondIndex={secondIndex}
                    totalRows={totalRows}
                />
            </div>
        </Container>
    );
};

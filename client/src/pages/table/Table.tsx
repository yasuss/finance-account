import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getDataTableRequest } from "shared/api";
import { State } from "shared/types";
import Select from "shared/ui/Select";

import { DateFilters } from "entities/date-filters";

import { Paginator } from "./components/Paginator";
import { Row } from "./components/Row";
import * as Styled from "./styles";

const SettingRowsValues = [5, 10, 20, 30, 50, 100];

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
        <Styled.Container>
            <Styled.FiltersContainer>
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
                    <div
                        style={{
                            display: "inline-block",
                            paddingLeft: "10px",
                            paddingTop: "20px",
                        }}>
                        lines per page
                    </div>
                </div>
            </Styled.FiltersContainer>

            <div>
                <Styled.CustomTable>
                    <Styled.HeaderTable>
                        <Styled.CustomTh>Amount</Styled.CustomTh>
                        <Styled.CustomTh>Date</Styled.CustomTh>
                        <Styled.CustomTh>Category</Styled.CustomTh>
                        <Styled.CustomTh>Commentary</Styled.CustomTh>
                    </Styled.HeaderTable>
                    {dataByPage.map((el: any) => (
                        <Row
                            row={el}
                            categories={categories}
                            userData={userData}
                            data={data}
                            tableDates={{ startDate, endDate }}
                            calendarDates={{
                                startDate: startDateCalendar,
                                endDate: endDateCalendar,
                            }}
                            graphsDates={{
                                startDate: startDateGraphs,
                                endDate: endDateGraphs,
                            }}
                        />
                    ))}
                </Styled.CustomTable>
                <Paginator
                    pages={pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    firstIndex={firstIndex}
                    secondIndex={secondIndex}
                    totalRows={totalRows}
                />
            </div>
        </Styled.Container>
    );
};

import React from "react";
import { useSelector } from "react-redux";

import { PieChart } from "@mui/x-charts/PieChart";

import { getDataByCategoryRequest } from "shared/api";
import { makeSumm } from "shared/lib/helpers";
import { State } from "shared/types";

import { DateFilters } from "entities/date-filters";

import * as Styled from "./styles";

export const Graphs = () => {
    const dataGraphs = useSelector((state: State) => state.dataGraphs);
    const userData = useSelector((state: State) => state?.userData);

    const { data, totalSumm, startDate, endDate } = dataGraphs;

    const handleOnSave = ({ startDate, endDate }: any) => {
        getDataByCategoryRequest(userData, {
            startDate,
            endDate,
        });
    };

    return (
        <Styled.Container>
            <DateFilters
                startDate={startDate}
                endDate={endDate}
                handleOnSave={handleOnSave}
            />
            <span>Expenses: {makeSumm(totalSumm)}</span>
            <Styled.ChartContainer>
                {data?.length != 0 ? (
                    <PieChart
                        width={500}
                        height={300}
                        series={[
                            {
                                data: data,
                                highlightScope: {
                                    faded: "global",
                                    highlighted: "item",
                                },
                            },
                        ]}
                    />
                ) : null}
            </Styled.ChartContainer>
        </Styled.Container>
    );
};

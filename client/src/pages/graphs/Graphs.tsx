import React from "react";
import { useSelector } from "react-redux";

import { PieChart } from "@mui/x-charts/PieChart";

import { getDataByCategoryRequest } from "shared/api";
import { makeSumm } from "shared/lib/helpers";
import { State } from "shared/types";
import ColorBlock from "shared/ui/ColorBlock";

import { DateFilters } from "entities/date-filters";

import * as Styled from "./styles";

const Legends = ({ items }: any) => {
    return (
        <table width='100%' style={{ paddingTop: 30 }}>
            {items.map((item: any) => (
                <tr>
                    <Styled.CustomTd>
                        <ColorBlock width={10} height={10} color={item.color} />
                    </Styled.CustomTd>
                    <Styled.CustomTd>{item.title}</Styled.CustomTd>
                    <Styled.CustomTd>{item.percent}%</Styled.CustomTd>
                    <Styled.CustomTd float='right'>
                        {makeSumm(item.summ)}
                    </Styled.CustomTd>
                </tr>
            ))}
        </table>
    );
};

export const Graphs = () => {
    const dataGraphs = useSelector((state: State) => state.dataGraphs);
    const userData = useSelector((state: State) => state?.userData);

    const { data, totalSumm, startDate, endDate } = dataGraphs;
    const legendsItems = data.map((el: any) => ({
        title: el.label,
        strokeWidth: 10,
        category: el.category,
        color: el.color,
        summ: el.summ,
        percent: el.angle,
    }));

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
                    <PieChart width={300} height={300} series={data} />
                ) : null}
                {/* <RadialChart
          colorType={"literal"}
          colorDomain={[0, 100]}
          colorRange={[0, 10]}
          data={data}
          width={300}
          height={300}
        /> */}
                <Legends items={legendsItems} />
            </Styled.ChartContainer>
        </Styled.Container>
    );
};

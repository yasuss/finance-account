import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

import ColorBlock from "../components/ColorBlock";
import DateFilters from "../components/DateFilters";
import { makeSumm } from "../helpers";
import { getDataByCategoryRequest } from "../requests";
import { State } from "../types";

const CustomTd = styled.td<{ float?: string }>`
    padding: 5px 0;

    ${({ float }) => (float ? `float: ${float}` : "")}
`;

const Container = styled.div`
    padding: 0 30px 30px 30px;
    flex-direction: column;
    align-items: center;
`;

const ChartContainer = styled.div`
    display: flex;
    width: 400px;
    flex-direction: column;
    align-items: center;
`;

const Legends = ({ items }: any) => {
    return (
        <table width='100%' style={{ paddingTop: 30 }}>
            {items.map((item: any) => (
                <tr>
                    <CustomTd>
                        <ColorBlock width={10} height={10} color={item.color} />
                    </CustomTd>
                    <CustomTd>{item.title}</CustomTd>
                    <CustomTd>{item.percent}%</CustomTd>
                    <CustomTd float='right'>{makeSumm(item.summ)}</CustomTd>
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
        <Container>
            <DateFilters
                startDate={startDate}
                endDate={endDate}
                handleOnSave={handleOnSave}
            />
            <span>Расходы: {makeSumm(totalSumm)}</span>
            <ChartContainer>
                {/* <RadialChart
          colorType={"literal"}
          colorDomain={[0, 100]}
          colorRange={[0, 10]}
          data={data}
          width={300}
          height={300}
        /> */}
                <Legends items={legendsItems} />
            </ChartContainer>
        </Container>
    );
};

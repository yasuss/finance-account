import { useSelector } from "react-redux";
import { RadialChart } from "react-vis";
import { Flex } from "reflexbox";
import styled from "styled-components";

import { State } from "../redux/types";
import ColorBlock from "../components/ColorBlock";
import DateFilters from "../components/DateFilters";
import { makeSumm } from "../helpers";
import { getDataByCategoryRequest } from "../requests";

const CustomTd = styled.td<{ float?: string }>`
  padding: 5px 0;

  ${({ float }) => (float ? `float: ${float}` : "")}
`;

const Legends = ({ items }: any) => {
  return (
    <table width="100%" style={{ paddingTop: 30 }}>
      {items.map((item: any) => (
        <tr>
          <CustomTd>
            <ColorBlock width={10} height={10} color={item.color} />
          </CustomTd>
          <CustomTd>{item.title}</CustomTd>
          <CustomTd>{item.percent}%</CustomTd>
          <CustomTd float="right">{makeSumm(item.summ)}</CustomTd>
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
    <Flex pt={30} pl={20} pr={20} flexDirection="column" alignItems="center">
      <DateFilters
        startDate={startDate}
        endDate={endDate}
        handleOnSave={handleOnSave}
      />
      <span>Расходы: {makeSumm(totalSumm)}</span>
      <Flex width={400} flexDirection="column" alignItems="center">
        <RadialChart
          colorType={"literal"}
          colorDomain={[0, 100]}
          colorRange={[0, 10]}
          data={data}
          width={300}
          height={300}
        />
        <Legends items={legendsItems} />
      </Flex>
    </Flex>
  );
};

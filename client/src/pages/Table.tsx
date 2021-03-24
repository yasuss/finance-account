import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Flex, Box } from "reflexbox";

import { State } from "../types";
import IconButton from "../components/IconButton";
import SVG from "../components/Icon";
import Select from "../components/Select";
import DateFilters from "../components/DateFilters";
import { Delete, Edit, Right, RightDouble, Left, LeftDouble } from "../assets";
import { deleteItem, getDataTableRequest } from "../requests";
import { getCategoryName, getDataById } from "../helpers";
import { setShowModal } from "../containers/ModalItem";

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

  margin-top: 20px;
`;

const PaginatorBox = styled(Flex)`
  border: 1px solid gray;
  border-top: 0;

  padding: 10px;
`;

const PaginationIconButton = styled(IconButton)`
  height: 25px;
  width: 25px;
`;

const getRow = (
  row: any,
  categories: any,
  userData: any,
  data: any,
  tableDates: any,
  calendarDates: any,
  graphsDates: any
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
          height="22px"
          width="22px"
          fillColor="gray"
          fillColorHover="red"
          id={`row_id_${id}`}
          onClick={(e: any) => {
            const idArray = e.currentTarget.id.split("_");
            const id = idArray[idArray.length - 1];
            deleteItem({ id, ...commonFunctions }).then(() =>
              getDataTableRequest(userData)
            );
          }}
        >
          <SVG src={Delete} />
        </IconButton>
        <IconButton
          height="22px"
          width="22px"
          fillColor="gray"
          fillColorHover="palevioletred"
          id={`row_id_${id}`}
          onClick={(e: any) => {
            const idArray = e.currentTarget.id.split("_");
            const id = idArray[idArray.length - 1];
            const item = getDataById(id, data);
            setShowModal(true, { ...item, editing: true });
          }}
        >
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
    <PaginatorBox alignItems="center" justifyContent="space-between">
      <Box>{`Показаны строки ${
        firstIndex + 1
      }-${secondIndex} из ${totalRows}`}</Box>
      <Box>
        <PaginationIconButton
          fillColorHover="palevioletred"
          onClick={onFisrt}
          disabled={currentPage == 1}
        >
          <SVG src={LeftDouble} />
        </PaginationIconButton>
        <PaginationIconButton
          fillColorHover="palevioletred"
          onClick={back}
          disabled={currentPage == 1}
        >
          <SVG src={Left} />
        </PaginationIconButton>
        <PaginationIconButton
          fillColorHover="palevioletred"
          onClick={next}
          disabled={currentPage == pages}
        >
          <SVG src={Right} />
        </PaginationIconButton>
        <PaginationIconButton
          fillColorHover="palevioletred"
          onClick={onLast}
          disabled={currentPage == pages}
        >
          <SVG src={RightDouble} />
        </PaginationIconButton>
      </Box>
    </PaginatorBox>
  );
};

export const Table = () => {
  const categories = useSelector((state: any) => state?.categories);
  const tableData = useSelector((state: any) => state?.tableData);
  const userData = useSelector((state: any) => state?.userData);
  const { startDate: startDateGraphs, endDate: endDateGraphs } = useSelector(
    (state: State) => state?.dataGraphs
  );
  const {
    startDate: startDateCalendar,
    endDate: endDateCalendar,
  } = useSelector((state: State) => state.calendarData);
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
    <Box>
      <Flex flexDirection="column" pt={20}>
        <DateFilters
          startDate={startDate}
          endDate={endDate}
          handleOnSave={handleOnSave}
        />
        <Box>
          <Select
            value={settingRows}
            onChange={(event) => setSettingRows(Number(event.target.value))}
          >
            {SettingRowsValues.map((el) => (
              <option value={el}>{el}</option>
            ))}
          </Select>
          <Box display="inline-block" pl={10} pt={20}>
            строк на странице
          </Box>
        </Box>
      </Flex>
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
            { startDate: startDateCalendar, endDate: endDateCalendar },
            { startDate: startDateGraphs, endDate: endDateGraphs }
          )
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
    </Box>
  );
};

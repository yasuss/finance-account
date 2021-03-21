import { useSelector } from "react-redux";
import styled from "styled-components";
import { Flex, Box } from "reflexbox";
import ReactTooltip from "react-tooltip";

import Heading from "../components/Heading";
import Paragraph from "../components/Paragraph";
import ColorBlock from "../components/ColorBlock";
import { State } from "../redux/types";

const LegendItem = styled.div`
  display: flex;

  padding: 5px 0;
`;

const StyleHeading = styled(Heading)`
  padding: 20px 0;
`;

const DecriptionBox = () => {
  return (
    <Box pt={20} pr={30} flexShrink={15}>
      <Box data-tip="Hello">
        С помощью данного сервиса можно учитывать свои траты.
      </Box>
      <Box pt={20}>
        Во вкладке "Учет" можно увидеть свои траты в виде таблицы. Для удобства
        расчета, воспользуйтесь выбором периода. Траты можно редактировать или
        удалить с помощью кнопок в правой части таблицы.
      </Box>
      <Box pt={20}>
        Во вкладке "Календарь" вы увидете свои траты в виде заметок в календаре.
        Их можно редактировать с помощью щелчка по заметке. Если щелкнуть на
        саму дату, можно добавить новую трату. Также заметки можно перетаскивать
        с одной даты на другую.
      </Box>
      <Box pt={20}>
        Во вкладке "Графики" можно построить график за нужный период. Данные
        будут отображаться в виде круговой диаграммы с пометками по каждой
        категории.
      </Box>
      <Box pt={20}>
        В верхней части приложения есть знак "+". При клике на него открывается
        форма создания траты.
      </Box>
      <Box pt={20}>
        Справа выведен список категорий. У каждой категории есть свой цвет. Эти
        цвета используются во всех типах отчетов.
      </Box>
      <Box pt={100}>Вперед, считать свои расходы!</Box>
    </Box>
  );
};

const CategoriestList = ({ categories }: any) => {
  return (
    <Box flexShrink={1}>
      <Paragraph>Список категорий</Paragraph>
      <div style={{ paddingTop: 10 }}>
        {categories.map((el: any) => (
          <LegendItem>
            <ColorBlock color={el.color} />
            <span>{el.name}</span>
          </LegendItem>
        ))}
      </div>
    </Box>
  );
};

export const Info = () => {
  const categories = useSelector((state: State) => state?.categories);
  const userData = useSelector((state: State) => state?.userData);
  const { username } = userData;

  return (
    <Flex flexDirection="column" pg={30} pl={20}>
      <ReactTooltip />

      <StyleHeading>Добро пожаловать, {username}</StyleHeading>
      <Flex justifyContent="space-between">
        <DecriptionBox />
        <CategoriestList categories={categories} />
      </Flex>
    </Flex>
  );
};

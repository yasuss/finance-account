import { useSelector } from "react-redux";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

import Heading from "../components/Heading";
import Paragraph from "../components/Paragraph";
import ColorBlock from "../components/ColorBlock";
import { State } from "../types";

const LegendItem = styled.div`
  display: flex;

  padding: 5px 0;
`;

const StyleHeading = styled(Heading)`
  padding: 20px 0;
`;

const TextPadding = styled.div<{pt: number}>`
  padding-top: ${({pt}) => `${pt}px`};
`;

const Container = styled.div`
  display: flex;
  flex-shrink: 15;
  padding-top: 20px;
  padding-right: 30px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

const CategoriesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DecriptionBox = () => {
  return (
    <Container pt={20} pr={30} flexShrink={15}>
      <div>
        С помощью данного сервиса можно учитывать свои траты.
      </div>
      <TextPadding pt={20}>
        Во вкладке "Учет" можно увидеть свои траты в виде таблицы. Для удобства
        расчета, воспользуйтесь выбором периода. Траты можно редактировать или
        удалить с помощью кнопок в правой части таблицы.
      </TextPadding>
      <TextPadding pt={20}>
        Во вкладке "Календарь" вы увидете свои траты в виде заметок в календаре.
        Их можно редактировать с помощью щелчка по заметке. Если щелкнуть на
        саму дату, можно добавить новую трату. Также заметки можно перетаскивать
        с одной даты на другую.
      </TextPadding>
      <TextPadding pt={20}>
        Во вкладке "Графики" можно построить график за нужный период. Данные
        будут отображаться в виде круговой диаграммы с пометками по каждой
        категории.
      </TextPadding>
      <TextPadding pt={20}>
        В верхней части приложения есть знак "+". При клике на него открывается
        форма создания траты.
      </TextPadding>
      <TextPadding pt={20}>
        Справа выведен список категорий. У каждой категории есть свой цвет. Эти
        цвета используются во всех типах отчетов.
      </TextPadding>
      <TextPadding pt={100}>Вперед, считать свои расходы!</TextPadding>
    </Container>
  );
};

const CategoriestList = ({ categories }: any) => {
  return (
    <div>
      <Paragraph>Список категорий</Paragraph>
      <div style={{ paddingTop: 10 }}>
        {categories.map((el: any) => (
          <LegendItem>
            <ColorBlock color={el.color} />
            <span>{el.name}</span>
          </LegendItem>
        ))}
      </div>
    </div>
  );
};

export const Info = () => {
  const categories = useSelector((state: State) => state?.categories);
  const userData = useSelector((state: State) => state?.userData);
  const { username } = userData;

  return (
    <InfoContainer>
      <ReactTooltip />

      <StyleHeading>Добро пожаловать, {username}</StyleHeading>

      <CategoriesContainer>
        <DecriptionBox />
        <CategoriestList categories={categories} />
      </CategoriesContainer>
    </InfoContainer>
  );
};

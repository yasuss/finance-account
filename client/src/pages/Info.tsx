import React from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";

import styled from "styled-components";

import ColorBlock from "../components/ColorBlock";
import Heading from "../components/Heading";
import Paragraph from "../components/Paragraph";
import { State } from "../types";

const LegendItem = styled.div`
    display: flex;

    padding: 5px 0;
`;

const StyleHeading = styled(Heading)`
    padding: 20px 0;
`;

const TextPadding = styled.div<{ pt: number }>`
    padding-top: ${({ pt }) => `${pt}px`};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
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
        <Container>
            <div>
                With the help of this service, you can account for your
                spending.
            </div>
            <TextPadding pt={20}>
                In the Accounting tab, you can see your spending in a table
                view. For for convenient calculation, use the period selection.
                You can edit or delete them using the buttons in the right part
                of the table. of the table.
            </TextPadding>
            <TextPadding pt={20}>
                In the Calendar tab, you'll see your spending as notes on a on
                the calendar. You can edit them by clicking on the note. If you
                click on the date itself, you can add a new expense. Also you
                can drag and drop notes from one date to another.
            </TextPadding>
            <TextPadding pt={20}>
                In the "Graphs" tab you can plot a graph for the required
                period. The data will be displayed in the form of a pie chart
                with labels for each category.
            </TextPadding>
            <TextPadding pt={20}>
                There is a "+" sign at the top of the app. When you click on it
                opens the form for creating a spend.
            </TextPadding>
            <TextPadding pt={20}>
                A list of categories is displayed on the right. Each category
                has a different color. These colors are used in all types of
                reports.
            </TextPadding>
            <TextPadding pt={100}>
                Go ahead and count your expenses!
            </TextPadding>
        </Container>
    );
};

const CategoriestList = ({ categories }: any) => {
    return (
        <div>
            <Paragraph>Сategories</Paragraph>
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

            <StyleHeading>Welcome, {username}</StyleHeading>

            <CategoriesContainer>
                <DecriptionBox />
                <CategoriestList categories={categories} />
            </CategoriesContainer>
        </InfoContainer>
    );
};

import React from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";

import { State } from "shared/types";
import ColorBlock from "shared/ui/ColorBlock";
import Paragraph from "shared/ui/Paragraph";

import * as Styled from "./styles";

const DecriptionBox = () => {
    return (
        <Styled.Container>
            <div>
                With the help of this service, you can account for your
                spending.
            </div>
            <Styled.TextPadding pt={20}>
                In the Accounting tab, you can see your spending in a table
                view. For for convenient calculation, use the period selection.
                You can edit or delete them using the buttons in the right part
                of the table. of the table.
            </Styled.TextPadding>
            <Styled.TextPadding pt={20}>
                In the Calendar tab, you'll see your spending as notes on a on
                the calendar. You can edit them by clicking on the note. If you
                click on the date itself, you can add a new expense. Also you
                can drag and drop notes from one date to another.
            </Styled.TextPadding>
            <Styled.TextPadding pt={20}>
                In the "Graphs" tab you can plot a graph for the required
                period. The data will be displayed in the form of a pie chart
                with labels for each category.
            </Styled.TextPadding>
            <Styled.TextPadding pt={20}>
                There is a "+" sign at the top of the app. When you click on it
                opens the form for creating a spend.
            </Styled.TextPadding>
            <Styled.TextPadding pt={20}>
                A list of categories is displayed on the right. Each category
                has a different color. These colors are used in all types of
                reports.
            </Styled.TextPadding>
            <Styled.TextPadding pt={100}>
                Go ahead and count your expenses!
            </Styled.TextPadding>
        </Styled.Container>
    );
};

const CategoriestList = ({ categories }: any) => {
    return (
        <div>
            <Paragraph>Сategories</Paragraph>
            <div style={{ paddingTop: 10 }}>
                {categories.map((el: any) => (
                    <Styled.LegendItem>
                        <ColorBlock color={el.color} />
                        <span>{el.name}</span>
                    </Styled.LegendItem>
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
        <Styled.InfoContainer>
            <ReactTooltip />

            <Styled.StyleHeading>Welcome, {username}</Styled.StyleHeading>

            <Styled.CategoriesContainer>
                <DecriptionBox />
                <CategoriestList categories={categories} />
            </Styled.CategoriesContainer>
        </Styled.InfoContainer>
    );
};

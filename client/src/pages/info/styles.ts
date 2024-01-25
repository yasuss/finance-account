import styled from "styled-components";

import Heading from "shared/ui/Heading";

export const LegendItem = styled.div`
    display: flex;

    padding: 5px 0;
`;

export const StyleHeading = styled(Heading)`
    padding: 20px 0;
`;

export const TextPadding = styled.div<{ pt: number }>`
    padding-top: ${({ pt }) => `${pt}px`};
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 15;
    padding-top: 20px;
    padding-right: 30px;
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
`;

export const CategoriesContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

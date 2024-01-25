import styled from "styled-components";

export const CustomTd = styled.td<{ float?: string }>`
    padding: 5px 0;

    ${({ float }) => (float ? `float: ${float}` : "")}
`;

export const Container = styled.div`
    padding: 0 30px 30px 30px;
    flex-direction: column;
    align-items: center;
`;

export const ChartContainer = styled.div`
    display: flex;
    width: 400px;
    flex-direction: column;
    align-items: center;
`;
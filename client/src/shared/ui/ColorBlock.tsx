import styled from "styled-components";

type ColorBlockType = {
    color: string;
    height?: number;
    width?: number;
};

const ColorBlock = styled.div<ColorBlockType>`
    display: inline-block;
    height: ${({ height }) => (height ? `${height}px` : "20px")};
    width: ${({ width }) => (width ? `${width}px` : "20px")};

    background: ${({ color }) => color};
    margin-right: 10px;
`;

export default ColorBlock;

import styled from "styled-components";

type Type = {
    height?: string;
    width?: string;
    primary?: boolean;
    fillColor?: string;
    fillColorHover?: string;
    disabled?: boolean;
};

const IconButton = styled.button<Type>`
    height: ${({ height }) => (height ? height : "30px")};
    width: ${({ width }) => (width ? width : "30px")};
    background: none;
    border: none;
    outline: none;
    ${({ disabled }) => (disabled ? "" : "cursor: pointer;")}
    vertical-align: middle;

    &:hover {
        > svg {
            fill: ${({ fillColorHover, fillColor, disabled }) =>
                disabled ? fillColor : fillColorHover};
        }
    }

    svg {
        fill: ${({ fillColor, disabled }) =>
            disabled ? "#CCCCCC" : fillColor};
    }
`;

export default IconButton;

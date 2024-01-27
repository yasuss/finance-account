import { grey, teal } from "@mui/material/colors";
import styled from "styled-components";

const Tab = styled.button<{ selected?: boolean }>`
    height: 100%;

    font-size: 1.2em;
    padding: 0.25em 1em;
    border: none;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    cursor: pointer;

    background: ${(props) => (props.selected ? "white" : grey[200])};
    color: ${teal[500]};
    font-weight: bold;

    &:hover {
        color: ${teal[600]};
    }

    &:focus {
        outline: none;
    }

    transform: ${({ selected }) => (selected ? `scale(1.1, 1.1)` : "")};
`;

export default Tab;

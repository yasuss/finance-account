import { teal } from "@mui/material/colors";
import styled from "styled-components";

import { HEADER_SIZE } from "shared/constants/header";

export const Container = styled.div`
    height: ${HEADER_SIZE};

    display: flex;
    justify-content: space-around;
    top: 0;

    padding: 0 20px;

    background: ${teal[700]};
`;

export const Menu = styled.div`
    height: calc(${HEADER_SIZE} - 20px);
    display: flex;

    align-self: flex-end;

    gap: 10px;
`;

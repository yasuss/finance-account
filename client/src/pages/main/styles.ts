import styled from "styled-components";

import { HEADER_SIZE } from "shared/constants/header";

export const ContentContainer = styled.div`
    height: calc(100% - ${HEADER_SIZE});
    max-width: 800px;
    margin: 0 auto;
    padding-top: 20px;
`;

export const Container = styled.div`
    height: 100vh;
`;

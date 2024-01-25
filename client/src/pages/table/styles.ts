import styled from "styled-components";

import IconButton from "shared/ui/IconButton";

export const HeaderTable = styled.tr`
    color: palevioletred;
`;

export const CustomTh = styled.th`
    color: palevioletred;
    padding: 5px 10px;
`;

export const CustomTd = styled.td`
    padding: 5px 10px;
`;

export const CustomTr = styled.tr`
    &:hover {
        background: #f4e9ed;
    }
`;

export const CustomTable = styled.table`
    width: 100%;
    border: 1px solid gray;
`;

export const PaginatorBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid gray;
    border-top: 0;

    padding: 10px;
`;

export const PaginationIconButton = styled(IconButton)`
    height: 25px;
    width: 25px;
`;

export const FiltersContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 20px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

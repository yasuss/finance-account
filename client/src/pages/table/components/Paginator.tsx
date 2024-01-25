import React from "react";

import { Left, LeftDouble, Right, RightDouble } from "assets";

import SVG from "shared/ui/Icon";

import * as Styled from "../styles";

export const Paginator = ({
    pages,
    currentPage,
    setCurrentPage,
    firstIndex,
    secondIndex,
    totalRows,
}: any) => {
    const next = () => setCurrentPage(currentPage + 1);
    const back = () => setCurrentPage(currentPage - 1);
    const onFisrt = () => setCurrentPage(1);
    const onLast = () => setCurrentPage(pages);

    return (
        <Styled.PaginatorBox>
            <div>{`Shown are rows ${
                firstIndex + 1
            }-${secondIndex} of ${totalRows}`}</div>
            <div>
                <Styled.PaginationIconButton
                    fillColorHover='palevioletred'
                    onClick={onFisrt}
                    disabled={currentPage == 1}>
                    <SVG src={LeftDouble} />
                </Styled.PaginationIconButton>
                <Styled.PaginationIconButton
                    fillColorHover='palevioletred'
                    onClick={back}
                    disabled={currentPage == 1}>
                    <SVG src={Left} />
                </Styled.PaginationIconButton>
                <Styled.PaginationIconButton
                    fillColorHover='palevioletred'
                    onClick={next}
                    disabled={currentPage == pages}>
                    <SVG src={Right} />
                </Styled.PaginationIconButton>
                <Styled.PaginationIconButton
                    fillColorHover='palevioletred'
                    onClick={onLast}
                    disabled={currentPage == pages}>
                    <SVG src={RightDouble} />
                </Styled.PaginationIconButton>
            </div>
        </Styled.PaginatorBox>
    );
};

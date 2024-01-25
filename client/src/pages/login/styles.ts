import styled from "styled-components";

export const PageBox = styled.div`
    display: flex;
    height: 100vh;
`;

export const Modal = styled.div`
    height: 450px;
    width: 400px;
    padding: 0 15px;
    margin: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    border: 1px solid palevioletred;
    border-radius: 4px;
`;

export const InputBox = styled.div<{ height?: string }>`
    height: ${({ height }) => height || "80px"};

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const ErrorMessage = styled.div`
    height: 18px;
    color: red;
    padding-left: 10px;
`;
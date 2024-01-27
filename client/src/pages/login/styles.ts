import { teal } from "@mui/material/colors";
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

    border: 1px solid ${teal[500]};
    border-radius: 4px;
`;

export const InputBox = styled.div<{ height?: string }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;
`;

export const ErrorMessage = styled.div`
    height: 18px;
    color: red;
    padding-left: 10px;
`;

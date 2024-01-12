import styled from "styled-components";

const TextButton = styled.button<{ primary?: boolean }>`
    height: 30px;

    background: none;
    color: palevioletred;
    border: none;

    font-size: 1em;
    padding: 0.25em 1em;
    cursor: pointer;

    &:hover {
        color: #af5a76;
    }
`;

export default TextButton;

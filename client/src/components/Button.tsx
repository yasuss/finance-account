import styled from "styled-components";

const Button = styled.button<{ primary?: boolean }>`
    height: 30px;

    background: ${(props) => (props.primary ? "palevioletred" : "white")};
    color: ${(props) => (props.primary ? "white" : "palevioletred")};

    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
        background: ${(props) => (props.primary ? "#AF5A76" : "#F4E9ED")};
    }
`;

export default Button;

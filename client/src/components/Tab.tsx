import styled from "styled-components";

const Tab = styled.button<{ selected?: boolean }>`
  height: 100%;

  font-size: 1.2em;
  padding: 0.25em 1em;
  border: none;
  cursor: pointer;

  background: ${(props) => (props.selected ? "white" : "#F4E9ED")};
  color: palevioletred;
  font-weight: bold;

  &:hover {
    color: ${(props) => (props.selected ? "#AF5A76" : "#AF5A76")};
  }

  &:focus {
    outline: none;
  }

  ${({ selected }) =>
    selected
      ? `
        height: 103%;
        margin: 0px 4px;
        bottom: 1px;
        position: relative;
      `
      : ``}
`;

export default Tab;

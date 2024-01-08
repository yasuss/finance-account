import React, { useCallback } from "react";
import styled from "styled-components";

import Paragraph from "../components/Paragraph";
import { checkIcon } from "../assets";

type TypeCheckbox = {
  value: any;
  onChange?: any;
  checked?: boolean;
  label?: string;
};

type CheckboxBaseProps = {
  checked?: boolean;
  disabled?: boolean;
  hasError?: boolean;
};

const SpanBox = styled.div`
  display: inline-block;
  margin-right: 10px;
`;

export const InvisibleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const CustomSpan = styled.span<{
  checked: boolean;
  disabled?: boolean;
  hasError?: boolean;
}>`
  display: inline-block;
  position: absolute;
  margin: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  border: 1px solid palevioletred;
  background: ${({ checked }) => (checked ? "palevioletred" : "white")};
  transition: background 0.25s ease-in-out;
  border-radius: 2px;

  ::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 11px;
    background: url(${checkIcon}) no-repeat center;
    opacity: ${({ checked }) => (checked ? 1 : 0)};
    transform: translate(-50%, -50%);
  }
`;

const CheckboxWrapper = styled.div<CheckboxBaseProps>`
  display: flex;
  box-sizing: content-box;

  :hover > input::before {
    background-color: ${({ checked }) => (checked ? "palevioletred" : "white")};
  }
`;

const Container = styled.label`
  position: relative;
  display: inline-block;
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
`;

const CheckboxLabel = styled.label`
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
`;

const Checkbox: React.FC<TypeCheckbox> = ({
  value,
  onChange,
  checked = false,
  label,
}) => {
  const handlerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const check = e.target.checked;
      onChange(!!check, value);
    },
    [onChange, value]
  );

  const renderLabel = label && (
    <CheckboxLabel htmlFor={value}>
      <Paragraph>{label}</Paragraph>
    </CheckboxLabel>
  );

  return (
    <CheckboxWrapper>
      {renderLabel}
      <Container>
        <InvisibleInput
          type="checkbox"
          onChange={handlerChange}
          checked={checked}
          value={value}
          name={label}
          id={value}
        />
        <CustomSpan checked={checked} />
      </Container>
    </CheckboxWrapper>
  );
};

export default Checkbox;

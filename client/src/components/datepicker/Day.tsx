import React from "react";
import { ReactDatePickerProps } from "react-datepicker";
import styled from "styled-components";

type CustomDay = ReactDatePickerProps["renderDayContents"];

export const Item = styled.p`
  font-size: 15px;
`;

const Day: CustomDay = (dayOfMonth) => (
  <Item>{dayOfMonth.toString().padStart(2, "0")}</Item>
);

export default Day;

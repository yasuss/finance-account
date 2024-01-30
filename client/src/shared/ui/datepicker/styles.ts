import styled from "styled-components";
import { teal } from "@mui/material/colors";

export const DatePickerWrapper = styled.div`
    display: inline-block;
    .react-datepicker-wrapper {
        width: 100%;
    }
    .react-datepicker__day {
        color: ${teal[500]};
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--keyboard-selected {
        background-color: ${teal[500]};
        color: white;
    }
`;
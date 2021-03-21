import { useState } from "react";
import { Flex, Box } from "reflexbox";

import DatePickerComponent from "../components/datepicker/DatePicker";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

const DateFilters = ({ startDate, endDate, handleOnSave }: any) => {
  const [startDateLocal, setStartDateLocal] = useState(startDate);
  const [endDateLocal, setEndDateLocal] = useState(endDate);

  return (
    <Box width={600} pb={20}>
      <Box pb={10}>
        <Paragraph>Расход за период</Paragraph>
      </Box>
      <Flex justifyContent="space-between">
        <Box>
          <span>С:</span>
          <DatePickerComponent
            startDate={startDateLocal}
            onChange={setStartDateLocal}
          />
        </Box>
        <Box>
          <span>По:</span>
          <DatePickerComponent
            startDate={endDateLocal}
            onChange={setEndDateLocal}
          />
        </Box>
        <Button
          onClick={() =>
            handleOnSave({ startDate: startDateLocal, endDate: endDateLocal })
          }
        >
          Показать
        </Button>
      </Flex>
    </Box>
  );
};

export default DateFilters;

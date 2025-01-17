import styled from "@emotion/styled";
import { ToggleButtonGroup, ToggleButton, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

const DAYS = [
    {
        key: "sunday",
        label: "S"
    },
    {
        key: "monday",
        label: "M"
    },
    {
        key: "tuesday",
        label: "T"
    },
    {
        key: "wednesday",
        label: "W"
    },
    {
        key: "thursday",
        label: "T"
    },
    {
        key: "friday",
        label: "F"
    },
    {
        key: "saturday",
        label: "S"
    }
];

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  margin-top: 8px;
  padding: 0;
  display: flex;
  justify-content: start;

  & .MuiToggleButtonGroup-grouped:not(:first-of-type) {
    border: 4px solid #692B7C;
    border-radius: 50%;
  }

  & .MuiToggleButtonGroup-grouped:first-of-type {
    border: 5px solid #692B7C;
    border-radius: 50%;
  }
`;

const StyledToggle = styled(ToggleButton)`
  color: #692B7C;

  &.Mui-selected {
    color: white;
    background: #692B7C;
  }

  &:hover {
    border-color: #BA9BC3;
    background: #BA9BC3;
  }

  &.Mui-selected:hover {
    border-color: #BA9BC3;
    background: #BA9BC3;
  }

  min-width: 32px;
  max-width: 32px;
  height: 32px;
  text-transform: unset;
  font-size: 0.75rem;
`;

interface ToggleDaysProps {
    days: number[]
    setDays: Dispatch<SetStateAction<number[]>>
}
const ToggleDays = ({ days, setDays }: ToggleDaysProps) => {

    // console.log({ days })
    const handleToggle = (value: number) => {
        const newDays = days.includes(value)
            ? days.filter(day => day !== value)
            : [...days, value];

        setDays(newDays);
    };

    return (
        <div>
            <Typography>Opening Days of the Week</Typography>
            <StyledToggleButtonGroup
                size="small"
                aria-label="Days of the week"
                value={days}
                onChange={(_, newDays) => newDays && setDays(newDays)}
            >
                {DAYS.map((day, index) => (
                    <StyledToggle
                        key={day.key}
                        value={index}
                        aria-label={day.key}
                        onClick={() => handleToggle(index)}
                    >
                        {day.label}
                    </StyledToggle>
                ))}
            </StyledToggleButtonGroup>
        </div>
    );
};

export default ToggleDays;

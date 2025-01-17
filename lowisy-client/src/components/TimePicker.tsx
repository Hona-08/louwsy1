import React, { useState } from 'react';
import { LocalizationProvider, TimePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function SetTimePicker() {
    const [startTime, setStartTime] = useState(new Date('1970-01-01T06:00:00'));
    const [endTime, setEndTime] = useState(new Date('1970-01-01T12:00:00'));

    const handleStartTimeChange = (newTime: any) => {
        setStartTime(newTime);
    };

    const handleEndTimeChange = (newTime: any) => {
        setEndTime(newTime);
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                    label="Start Time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                    label="End Time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
    );
}

export default SetTimePicker;

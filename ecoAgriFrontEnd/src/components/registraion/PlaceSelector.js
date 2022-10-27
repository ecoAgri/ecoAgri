import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { FormHelperText, MenuItem, Select } from '@mui/material';

export default function PlaceSelector(props) {
    return (
        <FormControl variant="standard" fullWidth disabled={props.disabled} error={props.hasError}>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.value}
                label={props.label}
                onChange={props.onChange}
                onBlur={props.onBlur}
            >
                {props.cities.map((city) => (
                    <MenuItem value={city}>{city}</MenuItem>
                ))}
            </Select>
            <FormHelperText>{props.hasError ? props.error : ""}</FormHelperText>
        </FormControl>
    );
}

//@ts-nocheck
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, createFilterOptions, TextField } from '@mui/material'
import React, { FormEvent, SyntheticEvent } from 'react'
import { ScreenerSearchResult } from '../types/screenerTypes';

interface SearchBarProps {
    options: string[];
    onChange: (event: SyntheticEvent<Element, Event>, value: null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<never> | undefined) => void;
    onInput: (event: FormEvent<HTMLInputElement>) => void;
    getOptionLabel: Function;
}

const filter = createFilterOptions();


const SearchBar = ({ onChange, options, onInput, getOptionLabel }: SearchBarProps) => {
    return (
        <div>
            <Autocomplete options={options} onChange={onChange} renderInput={(params) => <TextField {...params} label="Search Company" />} onInput={onInput}
            getOptionLabel={getOptionLabel}
            />
        </div>
    )
}

export default SearchBar;

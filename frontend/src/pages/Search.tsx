import React, { FormEvent, useEffect } from 'react'
import { SearchBar } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { search } from '../redux/slices/ScreenerSlice';
import { ScreenerSearchResult } from '../types/screenerTypes';

const Search = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { error, loading, searchResults } = useSelector((state: RootState) => state.Screener);

    const onSearchChange = (event: any, newVal: any) => {
        console.log(event, newVal);
    }

    const onInput = (e: FormEvent<HTMLInputElement>) => {
        //@ts-ignore
        const query = e.target.value;
        dispatch(search({ query: query }));
    }

    const getOptionTitle = (option: ScreenerSearchResult) => {
        return option.name
    }

    
    return (
        <div style={{
            padding: '10rem'
        }}>
            {loading ? "Loading..." : null}
            
            <SearchBar onChange={onSearchChange} options={searchResults ? searchResults : [] } onInput={onInput} getOptionLabel={getOptionTitle} />
        </div>
    )
}

export default Search

import React, { FormEvent, useEffect, useState } from 'react'
import { SearchBar } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { loadPdfs, search } from '../redux/slices/ScreenerSlice';
import { ScreenerSearchResult } from '../types/screenerTypes';
import { Button } from '@mui/material';

const Search = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { error, loading, searchResults, foundFiles } = useSelector((state: RootState) => state.Screener);

    const [selectedValue, setSelectedValue] = useState<ScreenerSearchResult | null>(null);

    const onSearchChange = (event: any, newVal: any) => {
        setSelectedValue(newVal);
    }

    const onInput = (e: FormEvent<HTMLInputElement>) => {
        //@ts-ignore
        const query = e.target.value;
        dispatch(search({ query: query }));
    }

    const getOptionTitle = (option: ScreenerSearchResult) => {
        return option.name
    }

    const onButtonClick = () => {
        if (selectedValue) {
            dispatch(loadPdfs({ selectedCompany: selectedValue }))
        }
    }

    return (
        <div style={{
            padding: '10rem'
        }}>
            {loading ? "Loading..." : null}

            <SearchBar onChange={onSearchChange} options={searchResults ? searchResults : []} onInput={onInput} getOptionLabel={getOptionTitle} />

            <div style={{
                marginTop: "2rem"
            }}>
                <Button variant="contained" disabled={selectedValue === null} onClick={onButtonClick}>Find Documents</Button>
            </div>

            <table style={{
                border: "1px solid black"
            }}>

                {foundFiles.files.map((d, i) => {
                    return (<>
                        <tr>
                            <td style={{border:"1px solid gray", padding:4}}>{i + 1}</td>
                            <td style={{border:"1px solid gray", padding:4}}>{d.date}</td>
                            <td style={{border:"1px solid gray", padding:4}}>{d.url}</td>
                        </tr>
                    </>)
                })}
            </table>
        </div>
    )
}

export default Search

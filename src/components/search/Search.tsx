import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));


const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(0, 0, 1, 1),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(2)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

type SearchAppBarPropsType = {
    search: (value: string) => void
}

export default function SearchAppBar({search}: SearchAppBarPropsType) {
    const [value, setValue] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onSearchHandler = () => {
        search(value)
    }
    const onEnterPressed = (event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.key === 'Enter' && onSearchHandler()
        setValue('')
    }
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Search >
                        <StyledInputBase
                            onKeyDown={(e)=>onEnterPressed(e)}
                            onChange={onChangeHandler}
                            value={value}
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                        />
                        <SearchIcon style={{
                            right: '0',
                            bottom: '0',
                            height: '100%',
                            position: 'absolute',}} onClick={onSearchHandler}/>
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

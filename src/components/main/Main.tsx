import * as React from 'react';
import {styled, useTheme, Theme, CSSObject} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchAppBar from '../search/Search';
import {Folder} from '../folder/Folder';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {addFolderAC, FolderType} from '../../reducers/folderReducer';
import MuiListItem from '../listItem/ListItem';
import {AddItemForm} from '../../common/addItemForm/AddItemForm';
import {useCallback, useEffect, useState} from 'react';
import {v1} from 'uuid';
import {Grid, ListItemIcon, Paper} from '@mui/material';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import {ErrorSnackbar} from '../errorSnackbar/ErrorSnackbar';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [select, setSelect] = useState('all')
    const folders = useSelector<AppRootStateType, FolderType[]>(state => state.folders)
    const [error, setError] = useState('')
    const [foldersForRender, setFoldersForRender] = useState(folders)
    const dispatch = useDispatch()
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const addFolder = useCallback((title: string) => {
        const newFolder: FolderType = {id: v1(), title, filter: 'all'}
        dispatch(addFolderAC(newFolder))
        setSelect(newFolder.id)
    }, [dispatch])

    const onFolderSelect = (id: string) => {
        setSelect(id)
    }

    const onSearchSelect = (value: string) => {
        const searchingFolders = folders.filter(el => el.title.includes(value))
        searchingFolders.length > 0 ? setFoldersForRender(searchingFolders) : setError('No match!')
    }
    useEffect(()=>{
        if(select !== 'all') {
            setFoldersForRender(folders.filter(el => el.id === select))

        } else {
            setFoldersForRender(folders)
        }
    },[select])
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        <SearchAppBar search={onSearchSelect}/>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                {open ? <>
                    <AddItemForm calBack={addFolder}/>
                    <Divider/>
                </> : ''}
                <ListItemIcon
                    onClick={() => onFolderSelect('all')}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: 90,
                        minWidth: 0,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <SelfImprovementIcon/>
                    All
                </ListItemIcon>
                <Divider/>
                <List>
                    {folders.map(el => (
                        <MuiListItem key={el.id + el.title} id={el.id} select={onFolderSelect} text={el.title}
                                     open={open}/>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                <Grid style={{ display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center' }} container spacing={1}>
                    {foldersForRender.length && foldersForRender.map((t) => {
                        return (<Grid key={t.id} item style={{margin: '10px'}}>
                            <Paper style={{backgroundColor: '#6495ed3b'}}>
                                <Folder
                                    clearSelect={onFolderSelect}
                                    filter={t.filter}
                                    id={t.id}
                                    title={t.title}
                                /></Paper></Grid>)

                    })}
                </Grid>
                <ErrorSnackbar error={error} setError={setError}/>
            </Box>
        </Box>
    );
}

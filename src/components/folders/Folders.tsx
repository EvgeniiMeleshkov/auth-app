import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {FolderType} from '../../reducers/folderReducer';
import {Grid, Paper} from '@mui/material';
import {Folder} from '../folder/Folder';




const Folders = () => {
    const folders = useSelector<AppRootStateType, FolderType[]>(state => state.folders)

    return (
        <div/>
    );
};

export default Folders;
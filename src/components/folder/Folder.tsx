import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addTaskAC, TasksStateType} from '../../reducers/tasksReducer';
import {Delete} from '@mui/icons-material';
import {Button, ButtonGroup, IconButton} from '@mui/material';
import {AppRootStateType} from '../../redux/store';
import {
    changeFolderFilterAC,
    changeFolderTitleAC,
    FilterValuesType,
    removeFolderAC
} from '../../reducers/folderReducer';
import {TaskStatuses} from '../../common/enums';
import {AddItemForm} from '../../common/addItemForm/AddItemForm';
import {Task} from '../task/Task';
import {SpanInput} from '../../common/SpanInput/SpanInput';

type FolderPropsType = {
    id: string
    filter: FilterValuesType
    title: string
    clearSelect: (val: string)=>void
}

export const Folder = ({id, filter, title, clearSelect}: FolderPropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

//-------------------FILTER---------------------------
    const tasksForRender = filter === 'completed'
        ? tasks[id].filter(el => el.status === TaskStatuses.Completed)
        : filter === 'active'
            ? tasks[id].filter(el => el.status !== TaskStatuses.Completed)
            : tasks[id]

//----------------FOLDER_LOGIC-------------------------

    const onDeleteFolderHandler = () => {
        dispatch(removeFolderAC(id))
        clearSelect('all')
    }

    const changeFolderTitle = useCallback((folderId: string, title: string) => {
        dispatch(changeFolderTitleAC(folderId, title))
    } ,[dispatch])

//-------------------TASKS_LOGIC-----------------------
    const addTask = useCallback(function (title: string) {
        dispatch(addTaskAC(title, id));
    }, [id, dispatch]);

    const onChangeFilter = useCallback( (filter: FilterValuesType) => {
        dispatch(changeFolderFilterAC(id, filter))
    }, [dispatch, id])

    const mappedTasks = tasksForRender.map(t => {
        return (
            <Task key={t.id+id} taskID={t.id} status={t.status} taskTitle={t.title} folderId={id}/>
        )
    })


    return (
        <div style={{marginTop: '1rem'}}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                textAlign: 'center', fontWeight: 'bolder', fontSize: 'large'
            }}>
                <div style={{fontFamily: 'monospace'}}>
                    <SpanInput fontSize={'20px'} title={title} folderId={id} callBack={changeFolderTitle}/>
                </div>
                <div>
                    <IconButton onClick={onDeleteFolderHandler} size={'medium'}>
                        <Delete/>
                    </IconButton>
                </div>
            </div>
            <AddItemForm calBack={addTask}/>
            <ul style={{padding: '0'}}>
                {mappedTasks}
            </ul>
            <div style={{display: 'flex', width: 'border-box', justifyContent: 'center'}}>
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button size={'small'} variant={filter === 'all' ? 'contained' : 'outlined'} color={'warning'}
                            onClick={() => onChangeFilter('all')}>All</Button>
                    <Button size={'small'} variant={filter === 'active' ? 'contained' : 'outlined'} color={'secondary'}
                            onClick={() => onChangeFilter('active')}>Active</Button>
                    <Button size={'small'} variant={filter === 'completed' ? 'contained' : 'outlined'} color={'info'}
                            onClick={() => onChangeFilter('completed')}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

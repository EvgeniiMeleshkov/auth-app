import React, {memo, useCallback} from 'react';
import {Delete} from '@mui/icons-material';
import {IconButton, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {TaskStatuses} from '../../common/enums';
import {useDispatch} from 'react-redux';
import {changeTaskTitleAC, removeTaskAC, updateTaskAC} from '../../reducers/tasksReducer';
import { SpanInput } from '../../common/SpanInput/SpanInput';

type TasksPropsType = {
    taskID: string
    status: TaskStatuses
    taskTitle: string
    folderId: string
}

export const Task = memo(({taskTitle, status, taskID, folderId}: TasksPropsType) => {
    const dispatch = useDispatch()
    const onIsDoneHandler = useCallback((e: SelectChangeEvent<TaskStatuses>) => {
        dispatch(updateTaskAC(taskID, e.target.value as TaskStatuses, folderId))
    }, [dispatch, folderId, taskID])

    const changeTaskTitle = useCallback((id: string, title: string) => {
        dispatch(changeTaskTitleAC(taskID, title, id))
    }, [dispatch, taskID])

    const onDeleteTaskHandler = useCallback(() => {
        dispatch(removeTaskAC(taskID, folderId))
    }, [dispatch, folderId, taskID])


    return (<>
            <hr/>
        <li style={{
            display: 'grid',
            alignItems: 'center',
            gridAutoFlow: 'column',
            justifyContent: 'space-between',
        }}>

            <Select variant={'standard'} style={{color: 'inherit', fontSize: 'small', paddingLeft: '5px'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Task status"
                    onChange={onIsDoneHandler}
            >
                <MenuItem value={TaskStatuses.New}>New</MenuItem>
                <MenuItem value={TaskStatuses.Completed}>Completed</MenuItem>
                <MenuItem value={TaskStatuses.Draft}>Draft</MenuItem>
                <MenuItem value={TaskStatuses.InProgress}>In propgress</MenuItem>
            </Select>
            <div style={{fontFamily: '-moz-initial', width: '100%'}}>

                <SpanInput fontSize={'medium'} title={taskTitle} folderId={folderId}
                           callBack={changeTaskTitle}/>
            </div>
            <IconButton color={'primary'} style={{color: 'inherit'}} onClick={onDeleteTaskHandler} size={'small'}>
                <Delete/>
            </IconButton>
        </li>
        </>
    );
})
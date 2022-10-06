import {
    AddFolderActionType,
    RemoveFolderActionType,
} from './folderReducer';
import {TaskStatuses} from '../common/enums';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    status: TaskStatuses
    folderId: string
    description: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    folderId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    folderId: string
    title: string
}

export type updateTaskActionType = {
    type: 'UPDATE_TASK_STATUS',
    folderId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    folderId: string
    taskId: string
    title: string
}

export type TasksActionsType = RemoveTaskActionType | AddTaskActionType
    | updateTaskActionType
    | ChangeTaskTitleActionType
    | AddFolderActionType
    | RemoveFolderActionType


const initialState: TasksStateType = {
    "1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, folderId: "1", description: ''},
        { id: "2", title: "JS", status: TaskStatuses.Completed, folderId: "1", description: ''},
        { id: "3", title: "React", status: TaskStatuses.New, folderId: "1", description: ''}
    ],
    "2": [
        { id: "1", title: "bread", status: TaskStatuses.New, folderId: "2", description: ''},
        { id: "2", title: "milk", status: TaskStatuses.Completed, folderId: "2", description: ''},
        { id: "3", title: "tea", status: TaskStatuses.New, folderId: "2", description: ''}
    ]

}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.folderId]: [...state[action.folderId].filter(el => el.id !== action.taskId)]};
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.title, status: TaskStatuses.New, folderId: action.folderId, description: ''}
            return {...state, [action.folderId]: [newTask, ...state[action.folderId]]}
        }
        case 'UPDATE_TASK_STATUS': {
            return {
                ...state,
                [action.folderId]: state[action.folderId].map(el => el.id === action.taskId ? {...el, status: action.status} : el)
            };
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.folderId]: state[action.folderId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)}
        }
        case 'ADD-FOLDER': {
            return {
                ...state,
                [action.folder.id]: []
            }
        }
        case 'REMOVE-FOLDER': {
            const copyState = {...state};
            delete copyState[action.folderId];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, folderId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, folderId}
}
export const addTaskAC = (title: string, folderId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, folderId}
}
export const updateTaskAC = (taskId: string, status: TaskStatuses, folderId: string): updateTaskActionType => {
    return {type: 'UPDATE_TASK_STATUS', status, folderId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, folderId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, folderId, taskId}
}



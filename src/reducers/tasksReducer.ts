import {
    AddFolderActionType,
    RemoveFolderActionType,
} from './folderReducer';
import {TaskStatuses} from '../common/enums';

export type TaskType = { id: string, title: string, status: TaskStatuses, folderId: string, description: string}

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
    task: TaskType
}

export type updateTaskActionType = {
    type: 'UPDATE_TASK',
    folderId: string
    taskId: string
    task: TaskType
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
    // | ReturnType<typeof setTasksAC>


const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.folderId]: [...state[action.folderId].filter(el => el.id !== action.taskId)]};
        }
        case 'ADD-TASK': {
            return {...state, [action.folderId]: [action.task, ...state[action.folderId]]}
        }
        // case 'UPDATE_TASK': {
        //     return {
        //         ...state,
        //         [action.folderId]: state[action.folderId].map(el => el.id === action.taskId ? {...action.task} : el)
        //     };
        // }
        case 'CHANGE-TASK-TITLE': {
            // let folderTasks = state[action.folderId];
            // // найдём нужную таску:
            // let newTasksArray = folderTasks
            //     .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
            //
            // state[action.folderId] = newTasksArray;
            // return ({...state});
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
            delete copyState[action.id];
            return copyState;
        }
        // case 'SET_TODOLISTS':
        //     const copy = {...state}
        //     action.todolists.forEach((el) => {
        //         copy[el.id] = []
        //     })
        //     return copy
        // case 'SET_TASKS':
        //     return {...state, [action.folderId]: action.tasks}

        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, folderId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, folderId}
}
export const addTaskAC = (task: TaskType, folderId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', task, folderId}
}
export const updateTaskAC = (taskId: string, task: TaskType, folderId: string): updateTaskActionType => {
    return {type: 'UPDATE_TASK', task, folderId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, folderId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, folderId, taskId}
}
//export const setTasksAC = (folderId: string, tasks: TaskType[]) => ({type: 'SET_TASKS', folderId, tasks} as const)


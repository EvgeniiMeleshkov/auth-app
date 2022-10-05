export type FolderType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type RemoveFolderActionType = {
    type: 'REMOVE-FOLDER',
    id: string
}
export type AddFolderActionType = {
    type: 'ADD-FOLDER',
    folder: FolderType
}
export type ChangeFolderTitleActionType = {
    type: 'CHANGE-FOLDER-TITLE',
    id: string
    title: string
}
export type ChangeFolderFilterActionType = {
    type: 'CHANGE-FOLDER-FILTER',
    id: string
    filter: FilterValuesType
}
export type FoldersActionsType = RemoveFolderActionType | AddFolderActionType
    | ChangeFolderTitleActionType
    | ChangeFolderFilterActionType

const initialState: Array<FolderType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';


export const foldersReducer = (state: Array<FolderType> = initialState, action: FoldersActionsType): Array<FolderType> => {
    switch (action.type) {
        case 'REMOVE-FOLDER': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-FOLDER': {
            return [action.folder, ...state]
        }
        case 'CHANGE-FOLDER-TITLE': {
            const folder = state.find(tl => tl.id === action.id);
            if (folder) {
                // если нашёлся - изменим ему заголовок
                folder.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-FOLDER-FILTER': {
            const folder = state.find(tl => tl.id === action.id);
            if (folder) {
                // если нашёлся - изменим ему заголовок
                folder.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeFolderAC = (folderId: string): RemoveFolderActionType => {
    return {type: 'REMOVE-FOLDER', id: folderId}
}
export const addFolderAC = (folder: FolderType): AddFolderActionType => {
    return {type: 'ADD-FOLDER', folder}
}
export const changeFolderTitleAC = (id: string, title: string): ChangeFolderTitleActionType => {
    return {type: 'CHANGE-FOLDER-TITLE', id: id, title: title}
}
export const changeFolderFilterAC = (id: string, filter: FilterValuesType): ChangeFolderFilterActionType => {
    return {type: 'CHANGE-FOLDER-FILTER', id: id, filter: filter}
}

export type AppReducerStateType = {
    error: string
}
const appInitState: AppReducerStateType = {
    error: ''
}
export const appReducer = (state: AppReducerStateType = appInitState, action: SetErrorACType) => {
    switch (action.type) {
        case 'SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
export type SetErrorACType = ReturnType<typeof setErrorAC>
export const setErrorAC = (error: string) => {
    return {
        type: 'SET-ERROR',
        error
    }
}
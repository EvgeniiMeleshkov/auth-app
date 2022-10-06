import {combineReducers, createStore} from 'redux';
import {TasksActionsType, tasksReducer} from '../reducers/tasksReducer';
import {FoldersActionsType, foldersReducer} from '../reducers/folderReducer';
import {appReducer} from '../reducers/appReducer';

// объединяю reducer-ы с помощью combineReducers,
// структура нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    folders: foldersReducer,
    app: appReducer
})
// создаём redux
export const store = createStore(rootReducer);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionType = TasksActionsType | FoldersActionsType // заглушка для экшенов
//general dispatch type
export type AppDispatch = typeof store.dispatch;

// чтобы можно было в консоли браузера обращаться к redux в любой момент
// @ts-ignore
window.store = store;

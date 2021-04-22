import { combineReducers } from 'redux';
import userReducer from './userReducer';
import articlesReducer from './articlesReducer';
import articleReducer from './article';

const rootReducer = combineReducers({
  user: userReducer,
  articles: articlesReducer,
  article: articleReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

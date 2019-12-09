import { createAction, props } from '@ngrx/store';

import { Bookmark } from './../models/bookmark.model';

export const addBookmark = createAction(
  '[Bookmarker Component] Add',
  props<Bookmark>()
);
export const editBookmark = createAction(
  '[Bookmarker Component] Edit',
  props<Bookmark>()
);
export const removeBookmark = createAction(
  '[Bookmarker Component] Remove',
  props<Bookmark>()
);

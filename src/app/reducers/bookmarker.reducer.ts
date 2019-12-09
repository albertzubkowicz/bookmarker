import { createReducer, on } from '@ngrx/store';

import { addBookmark, removeBookmark } from '../actions/bookmarker.actions';
import { Bookmark, GROUP } from './../models/bookmark.model';

export const initialBookmarks: Bookmark[] = [
  new Bookmark(1, 'Angular', 'angular.io', GROUP.personal),
  new Bookmark(2, 'YouTube', 'youtube.com', GROUP.leisure),
  new Bookmark(3, 'films', 'angular.io', GROUP.personal),
  new Bookmark(5, 'Netflix', 'netflix.com', GROUP.leisure),
  new Bookmark(6, 'NgRx', 'ngrx.io', GROUP.personal),
  new Bookmark(7, 'Spotify', 'spotify.com', GROUP.leisure),
  new Bookmark(8, 'mBank', 'mbank.pl', GROUP.personal),
  new Bookmark(9, 'Internal project', 'onwelo.helloastra.com', GROUP.work),
  new Bookmark(10, 'LinkedIn', 'linkedin.com', GROUP.personal),
  new Bookmark(11, 'Filmweb', 'filmweb.pl', GROUP.leisure),
  new Bookmark(12, 'Facebook', 'facebook.com', GROUP.personal),
  new Bookmark(13, 'Avaloq', 'avaloq.com', GROUP.work)
];

let lastId = 13;
const _bookmarkerReducer = createReducer(
  initialBookmarks,
  on(addBookmark, (state, params) => {
    console.log(params);
    return [...state, params];
  }),
  on(removeBookmark, (state, params) => {
    console.log(params);
    return state.filter(bookmark => {
      return bookmark.id !== params.id;
    });
  })
);

export function incrementId() {
  return lastId++;
}

export function bookmarkerReducer(state, action) {
  return _bookmarkerReducer(state, action);
}

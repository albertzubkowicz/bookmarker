import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { incrementId } from '../reducers/bookmarker.reducer';
import { addBookmark, removeBookmark } from './../actions/bookmarker.actions';
import { Bookmark, GROUP } from './../models/bookmark.model';

@Component({
  selector: 'app-bookmarker',
  templateUrl: './bookmarker.component.html',
  styleUrls: ['./bookmarker.component.css']
})
export class BookmarkerComponent implements OnInit {
  bookmarks$: Observable<Bookmark[]>;
  leisureBookmarks$: Observable<Bookmark[]>;
  personalBookmarks$: Observable<Bookmark[]>;
  workBookmarks$: Observable<Bookmark[]>;
  Bookmark = Bookmark;
  group = GROUP;
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    group: new FormControl('', Validators.required)
  });
  displayedColumns: string[] = ['name', 'url', 'remove'];
  constructor(private store: Store<{ bookmarks: Bookmark[] }>) {
    this.bookmarks$ = store.pipe(select('bookmarks'));
    this.leisureBookmarks$ = this.bookmarks$.pipe(
      map(bookmarks =>
        bookmarks.filter(bookmark => bookmark.group === this.group.leisure)
      )
    );
    this.personalBookmarks$ = store
      .pipe(select('bookmarks'))
      .pipe(
        map(bookmarks =>
          bookmarks.filter(bookmark => bookmark.group === this.group.personal)
        )
      );
    this.workBookmarks$ = store
      .pipe(select('bookmarks'))
      .pipe(
        map(bookmarks =>
          bookmarks.filter(bookmark => bookmark.group === this.group.work)
        )
      );
  }

  ngOnInit() {}

  addBookmark(name, group, url) {
    this.store.dispatch(
      addBookmark(new Bookmark(incrementId(), name, group, url))
    );
  }
  onSubmit() {
    if (this.form.valid) {
      this.addBookmark(
        this.form.get('name').value,
        this.form.get('url').value,
        this.form.get('group').value
      );
    }
  }
  onRemove(bookmark: Bookmark) {
    this.store.dispatch(removeBookmark(bookmark));
  }
}

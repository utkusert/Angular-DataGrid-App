import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetSocialMedia } from './store/socialMedia-data-store.actions';
import { SocialMediaState } from './store/socialMedia-data-store.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'datagrid-task';

  constructor(private store: Store<{ socialMediaKey: SocialMediaState }>) { }
  ngOnInit(): void {
    this.store.dispatch(GetSocialMedia());
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SocialMedia } from 'src/app/models/social-media.model';
import { AddSocialMedia } from 'src/app/store/socialMedia-data-store.actions';
import { SocialMediaState } from 'src/app/store/socialMedia-data-store.reducer';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, OnDestroy {


  dataForm = new FormGroup({
    link: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('')
  })

  searchText: any = '';
  socialMedias: SocialMedia[] = [];
  subscriptions: Subscription[] = [];
  isModalOpen = false;
  rowCount: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  sortedData: SocialMedia[] = []


  constructor(private store: Store<{ socialMediaKey: SocialMediaState }>) {
    this.sortedData = this.socialMedias.slice();
  }

  ngOnInit(): void {
    this.subscribeToData()
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  subscribeSocialMedia() {
    return this.store.select(state => state.socialMediaKey.socialMedias).subscribe(socialMedias => {
      this.socialMedias = socialMedias;
      this.rowCount = socialMedias.length;
      this.rowCount = this.rowCount > this.itemsPerPage ? this.itemsPerPage : socialMedias.length;
    })
  }
  subscribeToData() {
    this.subscriptions = [
      this.subscribeSocialMedia()
    ]
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.dataForm.reset();
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  totalPages(): number {
    return Math.ceil(this.socialMedias.length / this.itemsPerPage);
  }

  get getPageData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.socialMedias.slice(startIndex, endIndex);
  }

  increaseRowCount() {
    this.rowCount += 1;
  }
  decreaseRowCount() {
    if (this.rowCount > 1) {
      this.rowCount -= 1;
    }
  }

  onSubmit(): void {
    if (this.dataForm.valid) {
      const link = this.dataForm.get('link')!.value;
      const name = this.dataForm.get('name')!.value;
      const description = this.dataForm.get('description')!.value;


      if (link !== null && name !== null) {
        const socialMediaData: Omit<SocialMedia, "id"> = {
          link: link,
          name: name,
          description: description || '',
        };
        this.store.dispatch(AddSocialMedia({ payload: { socialMedia: socialMediaData } }));
        this.closeModal();
      } else {

      }
    }
  }


}

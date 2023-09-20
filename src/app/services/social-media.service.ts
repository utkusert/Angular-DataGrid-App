import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SocialMedia } from '../models/social-media.model';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {
  private url = 'http://[::1]:4000/social-medias';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getSocialMedia(): Observable<SocialMedia[]> {
    return this.http.get<SocialMedia[]>(this.url, { headers: this.headers });
  }
  addSocialMedia(socialMedia: Omit<SocialMedia, 'id'>): Observable<SocialMedia> {
    return this.http.post<SocialMedia>(this.url, socialMedia, { headers: this.headers });
  }
}

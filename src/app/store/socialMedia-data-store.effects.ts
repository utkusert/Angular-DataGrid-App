import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { SocialMedia } from "../models/social-media.model";
import { SocialMediaService } from "../services/social-media.service";
import { AddSocialMedia, AddSocialMediaFailure, AddSocialMediaSuccessful, GetSocialMedia, GetSocialMediaFailure, GetSocialMediaSuccessful } from "./socialMedia-data-store.actions";

//Burada ngrx'in diğer bir bileşeni effects kısmı yer alıyor. Burada aşağıdaki gibi eylemlerimizi çağırıp,başarılıysa
//ne olacak başarısızsa ne olacağını gösteriyoruz.

@Injectable()
export class SocialMediaEffects {
    constructor(private actions$: Actions, private socialMediaService: SocialMediaService) { }

    getSocialMedia$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GetSocialMedia),
            switchMap(() =>
                this.socialMediaService.getSocialMedia().pipe(
                    map((socialMedias: SocialMedia[]) => GetSocialMediaSuccessful({ payload: { socialMedias } })),
                    catchError(error => [GetSocialMediaFailure({ error: 'Can not get Social Medias!' })])
                ))
        ));
    addSocialMedia$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddSocialMedia),
            switchMap(action =>
                this.socialMediaService.addSocialMedia(action.payload.socialMedia).pipe(
                    map((socialMedia: SocialMedia) => AddSocialMediaSuccessful({ payload: { socialMedia } })),
                    catchError(error => [AddSocialMediaFailure({ error: 'Can not add Social Media!' })])
                )
            )
        )
    );

}
import { createReducer, on } from "@ngrx/store";
import { SocialMedia } from "../models/social-media.model";
import * as SocialMediaActions from './socialMedia-data-store.actions'


//Componentlerde state'i nasıl çağıracağımızı gösteren key name'i tanımlıyoruz.
export const featureKey = 'socialMediaKey'
export interface SocialMediaState {
    socialMedias: SocialMedia[],
    error: any;
    isLoading: boolean;

}

//Yukardaki tanımladığımız state'imizin başlangıç değerlerini gösteriyoruz.
export const initialState: SocialMediaState = {
    socialMedias: [],
    error: '',
    isLoading: false
}

//Burada tek tek bütün aksiyonları gösteriyoruz. ...state ile var olan state'i çağırıyoruz(spread operatörü), action.payload
//dediğimiz şey ise bize aksiyon sonucu geri dönen yanıt.
//state => bizim verimiz , action => aksiyon,yazdığımız aksiyonların tetiklenmesi
export const reducer = createReducer(
    initialState,
    on(SocialMediaActions.GetSocialMedia, (state, action) => ({
        ...state,
        isLoading: true
    })),
    on(SocialMediaActions.GetSocialMediaSuccessful, (state, action) => ({
        ...state,
        socialMedias: action.payload.socialMedias,
        isLoading: false
    })),
    on(SocialMediaActions.GetSocialMediaFailure, (state, action) => ({
        ...state,
        isLoading: false,
        error: 'Can not get Social Media Data!'
    })),
    on(SocialMediaActions.AddSocialMedia, (state, action) => ({
        ...state,
        isLoading: true
    })),
    on(SocialMediaActions.AddSocialMediaSuccessful, (state, action) => ({
        ...state,
        socialMedias: [
            ...state.socialMedias,
            action.payload.socialMedia
        ],
        isLoading: false
    })),
    on(SocialMediaActions.AddSocialMediaFailure, (state, action) => ({
        ...state,
        isLoading: false,
        error: 'Can not add Social Media!'
    }))
)
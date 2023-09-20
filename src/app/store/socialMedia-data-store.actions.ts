// Burada NgRx'in ilk hazırlığı olan aksiyonlarımız yer almaktadır. Aşağıda her bir işlem için 3 farklı durum tanımlanır.
// Bunlarda ilki işlem çağrılınca ne olacağı, sonra eğer işlem başarılıysa nasıl payload verilmesi gerektiği veya
// başarısızsa ne olacağını vereceğimizi tanımlarız.

import { createAction, props } from "@ngrx/store";
import { SocialMedia } from "../models/social-media.model";

export enum ActionTypes {
    GetSocialMedia = '[SOCIALMEDIADATASTORE] GetSocialMedia',
    GetSocialMediaSuccessful = '[SOCIALMEDIADATASTORE] GetSocialMediaSuccessful',
    GetSocialMediaFailure = '[SOCIALMEDIADATASTORE] GetSocialMediaFailure',
    AddSocialMedia = '[SOCIALMEDIADATASTORE] AddSocialMedia',
    AddSocialMediaSuccessful = '[SOCIALMEDIADATASTORE] AddSocialMediaSuccessful',
    AddSocialMediaFailure = '[SOCIALMEDIADATASTORE] AddSocialMediaFailure',
}

export const GetSocialMedia = createAction(ActionTypes.GetSocialMedia);
export const GetSocialMediaSuccessful = createAction(ActionTypes.GetSocialMediaSuccessful, props<{ payload: { socialMedias: SocialMedia[] } }>());
export const GetSocialMediaFailure = createAction(ActionTypes.GetSocialMediaFailure, props<{ error: any }>());
export const AddSocialMedia = createAction(ActionTypes.AddSocialMedia, props<{ payload: { socialMedia: Omit<SocialMedia, 'id'> } }>());
export const AddSocialMediaSuccessful = createAction(ActionTypes.AddSocialMediaSuccessful, props<{ payload: { socialMedia: SocialMedia } }>());
export const AddSocialMediaFailure = createAction(ActionTypes.AddSocialMediaFailure, props<{ error: any }>())
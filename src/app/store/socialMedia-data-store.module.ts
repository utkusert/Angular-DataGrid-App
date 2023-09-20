import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SocialMediaEffects } from "./socialMedia-data-store.effects";
import * as fromSocialMediaDataStore from './socialMedia-data-store.reducer';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(
            fromSocialMediaDataStore.featureKey,
            fromSocialMediaDataStore.reducer,
            { initialState: fromSocialMediaDataStore.initialState }
        ),
        EffectsModule.forRoot(),
        EffectsModule.forFeature([SocialMediaEffects]),
    ],
    exports: [StoreModule, EffectsModule],

})
export class SocialMediaDataStoreModule { }
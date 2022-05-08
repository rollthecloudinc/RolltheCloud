import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER,  SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NxModule } from '@nrwl/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
// tslint:disable-next-line:nx-enforce-module-boundaries
// import { AD_SETTINGS, AdSettings } from '@classifieds-ui/ads';
// Base auth
import { AuthModule, LogoutInterceptor} from '@ng-druid/auth';
// Auth implementation - open connect/oauth
import { OidcModule, TokenInterceptor, CLIENT_SETTINGS, ClientSettings } from '@ng-druid/oidc';
import { MediaModule, MediaSettings, MEDIA_SETTINGS } from '@ng-druid/media';
import { UtilsModule /*, CorrelationInterceptor */, SITE_NAME, HOST_NAME, PROTOCOL } from '@ng-druid/utils';
import { MaterialModule } from '@ng-druid/material';
// import { LOGGING_SETTINGS, LoggingSettings, LoggingModule, HttpErrorInterceptor, GlobalErrorHandler } from '@classifieds-ui/logging';
import { TokenModule } from '@ng-druid/token';
import { ContextModule } from '@ng-druid/context';
import { ContentModule } from '@ng-druid/content';
import { AliasModule, CatchAllGuard, CatchAllRouterComponent } from '@ng-druid/alias';
import { PagealiasModule } from '@ng-druid/pagealias';
import { PanelsModule, PanelsSettings, PANELS_SETTINGS } from '@ng-druid/panels';
import { FormlyModule } from '@ng-druid/formly';
import { BridgeModule } from '@ng-druid/bridge';
import { StateModule } from '@ng-druid/state';
import { AwcogModule, CognitoSettings, COGNITO_SETTINGS } from '@ng-druid/awcog';
import { KeyvalModule } from '@ng-druid/keyval';
// import { CHAT_SETTINGS, ChatSettings } from '@classifieds-ui/chat';
// tslint:disable-next-line:nx-enforce-module-boundaries
// import { PROFILE_SETTINGS, ProfileSettings } from '@classifieds-ui/profiles';
// import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG } from '@okta/okta-angular';
// import { UserManager } from 'oidc-client';
// import { NbA11yModule } from '@nebular/theme';
// import { JsonschemaModule } from '@classifieds-ui/jsonschema';
// import { TAXONOMY_SETTINGS, TaxonomySettings } from '@classifieds-ui/taxonomy';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule, MinimalRouterStateSerializer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/*import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';*/
import { EntityDataModule, DefaultDataServiceConfig } from '@ngrx/data';
import { reducers, metaReducers } from './reducers';
import { AuthCallbackComponent } from '@ng-druid/auth';
import { TransformModule } from '@ng-druid/transform';
import { DeityModule } from '@ng-druid/deity';
import { LoopModule } from '@ng-druid/loop';
import { RenderModule } from '@ng-druid/render';
import { FormsModule as DruidFormsModule } from '@ng-druid/forms';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { AlienaliasModule, AlienaliasSettings, ALIENALIAS_SETTINGS } from '@ng-druid/alienalias';
import { OutsiderModule } from '@ng-druid/outsider';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { TractorbeamModule } from '@ng-druid/tractorbeam';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RefineryModule } from '@ng-druid/refinery';
import { SheathModule } from '@ng-druid/sheath';
import { ReactModule } from '@ng-druid/react';
// import { PanelpageModule } from 'panelpage';

// import { FlexLayoutServerModule } from '@angular/flex-layout/server';
// import { MonacoEditorModule } from 'ngx-monaco-editor';

const routes = [
  { path: 'auth-callback', component: AuthCallbackComponent },
  // Module federation experimentation
  /*{
    path: 'flights',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:3000/remoteEntry.js',
      exposedModule: './Module'
    }).then(m => m.FlightsModule)
  },*/
  // { path: 'implicit/callback', component: OktaCallbackComponent },
  // { path: 'chat', loadChildren: () => import('@classifieds-ui/chat').then(m => m.ChatModule) },
  // { path: 'ads', loadChildren: () => import('@classifieds-ui/ads').then(m => m.AdsModule) },
  // { path: 'vocabularies', loadChildren: () => import('@classifieds-ui/vocabulary').then(m => m.VocabularyModule) },
  // { path: 'profiles', loadChildren: () => import('@classifieds-ui/profiles').then(m => m.ProfilesModule) },
  /*{ path: 'pages', loadChildren: () => {
    return import('pages').then(m => m.PagesModule);
  } },*/
  // { path: '', redirectTo: 'index' },
  //{ path: '**', component: NotFoundComponent }
  { path: '**', component: CatchAllRouterComponent, canActivate: [ CatchAllGuard ] }
  //{ path: '', redirectTo: 'pages', pathMatch: "full" }
];

// @todo: just get this to work for now deal with actual endpoints later.
const defaultDataServiceConfig: DefaultDataServiceConfig = {
  // root: 'https://localhost:44340', // hard coded to taxonomy for now -- api gateway will prevent the need for custom code to change this per entity.
  // root: 'https://classifieds-dev.azurewebsites.net',
  root: environment.apiGatewaySettings.endpointUrl,
  timeout: 20000, // request timeout
}

/*const oktaConfig = {
  issuer: 'https://dev-585865.okta.com/oauth2/default',
  redirectUri: environment.oktaSettings.redirectUri,
  clientId: environment.oktaSettings.clientId,
  pkce: true,
  scopes: ['openid', 'profile', 'ads_api', 'chat', 'taxonomy_api', 'api_gateway']
}*/

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  renderer.link = (href: string, title: string, text: string) => {
    if(text === 'page') {
      return `<classifieds-ui-panel-page id="${href}"></classifieds-ui-panel-page>`;
    } else {
      return `<classifieds-ui-page-router-link href="${href}" text="${text}"></classifieds-ui-page-router-link>`;
    }
  };
  return {
    renderer,
  };
}

@NgModule({
  declarations: [AppComponent ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserTransferStateModule ,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxJsonViewerModule,
    TransferHttpCacheModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
    // NbA11yModule.forRoot(),
    RouterModule.forRoot(routes, { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: MinimalRouterStateSerializer
    }),
    StoreModule.forRoot(
      reducers,
      {
        metaReducers,
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BridgeModule,
    StateModule,
    MaterialModule,
    UtilsModule,
    // LoggingModule,
    TokenModule,
    ContentModule,
    ContextModule,
    AuthModule.forRoot(),
    OidcModule.forRoot(),
    // MonacoEditorModule.forRoot(),
    MediaModule,
    // NxModule.forRoot(),
    EntityDataModule.forRoot({}),
    AliasModule,
    PanelsModule,
    // PanelpageModule,
    RenderModule,
    PagealiasModule,
    FormlyModule,
    TransformModule,
    AwcogModule,
    KeyvalModule,
    DeityModule,
    LoopModule,
    DruidFormsModule,
    // AlienaliasModule, // @todo: for now to avoid routing errors while working on ssr issues.
    OutsiderModule,
    TractorbeamModule,
    RefineryModule,
    SheathModule,
    NgxDropzoneModule,
    ReactModule
    // JsonschemaModule
    // OktaAuthModule
  ],
  providers: [
    // { provide: ErrorHandler, useClass: GlobalErrorHandler },

    // okta auth
    //{ provide: OKTA_CONFIG, useValue: oktaConfig },
    CatchAllGuard,

    { provide: SITE_NAME, useValue: environment.site },

    { provide: CLIENT_SETTINGS, useValue: new ClientSettings(environment.clientSettings) },
    { provide: MEDIA_SETTINGS, useValue: new MediaSettings(environment.mediaSettings) },
    { provide: PANELS_SETTINGS, useValue: new PanelsSettings(environment.panelsSettings) },
    { provide: ALIENALIAS_SETTINGS, useValue: new AlienaliasSettings(environment.alienaliasSettings) },

    { provide: COGNITO_SETTINGS, useValue: new CognitoSettings(environment.cognitoSettings) },
    // { provide: LOGGING_SETTINGS, useValue: new LoggingSettings(environment.loggingSettings) },
    // { provide: AD_SETTINGS, useValue: new AdSettings(environment.adSettings) },
    // { provide: TAXONOMY_SETTINGS, useValue: new TaxonomySettings(environment.taxonomySettings) },
    // { provide: PROFILE_SETTINGS, useValue: new ProfileSettings(environment.profileSettings) },
    // { provide: CHAT_SETTINGS, useValue: new ChatSettings(environment.chatSettings) },

    // There is no way to prioritize interceptors so order can be important.
    // { provide: HTTP_INTERCEPTORS, useClass: CorrelationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogoutInterceptor, multi: true },

    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },

        /* These are required only for pre-rendering - quick hack to make work for now */
    //{ provide: APP_BASE_HREF, useValue: 'http://localhost:4000/' },
    //{ provide: HOST_NAME, useValue: 'g6cljn4j35.execute-api.us-east-1.amazonaws.com' },
    //{ provide: PROTOCOL, useValue: 'https' },

    // { provide: HOST_NAME, useValue: /*req.headers.host*/ 'e4cq5a4vfc.execute-api.us-east-1.amazonaws.com' },
    // { provide: PROTOCOL, useValue: 'https' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


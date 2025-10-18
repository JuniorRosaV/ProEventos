import { routes } from './app.routes';

import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ToastrModule } from 'ngx-toastr';

import { NgxSpinnerModule } from "ngx-spinner";

import { EventoService } from './services/evento-service';





export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      BrowserAnimationsModule,
      CollapseModule.forRoot(),
      TooltipModule.forRoot(),
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        progressBar: true
      }),
      NgxSpinnerModule
    ),
    EventoService
  ],
};

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { CurrenciesTableComponent } from './currencies-table/currencies-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormatterComponent } from './formatter/formatter.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
registerLocaleData(en);

@NgModule({
    declarations: [AppComponent, CurrenciesTableComponent, FormatterComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NzButtonModule,
        NzNotificationModule,
        NzInputNumberModule,
        HttpClientModule,
        NzTableModule,
        BrowserAnimationsModule,
        NgbModule,
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    bootstrap: [AppComponent],
})
export class AppModule {}

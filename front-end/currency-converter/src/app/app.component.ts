import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrenciesService } from './shared/Services/currencies.service';
import { Subscription } from 'rxjs';
import { SessionService } from './shared/Services/session.service';
import { Session } from 'protractor';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import * as FormatResultAction from '../app/shared/actions/FormatResult.action';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'currency-converter';
    subscriptions: Subscription[] = [];

    sessionId: string = localStorage.getItem('sessionId').toString();
    constructor(private currenciesListService: CurrenciesService, private store: Store<AppState>, private sessionService: SessionService) {}
    ngOnInit() {
        this.subscriptions.push(
            this.currenciesListService.retrieveCurrencyList().subscribe(),
            this.currenciesListService.retrieveCurrencies().subscribe(),
            this.currenciesListService.fetchFormattedResults().subscribe(items => {
                items.forEach(item => this.store.dispatch(new FormatResultAction.AddFormatResult(item)));
            }),
        );
        if (localStorage.getItem('sessionId') !== null) {
            this.subscriptions.push(this.sessionService.createSessionIfNotExist().subscribe());
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}

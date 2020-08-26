import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrenciesService } from './shared/Services/currencies.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'currency-converter';
    subscriptions: Subscription[] = [];
    constructor(private currenciesListService: CurrenciesService) {}
    ngOnInit() {
        this.subscriptions.push(
            this.currenciesListService.retrieveCurrencyList().subscribe(),
            this.currenciesListService.retrieveCurrencies().subscribe(),
        );
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}

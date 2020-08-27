import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../shared/Services/currencies.service';
import { CurrencyItem } from '../shared/Models/CurrencyItem';
import { Subscription } from 'rxjs';
import { Currency } from '../shared/Models/Currency';
import { SessionService } from '../shared/Services/session.service';

@Component({
    selector: 'app-currencies-table',
    templateUrl: './currencies-table.component.html',
    styleUrls: ['./currencies-table.component.scss'],
})
export class CurrenciesTableComponent implements OnInit {
    constructor(private currenciesService: CurrenciesService) {}
    subscriptions: Subscription[] = [];
    currencyItemsList: CurrencyItem[] = [];
    currencies: Currency[] = [];
    value: number;
    ngOnInit(): void {
        this.subscriptions.push(
            this.currenciesService.currenciesList.subscribe(items => (this.currencyItemsList = items)),
            this.currenciesService.currencies.subscribe(items => (this.currencies = items)),
        );
    }
    getCurrencyProportionByCode(code: string): number {
        if (this.currencies !== null && !this.currencyItemsList !== null) {
            if (this.currencies.find(item => item.currencyCode == code) === undefined) {
                return 0;
            } else {
                return Number(this.currencies.find(item => item.currencyCode == code).proportion);
            }
        }
    }
}

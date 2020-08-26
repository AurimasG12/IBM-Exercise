import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../shared/Services/currencies.service';
import { CurrencyItem } from '../shared/Models/CurrencyItem';
import { Subscription } from 'rxjs';
import { Currency } from '../shared/Models/Currency';

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
    ngOnInit(): void {
        this.subscriptions.push(
            this.currenciesService.currenciesList.subscribe(items => (this.currencyItemsList = items)),
            this.currenciesService.currencies.subscribe(items => (this.currencies = items)),
        );
    }
    getCurrencyProportionByCode(code: string): number {
        console.log(typeof code);
        if (this.currencies !== null && !this.currencyItemsList !== null) {
            if (this.currencies.find(item => item.currencyCode == code) === undefined) {
                console.log(this.currencies.find(item => item.currencyCode == code));
                return 0;
            } else {
                console.log(this.currencies.find(item => item.currencyCode == code));
                return Number(this.currencies.find(item => item.currencyCode == code).proportion);
            }
        }
    }
}

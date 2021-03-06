import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CurrencyItem } from '../Models/CurrencyItem';
import { Currency } from '../Models/Currency';
import { FormatResult } from '../Models/FormatResult';

@Injectable({
    providedIn: 'root',
})
export class CurrenciesService {
    constructor(private httpClient: HttpClient) {
        this.currenciesList = new BehaviorSubject<CurrencyItem[]>(null);
        this.currencies = new BehaviorSubject<Currency[]>(null);
    }
    currenciesList: BehaviorSubject<CurrencyItem[]>;
    currencies: BehaviorSubject<Currency[]>;
    retrieveCurrencyList(): Observable<CurrencyItem[]> {
        return this.httpClient.get('http://localhost:3000/currencyList').pipe(
            map((items: CurrencyItem[]) => items),
            tap((items: CurrencyItem[]) => this.currenciesList.next(items)),
        );
    }
    retrieveCurrencies(): Observable<Currency[]> {
        return this.httpClient.get('http://localhost:3000/currencyList/currencies').pipe(
            map((items: Currency[]) => items),
            tap((items: Currency[]) => this.currencies.next(items)),
        );
    }
    saveformattedResult(result: FormatResult): Observable<FormatResult> {
        return this.httpClient.post('http://localhost:3000/session/add-result', result).pipe(map((item: FormatResult) => item));
    }
    fetchFormattedResults(): Observable<FormatResult[]> {
        return this.httpClient.get('http://localhost:3000/session/get-results/' + `${localStorage.getItem('sessionId')}`).pipe(
            map((res: FormatResult[]) => res),
            tap((res: FormatResult[]) => res),
        );
    }
}

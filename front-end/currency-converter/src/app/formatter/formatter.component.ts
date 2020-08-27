import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SessionService } from '../shared/Services/session.service';
import { CurrenciesService } from '../shared/Services/currencies.service';
import * as FormatResultActions from '../shared/actions/FormatResult.action';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
@Component({
    selector: 'app-formatter',
    templateUrl: './formatter.component.html',
    styleUrls: ['./formatter.component.scss'],
})
export class FormatterComponent implements OnInit {
    value: number;
    @Input() proportion: number;
    @Input() currencyCode: string;

    constructor(private notification: NzNotificationService, private store: Store<AppState>, private currencyService: CurrenciesService) {}

    ngOnInit(): void {}
    format(): void {
        if (this.value === 0 || this.proportion === 0) {
            this.notification.error('error', 'proportion or input value is invalid');
            return;
        }
        var result = {
            sessionId: localStorage.getItem('sessionId'),
            result: Number(this.proportion * this.value),
            currencyCode: this.currencyCode,
        };

        this.currencyService.saveformattedResult(result).subscribe();
        this.store.dispatch(new FormatResultActions.AddFormatResult(result));
        this.notification.success('Success', 'Converted value is:' + Number(this.proportion * this.value).toString());
    }
}

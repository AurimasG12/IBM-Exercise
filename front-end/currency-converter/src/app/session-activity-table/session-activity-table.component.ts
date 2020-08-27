import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { CurrenciesService } from '../shared/Services/currencies.service';
import { FormatResult } from '../shared/Models/FormatResult';

@Component({
    selector: 'app-session-activity-table',
    templateUrl: './session-activity-table.component.html',
    styleUrls: ['./session-activity-table.component.scss'],
})
export class SessionActivityTableComponent implements OnInit {
    constructor(private store: Store<AppState>) {}
    activities: FormatResult[] = [];
    ngOnInit(): void {
        this.store.select('formatResult').subscribe(items => {
            this.activities = items;
        });
    }
}

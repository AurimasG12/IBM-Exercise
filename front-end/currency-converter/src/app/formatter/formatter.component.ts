import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'app-formatter',
    templateUrl: './formatter.component.html',
    styleUrls: ['./formatter.component.scss'],
})
export class FormatterComponent implements OnInit {
    value: number;
    @Input() proportion: number;

    constructor(private notification: NzNotificationService) {}

    ngOnInit(): void {}
    format(): void {
        if (this.value === 0 || this.proportion === 0) {
            this.notification.error('error', 'proportion or input value is invalid');
            return;
        }

        this.notification.success('Success', 'Converted value is:' + Number(this.proportion * this.value).toString());
    }
}

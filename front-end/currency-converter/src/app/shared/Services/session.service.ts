import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../Models/Session';
import { tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    constructor(private http: HttpClient) {}
    createSessionIfNotExist(): Observable<Session> {
        if (localStorage.getItem('sessionId') === null) {
            const session = {
                date: new Date().getTime(),
            };
            return this.http.post('http://localhost:3000/session/createSession', session).pipe(
                tap(
                    (response: Session) => localStorage.setItem('sessionId', response._id),
                    map((response: Session) => response),
                ),
            );
        } else {
            return;
        }
    }
}

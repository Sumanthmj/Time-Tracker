import { Injectable } from "@angular/core";
import { Timer } from "../models/timer.model";
import { Observable, map} from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: "root"})
export class TimerService {

    constructor(private http: HttpClient) {}

    getData(): Observable<Timer[]>{
        return this.http.get('http://localhost:3000/api/tasks').pipe(
            map(response => {
                return (response as any).data as Timer[];
            })
        );
    }

    add(task: Timer): Observable<Timer> {
        return this.http.post('http://localhost:3000/api/tasks', task).pipe(
            map(response => {
                return response as Timer;
            })
        );
    }

    update(task: Timer): Observable<Timer> {
        return this.http.put('http://localhost:3000/api/tasks', task).pipe(
            map(response => {
                return response as Timer;
            })
        );
    }

    delete(params: any): Observable<any>{
            return this.http.delete('http://localhost:3000/api/tasks', {params: params}).pipe(
            map(response => {
                return response;
            })
        )
    }
}
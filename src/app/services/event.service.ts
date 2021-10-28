import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Config} from "./config";
import {Observable} from "rxjs";
import  {Event}  from "./app-model";
import {Page} from "./page";

@Injectable()
export class EventService {
    constructor(public http: HttpClient,public config:Config ) { }

    search(term:string = '',page:number = 0,limit:number = 50):Observable<Page<Event>> {
        let url:string = this.config.api + "/rest/event/search";
        const params = new HttpParams()
        .set('page', String(page))
        .set('term',term)
        .set('limit',limit);
        return this.http.get<Page<Event>>(url, {params});
    }

    list():Observable<Array<Event>> {
        return this.http.get<Array<Event>>(this.config.api + "/rest/event");
    }

    save(model: Event):Observable<Event>{
        return this.http.post<Event>(this.config.api + "/rest/event", model);
    }

    getById(id: string):Observable<Event> {
        return this.http.get<Event>(this.config.api + "/rest/event/" + id);
    }

    removeById(id: string | null):Observable<any>{
        return this.http.delete<any>(this.config.api + "/rest/event/" + id);
    }
}

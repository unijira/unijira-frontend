import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ItemRoadmap } from 'src/app/models/item/ItemRoadmap';
import { Roadmap } from 'src/app/models/projects/Roadmap';
import { HttpService } from '../http-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {
  constructor( private http: HttpService) { }
  getBacklog(idProject: number): Observable<any>{
    return this.http.get<AnyCatcher>('/projects/'+idProject+'/backlogs')
  .pipe(catchError(e => of([])));
  }
  getRoadmap(idProject: number, idBacklog: number): Observable<any>{
    return this.http.get<AnyCatcher>('/projects/'+idProject+'/backlogs/'+idBacklog+'/roadmaps')
  .pipe(catchError(e => of([])));
  }
  addItem(item: ItemRoadmap){
    return this.http.post<ItemRoadmap>('/items',item);
  }
  addItemToRoadmap(idProject: number, idBacklog: number, idRoadmap: number, roadmap: Roadmap): Observable<any>{
    return this.http.post<AnyCatcher>('/projects/'+idProject+'/backlogs/'+idBacklog+'/roadmaps/'+idRoadmap+'/insertions',roadmap);
  }
}


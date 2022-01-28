import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Item } from 'src/app/models/item/Item';
import { ItemRoadmap } from 'src/app/models/item/ItemRoadmap';
import { ItemRoadmapTree } from 'src/app/models/item/itemRoadmapTree';
import { Roadmap } from 'src/app/models/projects/Roadmap';
import { HttpService } from '../http-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {
  constructor( private http: HttpService) { }
  getBacklog(idProject: number): Observable<any>{
    return this.http.get<AnyCatcher>('/projects/'+idProject+'/backlogs')
  }
  getRoadmap(idProject: number, idBacklog: number): Observable<any>{
    return this.http.get<AnyCatcher>('/projects/'+idProject+'/backlogs/'+idBacklog+'/roadmaps')
  }
  addItem(item: Item): Observable<Item>{
    return this.http.post<Item>('/items',item);
  }
  addItemToRoadmap(idProject: number, idBacklog: number, idRoadmap: number, roadmap: Roadmap): Observable<Roadmap >{
    return this.http.post<Roadmap>('/projects/'+idProject+'/backlogs/'+idBacklog+'/roadmaps/'+idRoadmap+'/insertions',roadmap);
  }
  getItemsOfTheRoadmap(idProject: number, idBacklog: number, idRoadmap: number): Observable<Array<ItemRoadmapTree>>{
    return this.http.get<Array<ItemRoadmapTree>>('/projects/'+idProject+'/backlogs/'+idBacklog+'/roadmaps/'+idRoadmap+'/tree');
  }
  public getItems(projectId: number): Observable<Item[]> {
    return this.http.get<Item[]>(`/projects/${projectId}/items`);
}
public editItem(idProject: number, idBacklog: number, idRoadmap: number, idItem: number, roadmapInsertion: Roadmap): Observable<Roadmap>{
  console.log(roadmapInsertion)
  return this.http.put<Roadmap>('/projects/'+idProject+'/backlogs/'+idBacklog+'/roadmaps/'+idRoadmap+'/insertions/'+idItem,roadmapInsertion);
}
}


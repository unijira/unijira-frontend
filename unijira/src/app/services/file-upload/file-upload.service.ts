import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';

import {from, Observable, switchMap} from 'rxjs';

export enum BasePath {
  project = 'project',
  user = 'user',
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private storage: AngularFireStorage) {}

  upload(id: number, scope: string, file: File, basePath: BasePath): Observable<string> {

    const path = `${basePath}/${id}/${scope}/${file.name}`;

    return from(this.storage.upload(path, file)).pipe(
      switchMap(_ => this.storage.ref(path).getDownloadURL()),
    );

  }

}

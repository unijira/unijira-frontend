import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';

import {from, Observable, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private basePath = '/projects';

  constructor(private storage: AngularFireStorage) {}

  upload(id: number, scope: string, file: File): Observable<string> {

    const path = `${this.basePath}/${id}/${scope}/${file.name}`;

    return from(this.storage.upload(path, file)).pipe(
      switchMap(_ => this.storage.ref(path).getDownloadURL()),
    );

  }

}

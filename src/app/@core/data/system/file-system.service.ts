import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class FileSystemService {
  private path = '/rest/files/file/'; // {file_id}
  constructor(private http: Http) {
  }
  public getFilePathById(file_id: string): Promise<any> {
    return this.http.get(this.path + file_id).toPromise();
  }
  public getFileUrlById(file_id: string): string {
    return this.path + file_id;
  }
}

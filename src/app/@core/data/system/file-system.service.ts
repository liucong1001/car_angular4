import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class FileSystemService {
  private path = '/rest/files/file/'; // {file_id}
  constructor(private http:HttpClient) {
  }
  public getFilePathById(file_id: string): Promise<any> {
    return this.http.get(this.path + file_id).toPromise();
  }
}

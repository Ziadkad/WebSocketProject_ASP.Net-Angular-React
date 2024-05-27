import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {
  private ws: WebSocket = new WebSocket("ws://10.5.235.99:8181")
  send(msg : string){
    this.ws.send("Ziad Angular a envoye : " +  msg );
  }
  receive(): Observable<any> {
    return new Observable(observer => {
      this.ws.onmessage = (message) => {
        observer.next(message.data);
      };
      this.ws.onerror = (error) => {
        observer.error(error);
      };
      this.ws.onclose = () => {
        observer.complete();
      };
      return () => {
        this.ws.close();
      };
    });
  }

}

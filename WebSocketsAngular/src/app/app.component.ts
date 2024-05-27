import { Component } from '@angular/core';
import { WebSocketsService } from './services/web-sockets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebSocketsAngular';
  messages: string[] = [];
  msg:string = "";
  constructor(private webSocketsService : WebSocketsService){}

  ngOnInit(){
    this.webSocketsService.receive().subscribe((data)=>{
      this.messages.push(data)
    })
  }
  
  sendMessage(){
    this.webSocketsService.send(this.msg)
  }
}

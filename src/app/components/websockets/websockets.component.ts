import { Component, OnInit } from '@angular/core';
import { CurbsideHubService } from 'src/app/services/curbside.hub.service';

@Component({
  selector: 'app-websockets',
  templateUrl: './websockets.component.html',
  styleUrls: ['./websockets.component.scss']
})
export class WebsocketsComponent implements OnInit {

  constructor(private hub:CurbsideHubService) { }

  ngOnInit(): void {
  }

}

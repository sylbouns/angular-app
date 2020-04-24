import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss']
})
export class FullscreenComponent implements OnInit {
  public icon: string = "fullscreen";

  constructor() { }

  ngOnInit(): void {
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(result => this.icon = "fullscreen_exit");
    } else {
      document.exitFullscreen().then(result => this.icon = "fullscreen");;
    }
  }

  onResize(event) {
    this.icon = !document.fullscreenElement ? "fullscreen" : "fullscreen_exit";
  }
}

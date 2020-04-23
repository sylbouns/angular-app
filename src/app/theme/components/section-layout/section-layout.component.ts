import { Component, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'section-layout',
  templateUrl: './section-layout.component.html',
  styleUrls: ['./section-layout.component.scss']
})
export class SectionLayoutComponent implements AfterViewInit {
  @ViewChild("header") headerRef: ElementRef<any>; 
  @ViewChild("left") leftRef: ElementRef<any>;  
  @ViewChild("right") rightRef: ElementRef<any>;  
  @ViewChild("footer") footerRef: ElementRef<any>; 

  public header: boolean = true; 
  public left: boolean = true; 
  public right: boolean = true; 
  public footer: boolean = true; 

  constructor(private changeDetectorRef:ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.updateView();
  }

  updateView() {
    this.header = !this.isEmpty(this.headerRef);
    this.left = !this.isEmpty(this.leftRef);
    this.right = !this.isEmpty(this.rightRef);
    this.footer = !this.isEmpty(this.footerRef);
    this.changeDetectorRef.detectChanges();
  }

  isEmpty(elt: ElementRef<any>) {
    return elt == undefined ? true : elt.nativeElement.childNodes.length == 0;
  }

}

import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive({
  selector: '[flexCell]'
})
export class FlexGridDirective implements OnInit {
  // Number of column per breakpoints : Xsmall, Small, Medium, Large, Xlarge
  @Input() responsiveCols: number[] = [1, 2, 3, 4, 5];

  private nativeElement: Node;
  private breakpoints: string[] = [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ];
  private sizeColBreakpoints: { [k: string]: string } = {};

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.nativeElement = this.elementRef.nativeElement;
    this.breakpoints.map((value, index) => this.sizeColBreakpoints[value] = Math.round(10000 / this.responsiveCols[index]) / 100 + "%");
    this.breakpointObserver.observe(this.breakpoints).subscribe(result => result.matches ? this.updateCellWidth(result.breakpoints) : false);
  }

  private updateCellWidth(breakpoints): void {
    Object.keys(breakpoints).map((breakpoint) => {
      breakpoints[breakpoint] ? this.renderer.setStyle(this.nativeElement, 'width', this.sizeColBreakpoints[breakpoint]) : false;
    });
  }

}

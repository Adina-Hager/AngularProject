import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighlightDirective {

  constructor(private el:ElementRef) { 
    // el.nativeElement.style.backgroundColor='blue';
  }
  // @Input('appHighlight') element:string;
  @HostListener('mouseenter')
  onMouseEnter(){
this.Highlight('yellow')
  }
  Highlight(color:string):void{
this.el.nativeElement.style.backgroundColor=color;
  }


  @HostListener('mouseleave')
  onMouseleave(){
this.Highlight('');
  }
 
  
}


import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: 'input,select',
  host: {'(blur)': 'onBlur($event)'}
})
export class BlurEventDirective {

  constructor(private elRef:ElementRef, private renderer:Renderer) {}

  onBlur($event) {
    this.renderer.invokeElementMethod(this.elRef.nativeElement, 
        'dispatchEvent', 
        [new CustomEvent('input-blur', { bubbles: true })]);
    // or just 
    // el.dispatchEvent(new CustomEvent('input-blur', { bubbles: true }));
    // if you don't care about webworker compatibility
  }

}

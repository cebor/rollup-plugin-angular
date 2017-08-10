import { Component } from '@angular/core';
/**
 * @Component({
 *  selector: 'example',
 *  templateUrl: './do-not-load-this-component.html'
 * })
 * export class ExampleComponent {}
 * @export
 * @class ExampleComponent
 * @implements {AfterViewChecked}
 */
@Component({
  selector: 'test',
  templateUrl: `./test.component.html`
})
export class TestComponent {
  constructor() {}
}

// import 'es6-shim';
import 'reflect-metadata';
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

// RxJS
import 'rxjs/Rx';

import { Component } from '@angular/core';
/**
 * @Component({
 *  selector: 'example-component',
 *  templateUrl: './../example-component.html'
 * })
 * export class ExampleComponent {}
 * @export
 * @class ExampleComponent
 * @implements {AfterViewChecked}
 */
@Component({
  selector: 'component',
  templateUrl: `./../component.html`
})
export class TestComponent {
  constructor() {}
}

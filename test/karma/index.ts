// import 'es6-shim';
import 'reflect-metadata';
import 'core-js/es6';
import 'core-js/es7/reflect';

// Typescript emit helpers polyfill
// require('ts-helpers');

import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

// RxJS
import 'rxjs/Rx';

import * as browser from '@angular/platform-browser-dynamic/testing';
import * as testing from '@angular/core/testing';

testing.TestBed.initTestEnvironment(
  browser.BrowserDynamicTestingModule,
  browser.platformBrowserDynamicTesting()
);
Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;

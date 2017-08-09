
// external
import { DebugElement, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

// internal
import { TestComponent } from './test.component';
import { TestUserComponent } from './test-user.component';

beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});

describe('TestComponent', () => {

  let comp: TestComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<TestComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        TestUserComponent
      ]
    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);

    // get from fixture
    comp = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    debugElement = fixture.debugElement;
  });

  it('should be defined', async(() => {
    expect(fixture).toBeDefined();
    expect(comp).toBeTruthy();
    console.info(fixture.componentRef);
  }));
  it('should have test.component.html loaded', async(() => {
    expect(nativeElement.textContent).toContain('test.component.html loaded');
  }));
  it('should have test.component.html loaded', async(() => {
    expect(nativeElement.textContent).toContain('test-user.component.html content loaded');
  }));
});

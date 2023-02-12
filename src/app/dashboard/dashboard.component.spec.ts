import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [DashboardComponent],
      providers: [HeroService],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a heading', () => {
    const element = fixture.debugElement.query(
      By.css('[data-test-id="dashboard-heading"]'),
    );
    expect(element?.nativeElement?.textContent).toBe('Top Heroes');
  });

  it('should contain top 4 heroes name', () => {
    const heroService = TestBed.inject(HeroService);
    const spy = jest.spyOn(heroService, 'getHeroes');
    spy.mockReturnValue(of(HEROES));

    component.ngOnInit();
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('h4'));
    const top4Heroes = HEROES.slice(1, 5);
    const elementsWithText = elements.filter((element) =>
      top4Heroes.filter(
        ({ name }) => name === element.nativeElement.textContent.trim(),
      ),
    );

    elementsWithText.forEach((value, index) => {
      expect(value.nativeElement.textContent.trim()).toBe(
        top4Heroes[index].name,
      );
    });

    expect(elementsWithText.length).toBe(4);
  });

  it('should handle error if getHeroes throws error', () => {
    const heroService = TestBed.inject(HeroService);
    const spy = jest.spyOn(heroService, 'getHeroes');
    spy.mockReturnValue(throwError(() => new Error('error')));

    component.ngOnInit();
    fixture.detectChanges();

    const element = fixture.debugElement.query(
      By.css('[data-test-id="error-banner"]'),
    );

    expect(element?.nativeElement?.textContent).toBe('Something Went Wrong!');
  });
});

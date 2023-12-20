import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from "../hero.service";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";
import { Router } from "@angular/router";

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick(){
    this.navigatedTo = this.linkParams;
  }
}

describe("Heroes deep test", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockheroService;
  let heroes = [
    { id: 1, name: "hero 1", strength: 8 },
    { id: 2, name: "hero 2", strength: 5 },
    { id: 3, name: "hero 3", strength: 3 },
  ];

  beforeEach(() => {
    mockheroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);
    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent, 
        HeroComponent,
        RouterLinkDirectiveStub
      ],
      providers: [{ provide: HeroService, useValue: mockheroService }],
      // schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should render each hero as hero component", () => {
    mockheroService.getHeroes.and.returnValue(of(heroes));

    //run ng oninit
    fixture.detectChanges();

    const heroComponentsDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponentsDEs.length).toEqual(3);
    for (let i = 0; i < heroComponentsDEs.length; i++) {
      expect(heroComponentsDEs[i].componentInstance.hero.name).toEqual(
        heroes[i].name
      );
    }
  });

  it(`should call heroservice.deleteservice when the hero component's delete button is clicked`, () => {
    spyOn(fixture.componentInstance, "delete");
    mockheroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    heroComponents[1]
      .query(By.css("button"))
      .triggerEventHandler("click", { stopPropagation: () => {} });

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[1]);
  });

  it(`should call heroservice.deleteservice when the hero component's delete button is clicked 2nd Approach`, () => {
    spyOn(fixture.componentInstance, "delete");
    mockheroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
    // heroComponents[0].triggerEventHandler('delete', null);
      
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);
  });

  it(`should add new hero when add button is clicked`, () => {
    mockheroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    const name ='Mr Nice';
    mockheroService.addHero.and.returnValue(of({ id: 4, name: 'Mr Nice', strength: 5 }));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
    
    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

    expect(heroText).toContain(name);
  });

  it("it should have the correct route for hero", () => {
    mockheroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    let routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css("a")).triggerEventHandler("click", null);
    expect(routerLink.navigatedTo).toBe("/detail/1");
  });

});

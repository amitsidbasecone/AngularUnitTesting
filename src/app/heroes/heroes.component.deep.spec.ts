import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from "../hero.service";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe("Heroes deep test", () => {
  
  let fixture: ComponentFixture<HeroesComponent>;
  let mockheroService;
  let heroes = [
    { id: 1, name: "hero 1", strength: 8 },
    { id: 2, name: "hero 2", strength: 5 },
    { id: 3, name: "hero 3", strength: 3 },
  ];

  beforeEach(()=> {
    mockheroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero'])
    TestBed.configureTestingModule({
      declarations: [HeroesComponent,
        HeroComponent
      ],
      providers: [ 
        { provide: HeroService, useValue : mockheroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture= TestBed.createComponent(HeroesComponent);
  })

  it('should render each hero as hero component', ()=> {
    mockheroService.getHeroes.and.returnValue(of(heroes));

    //run ng oninit
    fixture.detectChanges();

    const heroComponentsDEs= fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentsDEs.length).toEqual(3);
    for(let i=0; i< heroComponentsDEs.length; i++){
      expect(heroComponentsDEs[i].componentInstance.hero.name).toEqual(heroes[i].name);  
    }
  })

});

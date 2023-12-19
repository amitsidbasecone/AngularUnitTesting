import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from "../hero.service";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe("Heroes shallow Component", () => {
  
  let fixture: ComponentFixture<HeroesComponent>;
  let mockheroService;
  let heroes = [
    { id: 1, name: "hero 1", strength: 8 },
    { id: 2, name: "hero 2", strength: 5 },
    { id: 3, name: "hero 3", strength: 3 },
  ];

  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    // @Output() delete = new EventEmitter();
  }
  

  beforeEach(()=> {
    mockheroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero'])
    TestBed.configureTestingModule({
      declarations: [HeroesComponent,
      FakeHeroComponent],
      providers: [ 
        { provide: HeroService, useValue : mockheroService }
      ],
      //schemas: [NO_ERRORS_SCHEMA]
    })
    fixture= TestBed.createComponent(HeroesComponent);
    
  })

  it('should set heroes correctly returned from service', ()=> {
    mockheroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(3);
  })

  it('should have three lis one for each hero', ()=> {
    mockheroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  })

});

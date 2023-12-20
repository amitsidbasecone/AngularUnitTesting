import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from "@angular/core/testing"
import { HeroDetailComponent } from "./hero-detail.component"
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { findIndex } from "rxjs/operators";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('HeroDetailsComponent', ()=>{
  let mockHeroService;
  let mockActivatedRoute;
  let mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(()=>{
    mockHeroService = jasmine.createSpyObj(['getHero','updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    mockActivatedRoute = {
      snapshot: { paramMap: { get: ()=> {return '3';} } }
    };
    TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations:[HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocation}
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(of({id: 5, name: 'Nice', strength: 100}));
  })

  it('should render hero Name in a h2 tag',()=>{
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('NICE');
  });

  it('should call updatehero when save is called ',fakeAsync(()=> {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();
    // tick(250);
    flush();
    expect(mockHeroService.updateHero).toHaveBeenCalled();
    
  }));

  it('should call updatehero when save is called ', waitForAsync(()=> {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();
    fixture.whenStable().then(()=> {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    })
  }));

})
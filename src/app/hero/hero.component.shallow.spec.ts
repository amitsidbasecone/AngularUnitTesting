import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroComponent } from "./hero.component"
import { RouterModule } from "@angular/router";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('HeroComponent Shallow Test', ()=> {
  let fixture: ComponentFixture<HeroComponent>;

    beforeEach(()=>{
      TestBed.configureTestingModule({
        declarations: [HeroComponent],
        schemas: [NO_ERRORS_SCHEMA]
      });

      fixture = TestBed.createComponent(HeroComponent);
      
    });

    it('should have the correct hero', ()=>{
      fixture.componentInstance.hero = { id: 1, name: 'Super Dude', strength: 9};
      fixture.detectChanges();
      expect(fixture.componentInstance.hero.name).toBe('Super Dude');
    });

    it('it should render hero name', ()=>{
      fixture.componentInstance.hero = { id: 1, name: 'Super Dude', strength: 9};
      fixture.detectChanges();

      let de = fixture.debugElement.query(By.css('a')).nativeElement;

      expect(de.textContent).toContain('Super Dude');
      expect(fixture.nativeElement.querySelector('a').textContent).toContain('Super Dude');
    });
})
import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";

describe("Heroes Component", () => {
  let component: HeroesComponent;
  let heroes;
  let mockheroservice;

  beforeEach(() => {
    heroes = [
      { id: 1, name: "hero 1", strength: 8 },
      { id: 2, name: "hero 2", strength: 5 },
      { id: 3, name: "hero 3", strength: 3 },
    ];
  });

  mockheroservice = jasmine.createSpyObj([
    "getHeroes",
    "addHero",
    "deleteHero",
  ]);

  component = new HeroesComponent(mockheroservice);

  describe("Delete", () => {
    it("it should delete hero from heroes list", () => {
      mockheroservice.deleteHero.and.returnValue(of(true));
      component.heroes = heroes;
      component.delete(heroes[2]);
      expect(component.heroes.length).toBe(2);
    });

    it('should call deleteHero', ()=>{
      mockheroservice.deleteHero.and.returnValue(of(true));
      component.heroes = heroes;
      component.delete(heroes[2]);
      expect(mockheroservice.deleteHero).toHaveBeenCalledWith(heroes[2]);
      expect(mockheroservice.deleteHero).toHaveBeenCalledTimes(2);
    })
  });
});

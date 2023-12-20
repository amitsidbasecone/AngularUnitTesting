import { TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service"
import { MessageService } from "./message.service";
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('Hero Service', ()=>{
  let mockMessageService;

  beforeEach(() => {
    mockMessageService= jasmine.createSpyObj(['add'])
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService
      ]
    })
  })

})
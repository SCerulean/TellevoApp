import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LrouteService } from 'src/app/services/lroute.service';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let lservice;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    lservice = jasmine.createSpyObj('LrouteService',{
      id: 26,
      nombre: 'JEREMY ZUNIGA SEPULVEDA',
      username: 'jere.zuniga',
      password: '123456'
    })
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot(),LrouteService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));



  it('should create', () => {
    

    expect(component.ingresar()).toBeTruthy();
  });

});

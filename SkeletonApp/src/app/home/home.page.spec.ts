import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { WeatherService } from '../services/weather.service';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let weatherService: WeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: WeatherService,
          useValue: { getForecast: jasmine.createSpy().and.returnValue(of({})) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService);
    fixture.detectChanges();
  });

  it('should create the HomePage', () => {
    expect(component).toBeTruthy();
  });

  it('should call getForecast on ionViewDidEnter', () => {
    component.ionViewDidEnter();
    expect(weatherService.getForecast).toHaveBeenCalledWith(-33.45, -70.66);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantencionPage } from './mantencion.page';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MantencionPage', () => {
  let component: MantencionPage;
  let fixture: ComponentFixture<MantencionPage>;
  let modalController: ModalController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MantencionPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: { create: () => Promise.resolve() } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MantencionPage);
    component = fixture.componentInstance;
    modalController = TestBed.inject(ModalController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Puedes agregar más pruebas aquí.
});

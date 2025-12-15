import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { AuthService } from '../../services/auth.service';
import { SQLiteService } from '../../services/sqlite.service';
import { SessionService } from '../../services/session.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

describe('RegisterPage', () => {
  let fixture: ComponentFixture<RegisterPage>;
  let component: RegisterPage;

  //  Mock Storage (mínimo necesario)
  const storageMock: Partial<Storage> = {
    create: jasmine.createSpy('create').and.resolveTo(null as any),
    get: jasmine.createSpy('get').and.resolveTo(null),
    set: jasmine.createSpy('set').and.resolveTo(),
    remove: jasmine.createSpy('remove').and.resolveTo(),
  };

  //  Mock Router
  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  // Mock ToastController
  const toastCtrlMock = {
    create: jasmine.createSpy('create').and.resolveTo({
      present: jasmine.createSpy('present').and.resolveTo(),
    }),
  };

  //  Mock SQLiteService para que AuthService.register/login no toque SQLite real
  const sqliteMock = jasmine.createSpyObj<SQLiteService>('SQLiteService', [
    'registerUser',
    'getUserByUsername',
  ]);
  sqliteMock.registerUser.and.resolveTo();
  sqliteMock.getUserByUsername.and.resolveTo(null);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPage], // standalone
      providers: [
        { provide: Storage, useValue: storageMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastController, useValue: toastCtrlMock },
        { provide: SQLiteService, useValue: sqliteMock },
        SessionService,
        AuthService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

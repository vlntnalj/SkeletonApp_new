import { TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

class RouterMock {
  navigateByUrl = jasmine.createSpy('navigateByUrl');
}

class ToastControllerMock {
  create = jasmine.createSpy('create').and.callFake(async (opts: any) => ({
    present: jasmine.createSpy('present'),
    ...opts,
  }));
}

describe('LoginPage', () => {
  let page: LoginPage;
  let auth: any;
  let router: RouterMock;
  let toast: ToastControllerMock;

  beforeEach(async () => {
    auth = { login: jasmine.createSpy('login') };
    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useClass: RouterMock },
        { provide: ToastController, useClass: ToastControllerMock },
        { provide: AuthService, useValue: auth },
      ],
    }).compileComponents();

    router = TestBed.inject(Router) as any;
    toast = TestBed.inject(ToastController) as any;

    page = new LoginPage(router as any, auth as any, toast as any);
  });

  it('debe mostrar toast si faltan credenciales', async () => {
    page.username = '';
    page.password = '';
    await page.ingresar();
    expect(toast.create).toHaveBeenCalled();
    expect(auth.login).not.toHaveBeenCalled();
  });

  it('debe mostrar toast si login falla', async () => {
    page.username = 'u1';
    page.password = 'x';
    auth.login.and.resolveTo(false);

    await page.ingresar();
    expect(toast.create).toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('debe navegar a /tabs/home si login ok', async () => {
    page.username = 'u1';
    page.password = 'pass';
    auth.login.and.resolveTo(true);

    await page.ingresar();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/tabs/home', { replaceUrl: true });
  });
});

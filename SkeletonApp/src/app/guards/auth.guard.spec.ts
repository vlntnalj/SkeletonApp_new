import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { SessionService } from '../services/session.service';

describe('authGuard', () => {
  let sessionSpy: jasmine.SpyObj<SessionService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    sessionSpy = jasmine.createSpyObj<SessionService>('SessionService', ['isLoggedIn']);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        { provide: SessionService, useValue: sessionSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  it('debe permitir acceso si está logueado', async () => {
    sessionSpy.isLoggedIn.and.resolveTo(true);

    const result = await TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect(result).toBeTrue();
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('debe bloquear y redirigir a /login si NO está logueado', async () => {
    sessionSpy.isLoggedIn.and.resolveTo(false);

    const result = await TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect(result).toBeFalse();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});

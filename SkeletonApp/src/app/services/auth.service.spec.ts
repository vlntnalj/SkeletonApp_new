import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { SQLiteService } from './sqlite.service';
import { SessionService } from './session.service';

describe('AuthService', () => {
  let service: AuthService;

  let sqliteSpy: jasmine.SpyObj<SQLiteService>;
  let sessionSpy: jasmine.SpyObj<SessionService>;

  beforeEach(() => {
    sqliteSpy = jasmine.createSpyObj<SQLiteService>('SQLiteService', [
      'registerUser',
      'getUserByUsername',
    ]);

    sessionSpy = jasmine.createSpyObj<SessionService>('SessionService', [
      'setCurrentUser',
      'clearSession',
      'isLoggedIn',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: SQLiteService, useValue: sqliteSpy },
        { provide: SessionService, useValue: sessionSpy },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('register: debe llamar sqlite.registerUser con los datos mapeados', async () => {
    sqliteSpy.registerUser.and.resolveTo();

    await service.register({
      nombre: 'Juan',
      usuario: 'juan1',
      email: 'juan@mail.com',
      telefono: '123',
      fechaNacimiento: '2000-01-01',
      direccion: 'Calle 1',
      password: '123456',
      photoBase64: 'data:image/png;base64,AAA',
    });

    expect(sqliteSpy.registerUser).toHaveBeenCalledWith({
      nombre: 'Juan',
      username: 'juan1',
      email: 'juan@mail.com',
      telefono: '123',
      fechaNacimiento: '2000-01-01',
      direccion: 'Calle 1',
      password: '123456',
      photoBase64: 'data:image/png;base64,AAA',
    });
  });

  it('login: debe retornar false si no existe usuario', async () => {
    sqliteSpy.getUserByUsername.and.resolveTo(null);

    const ok = await service.login('x', 'y');

    expect(ok).toBeFalse();
    expect(sessionSpy.setCurrentUser).not.toHaveBeenCalled();
  });

  it('login: debe retornar false si password no coincide', async () => {
    sqliteSpy.getUserByUsername.and.resolveTo({
      id: 1,
      username: 'juan1',
      nombre: 'Juan',
      email: 'juan@mail.com',
      password: 'OTRA',
      photo_base64: null,
    } as any);

    const ok = await service.login('juan1', '123456');

    expect(ok).toBeFalse();
    expect(sessionSpy.setCurrentUser).not.toHaveBeenCalled();
  });

  it('login: debe guardar sesión y retornar true si credenciales OK', async () => {
    sqliteSpy.getUserByUsername.and.resolveTo({
      id: 7,
      username: 'juan1',
      nombre: 'Juan',
      email: 'juan@mail.com',
      password: '123456',
      photo_base64: 'data:image/png;base64,AAA',
    } as any);

    sessionSpy.setCurrentUser.and.resolveTo();

    const ok = await service.login('juan1', '123456');

    expect(ok).toBeTrue();
    expect(sessionSpy.setCurrentUser).toHaveBeenCalledWith({
      id: 7,
      username: 'juan1',
      nombre: 'Juan',
      email: 'juan@mail.com',
      photoBase64: 'data:image/png;base64,AAA',
    });
  });

  it('logout: debe limpiar sesión', async () => {
    sessionSpy.clearSession.and.resolveTo();

    await service.logout();

    expect(sessionSpy.clearSession).toHaveBeenCalled();
  });

  it('isLoggedIn: debe delegar en SessionService', async () => {
    sessionSpy.isLoggedIn.and.resolveTo(true);

    const ok = await service.isLoggedIn();

    expect(ok).toBeTrue();
    expect(sessionSpy.isLoggedIn).toHaveBeenCalled();
  });
});

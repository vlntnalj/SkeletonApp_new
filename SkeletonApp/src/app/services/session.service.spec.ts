import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;

  const storageMock = {
    create: jasmine.createSpy('create').and.resolveTo(),
    set: jasmine.createSpy('set').and.resolveTo(),
    get: jasmine.createSpy('get').and.resolveTo(null),
    remove: jasmine.createSpy('remove').and.resolveTo(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionService,
        { provide: Storage, useValue: storageMock },
      ],
    });

    service = TestBed.inject(SessionService);
  });

  it('debe inicializar storage.create() al construirse', async () => {
    // al crear el servicio, init() corre en constructor
    // damos un microtick para que ejecute la promesa
    await Promise.resolve();

    expect(storageMock.create).toHaveBeenCalled();
  });

  it('setCurrentUser: debe setear current_user', async () => {
    await service.setCurrentUser({ id: 1 });

    expect(storageMock.set).toHaveBeenCalledWith('current_user', { id: 1 });
  });

  it('getCurrentUser: debe obtener current_user', async () => {
    storageMock.get.and.resolveTo({ id: 2 });

    const u = await service.getCurrentUser();

    expect(storageMock.get).toHaveBeenCalledWith('current_user');
    expect(u).toEqual({ id: 2 });
  });

  it('clearSession: debe remover current_user', async () => {
    await service.clearSession();

    expect(storageMock.remove).toHaveBeenCalledWith('current_user');
  });

  it('isLoggedIn: debe retornar false si no hay user', async () => {
    storageMock.get.and.resolveTo(null);

    const ok = await service.isLoggedIn();

    expect(ok).toBeFalse();
  });

  it('isLoggedIn: debe retornar true si hay user', async () => {
    storageMock.get.and.resolveTo({ id: 10 });

    const ok = await service.isLoggedIn();

    expect(ok).toBeTrue();
  });
});

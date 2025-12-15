describe('Guard', () => {
  it('si no hay sesión redirige a /login', () => {
    cy.visit('/tabs/home');
    cy.location('pathname').should('include', '/login');
  });

  it('si hay sesión permite entrar a /tabs/home', () => {
    cy.visit('/login');

    // Fuerza sesión “mock” en Storage web: si tu SessionService usa Ionic Storage,
    // lo más simple en E2E es exponer un helper. Si no lo tienes, usa localStorage
    // y haz que SessionService lo lea en modo web (solo para test).
    cy.window().then((win) => {
      win.localStorage.setItem('current_user', JSON.stringify({ id: 1, username: 'u1' }));
    });

    cy.visit('/tabs/home');
    cy.location('pathname').should('include', '/tabs/home');
  });
});

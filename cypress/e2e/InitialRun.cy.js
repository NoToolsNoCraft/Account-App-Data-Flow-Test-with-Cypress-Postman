describe('User Signup and Logout Flow', () => {
  const baseUrl = 'https://account-manager-app-express-mong-production.up.railway.app';

  it('Should navigate, create an account, and log out successfully', () => {
    // Navigate to the homepage
    cy.visit(baseUrl);

    // Click on the "Create a new account" button
    cy.contains('a', 'Create a new account').click();

    // Insert "CypressUsername" in the name field
    cy.get('input[name="name"]').type('CypressUsername');

    // Insert "CypressPassword" in the password field
    cy.get('input[name="password"]').type('CypressPassword');

    // Click on the submit button
    cy.get('input[type="submit"]').click();

    // Verify that the main headline of the page says "Dashboard"
    cy.get('h1').should('have.text', 'Dashboard');

    // Verify that the hello message contains the proper username
    cy.get('h2').should('have.text', 'Hello CypressUsername');

    // Click the logout button
    cy.get('form[action="/logout"] button[type="submit"]').click();

    // Verify that Cypress has landed on the login page
    cy.url().should('eq', `${baseUrl}/`);
  });
});

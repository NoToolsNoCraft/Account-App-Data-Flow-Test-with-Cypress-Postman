describe('Password Change Verification', () => {
    it('Negative Test - Login with Old Password', () => {
      // Navigate to login page
      cy.visit('https://account-manager-app-express-mong-production.up.railway.app');
  
      // Input old credentials
      cy.get('input[name="name"]').type('CypressUsername');
      cy.get('input[name="password"]').type('CypressPassword');
  
      // Click the Submit button
      cy.get('input.sub').click();
  
      // Verify that the login page remains and displays "Incorrect password"
      cy.url().should('eq', 'https://account-manager-app-express-mong-production.up.railway.app/login');
      cy.contains('Incorrect password').should('be.visible');
    });
  
    it('Positive Test - Login with New Password', () => {
      // Navigate to login page
      cy.visit('https://account-manager-app-express-mong-production.up.railway.app');
  
      // Input correct credentials (new password)
      cy.get('input[name="name"]').type('CypressUsername');
      cy.get('input[name="password"]').type('PasswordChanged');
  
      // Click the Submit button
      cy.get('input.sub').click();
  
      // Verify that the dashboard page loads
      cy.url().should('include', '/login');
      
      // Check if "Dashboard" and the correct username are visible
      cy.contains('Dashboard').should('be.visible');
      cy.contains('Hello CypressUsername').should('be.visible');

       // Click the Delete Account button
    cy.get('form#deleteForm').within(() => {
        cy.get('button[type="submit"]').click();
      });
  
      // Confirm the delete action on the pop-up
      cy.on('window:confirm', (text) => {
        expect(text).to.contains('Are you sure you want to delete your account?');
        return true; // Confirm the deletion
      });
  
      // Verify that after confirmation, the user lands on the account deletion confirmation page
      cy.url().should('eq', 'https://account-manager-app-express-mong-production.up.railway.app/delete-account');
      cy.contains('Your account has been successfully deleted.').should('be.visible');
      cy.contains('Go back to the login page').should('be.visible');
    });
  });
  
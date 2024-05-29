import { BasePage } from "../pageObjects/basePage";

export class HomePage extends BasePage {
  static get url() {
    return "/#/";
  }

  static get dismissButton() {
    return cy.get("[aria-label='Close Welcome Banner']");
  }

  static get meWantItButton() {
    return cy.get("[aria-label='dismiss cookie message']");
  }

  static performLogin(email, password) {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.contains('button[type="submit"]', 'Log in').click();
  }

  static pressAccountButton() {
    cy.contains('button', 'Account').click();
  }

  static openLoginMenu() {
    cy.contains('.mat-menu-content', 'Login').click();
  }

  static enterLoginCredentials(email, password) {
    cy.get('[aria-label="Email address field"]').type(email);
    cy.get('[aria-label="Field for the password"]').type(password); 
    cy.get('[aria-label="Field to confirm the password"]').type(password);  
  }

  static openSecurityQuestionDropdown() {
    cy.get('[aria-label="Selection list for the security question"]').click();
  }

  static chooseSecurityQuestion(question) {
    cy.contains('mat-option', question).click();
  }

  static inputSecurityAnswer(answer) {
    cy.get('#securityAnswerControl').type(answer);
  }

  static submitRegistrationForm() {
    cy.get('#registerButton').should('not.be.disabled').click();
  }

  static navigateToUserProfile() {
    this.pressAccountButton();
    cy.get('button[aria-label="Go to user profile"]')
      .contains('span', 'demo')
      .should('be.visible')
      .click();
  }

  static clickCustomerLink(text) {
    cy.get('a').contains(text).click();
  }

  static pressSearchIcon() {
    cy.get('.mat-search_icon-search').click(); 
  }

  static findProduct(productName) {
    this.pressSearchIcon(); 
    cy.get('#mat-input-0').type(`${productName}{enter}`); 
  }

  static clickOnProductImageByName(productName) {
    cy.get(`img[alt="${productName}"]`).should('be.visible').click();
  }

  static verifyProductDescription(productName, description) {
    cy.contains('.product-card', productName).within(() => {
        cy.get('.product-description').should('contain', description);
    });
  }

  static checkProductImageUrl(productName, imageUrl) {
    cy.get(`img[alt="${productName}"]`)
        .should('have.attr', 'src', imageUrl)
        .and('be.visible');
  }

  static ensureProductNameVisible(productName) {
    cy.get('h1').contains(productName).should('be.visible');
  }

  static ensureProductDescriptionVisible(description) {
    cy.get('div').contains(description).should('be.visible');
  }

  static ensureProductPriceVisible(price) {
    cy.get('p.item-price').contains(price).should('be.visible');
  }

  static closeProductDetails() {
    cy.get('button[mat-dialog-close]').click();
  }

  static clickOnProductImageByEscapedName(productName) {
    const escapedProductName = productName.replace(/"/g, '\\"');
    cy.get(`img[alt="${escapedProductName}"]`).click();
  }

  static expandReviewsSection() {
    cy.get('[aria-label="Expand for Reviews"]').click().should('be.visible');
  }

  static enterReviewText(reviewText) {
    cy.get('textarea[aria-label="Text field to review a product"]').click().wait(100).type(reviewText);
  }

  static submitProductReview() {
    cy.get('#submitButton', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }

  static verifyProductCardAmount(expectedAmount) {
    cy.get('.mat-select-value-text').should('contain', expectedAmount);
  }

  static selectDropdownValue(optionText) {
    cy.get('.mat-select-arrow').click();
    cy.contains('.mat-option-text', optionText).click();
  }

  static addItemToBasket() {
    cy.get('[aria-label="Add to Basket"]').click();
  }

  static navigateToBasketPage() {
    cy.get('[aria-label="Show the shopping cart"]').click();
  }

  static clickCheckoutButton() {
    cy.get('#checkoutButton').click();
  }

  static submitAddress() {
    cy.get('label.mat-radio-label').click();
  }

  static proceedToPaymentSelection() {
    cy.get('[aria-label="Proceed to payment selection"]').click();
  }

  static selectDeliveryMethodByName(deliveryMethodName) {
    cy.contains('mat-cell.mat-cell.cdk-cell.cdk-column-Name.mat-column-Name', deliveryMethodName).click();
  }

  static proceedToDeliveryMethodSelection() {
    cy.get('[aria-label="Proceed to delivery method selection"]').click();
  }

  static selectPaymentCardAndRadio() {
    cy.get('.mat-row').contains('5678').click().then(() => {
      cy.get('.mat-radio-inner-circle').click();
    });
  }

  static proceedToReviewOrder() {
    cy.get('[aria-label="Proceed to review"]').click();
  } 

  static completePurchase() {
    cy.get('[aria-label="Complete your purchase"]').click();
  } 

  static verifyOrderConfirmation() {
      cy.contains('.confirmation', 'Thank you for your purchase!').should('be.visible');
  }

  static navigateToPrivacyAddressSettings() {
    cy.get('button[aria-label="Show Orders and Payment Menu"]').click();
    cy.get('button[aria-label="Go to saved address page"]').click();
  }

  static pressAddNewAddressButton() {
    cy.get('button[aria-label="Add a new address"]').click();
  }

  static fillNewAddressForm(country, name, mobileNumber, zipCode, address, city, state) {
      cy.get('input[placeholder="Please provide a country."]').type(country);
      cy.get('input[placeholder="Please provide a name."]').type(name);
      cy.get('input[placeholder="Please provide a mobile number."]').type(mobileNumber);
      cy.get('input[placeholder="Please provide a ZIP code."]').type(zipCode);
      cy.get('textarea[placeholder="Please provide an address."]').type(address);
      cy.get('input[placeholder="Please provide a city."]').type(city);
      cy.get('input[placeholder="Please provide a state."]').type(state);
  }

  static navigateToPrivacyPaymentSettings() {
    cy.get('button[aria-label="Show Orders and Payment Menu"]').click();
    cy.get('button[aria-label="Go to saved payment methods page"]').click();
  }

  static pressAddNewCardButton() {
    return cy.get('mat-expansion-panel');
  }
}

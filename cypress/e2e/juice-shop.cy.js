import { HomePage } from "../pageObjects/HomePage";
import { PaymentMethods } from "../pageObjects/PaymentsMethodPage";

describe("Juice-shop scenarios", () => {
  context("Without auto login", () => {
    beforeEach(() => {
      HomePage.visit();
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });

    it("User Login", () => {
      HomePage.visit();
      HomePage.pressAccountButton();
      HomePage.openLoginMenu();
      HomePage.performLogin('demo', 'demo');
      HomePage.navigateToUserProfile();
    });

    it("User Registration", () => {
      HomePage.visit();
      HomePage.meWantItButton.click();
      HomePage.pressAccountButton();
      HomePage.openLoginMenu();
      cy.get('a').contains('Not yet a customer?').click();
      HomePage.enterLoginCredentials("demo@demo.com","demo123");
      HomePage.openSecurityQuestionDropdown();
      HomePage.chooseSecurityQuestion('Name of your favorite pet?');
      HomePage.inputSecurityAnswer('Fluffy');
      HomePage.submitRegistrationForm();
    });
  });

  context("With auto login", () => {
    beforeEach(() => {
      cy.login("demo", "demo");
    });

    it("Search and validate Lemon", () => {
      HomePage.visit();
      HomePage.pressSearchIcon();
      HomePage.findProduct("Lemon");
      HomePage.clickOnProductImageByName("Lemon Juice (500ml)");
      HomePage.ensureProductNameVisible('Lemon Juice (500ml)');
      HomePage.ensureProductDescriptionVisible('Sour but full of vitamins.');
      HomePage.visit();
    });

    it("Search 500ml and validate Lemon", () => {
      HomePage.pressSearchIcon();
      HomePage.findProduct("500ml");
      HomePage.clickOnProductImageByName("Lemon Juice (500ml)");
      HomePage.ensureProductNameVisible('Lemon Juice (500ml)');
      HomePage.ensureProductDescriptionVisible('Sour but full of vitamins.');
      HomePage.visit();
    });

    it("Search 500ml and validate cards", () => {
      HomePage.pressSearchIcon();
      HomePage.findProduct("500ml");
      HomePage.clickOnProductImageByName("Eggfruit Juice (500ml)");
      HomePage.ensureProductDescriptionVisible('Now with even more exotic flavour.');
      HomePage.closeProductDetails();
      HomePage.clickOnProductImageByName("Lemon Juice (500ml)");
      HomePage.ensureProductDescriptionVisible('Sour but full of vitamins.');
      HomePage.closeProductDetails();
      HomePage.clickOnProductImageByName("Strawberry Juice (500ml)");
      HomePage.ensureProductDescriptionVisible('Sweet & tasty!');
      HomePage.visit();
    });

    it("Read a review", () => {
      HomePage.pressSearchIcon();
      HomePage.findProduct("King");
      HomePage.clickOnProductImageByEscapedName('OWASP Juice Shop "King of the Hill" Facemask');
      HomePage.expandReviewsSection();
      HomePage.visit();
    });

    it("Add a review", () => {
      HomePage.pressSearchIcon();
      HomePage.findProduct("Raspberry");
      HomePage.clickOnProductImageByEscapedName('Raspberry Juice (1000ml)');
      HomePage.expandReviewsSection();
      HomePage.enterReviewText("Tastes like metal");
      HomePage.expandReviewsSection();
      HomePage.submitProductReview();
      HomePage.visit();
    });

    it("Validate product card amount", () => {
      HomePage.visit();
      HomePage.verifyProductCardAmount('12');
      HomePage.selectDropdownValue('24');
      HomePage.verifyProductCardAmount('24');
      HomePage.selectDropdownValue('36');
      HomePage.verifyProductCardAmount('36');
    });

    it("Buy Girlie T-shirt", () => {
      HomePage.visit();
      HomePage.pressSearchIcon();
      HomePage.findProduct("Girlie");
      HomePage.addItemToBasket();
      HomePage.navigateToBasketPage();
      HomePage.clickCheckoutButton();
      HomePage.submitAddress();
      HomePage.proceedToPaymentSelection();
      HomePage.selectDeliveryMethodByName('Standard Delivery');
      HomePage.proceedToDeliveryMethodSelection();
      HomePage.selectPaymentCardAndRadio();
      HomePage.proceedToReviewOrder();
      HomePage.completePurchase();
      HomePage.verifyOrderConfirmation();
    });

    it("Add address", () => {
      HomePage.visit();
      HomePage.pressAccountButton();
      HomePage.navigateToPrivacyAddressSettings();
      HomePage.pressAddNewAddressButton();
      HomePage.fillNewAddressForm('CountryName', 'John Doe', '1234567890', '12345', '123 Main St', 'CityName', 'StateName');
      HomePage.submitProductReview();
    });

    it.only("Add payment option", () => {
      HomePage.visit();
      HomePage.pressAccountButton();
      HomePage.navigateToPrivacyPaymentSettings();
      PaymentMethods.addNewCardBtn.click();
      PaymentMethods.nameTxtField.type("Name Surname");
      PaymentMethods.cardNumberTxtField.type("1111222233334444");
      PaymentMethods.exipreMonthTxtField.select("6");
      PaymentMethods.exipreYearTxtField.select("2090");
      PaymentMethods.submitBtn.click();
      PaymentMethods.paymentCardlist.contains("4444");
    });
  });
});

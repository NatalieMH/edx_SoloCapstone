import {
    By,
    Builder,
    until,
    WebDriver,
    WebElement,
    Capabilities
} from "selenium-webdriver";

export class EdxBase {
    driver: WebDriver;
    url: string = "https://edx.org";
    signIn: By = By.className('dropdown-item');
    emailField: By = By.id('email');
    passwordField: By = By.id('password');
    courseDropdown: By = By.xpath('(//*[@href="/search/?tab=course"])[1]');
    myCourses: By = By.className('header-courses');
    exploreNewCourses: By = By.className('btn-neutral');
    cookiesBanner: By = By.className('edx-cookie-banner-wrapper');
    closeCookies: By = By.className('close');
    exploreAllCourses: By = By.xpath('//span[contains(text(),"Explore all courses")]');
    searchBarHome: By = By.id('home-search');
    homeSearch: By = By.id('home-search');
    constructor(driver:WebDriver) {
        this.driver = driver;
    }

    async navigate() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.courseDropdown));
        await this.driver.wait(
          until.elementIsVisible(await this.driver.findElement(this.courseDropdown))
        );
      }
    async signingIn() {
        await this.click(this.signIn);
}
    async enteringEmail(email: string) {
    await this.click(this.emailField);
    await this.driver.switchTo().activeElement().sendKeys(`${email}\n`);
    await this.driver.wait(until.elementLocated(this.emailField));
}
    async enteringPassword(password: string) {
    await this.click(this.passwordField);
    await this.driver.switchTo().activeElement().sendKeys(`${password}`);
}
    async myCoursesPage() {
    await this.driver.wait(until.elementLocated(this.myCourses));
    let myCoursesScreen = await (await (this.driver.findElement(this.myCourses))).getText(); //This identifies the text on the welcome screen to verify we are on the right page.
    return myCoursesScreen;
}
    async cookieBanner() {
    await this.driver.sleep(1000);
    await this.driver.wait(until.elementLocated(this.cookiesBanner));//wait until the cookie banner is located
    await this.driver.sleep(500);
    let cookies = await this.driver.wait(until.elementLocated(this.closeCookies));
    await cookies.click(); //Click the X that closes the cookie banner
    }
    async exploringCourses() {
    let exploreCourses = await this.driver.wait(until.elementLocated(this.exploreAllCourses));
    await exploreCourses.click();
    }
    async searchingHeader(searchTerm) {
        await this.click(this.searchBarHome);
        await this.driver.switchTo().activeElement().sendKeys(`${searchTerm}\n`);
    }
    async click(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    return (await this.driver.findElement(elementBy)).click();
}
}
import {EdxBase} from "../edxBase"
const chromedriver = require("chromedriver");
import {
    By,
    Builder,
    until,
    WebDriver,
    WebElement,
    Capabilities,
    Browser,
    Actions
} from "selenium-webdriver";
import { elementIsEnabled } from "selenium-webdriver/lib/until";
const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
  const edx = new EdxBase(driver);
  const action = driver.actions({async: true});
  let searchArray = [];
  beforeEach(async () => {
    await (await driver).manage().window().maximize()
    await edx.navigate();
  });
 test("Can expand About this Course and What you'll learn", async() => {
    await edx.cookieBanner();
    await edx.exploringCourses();
    await driver.sleep(1000);
    let classArray = await driver.wait(until.elementsLocated(By.css('.Verified')));
    //console.log(classArray);
    //console.log(classArray.length);
    let selectCourse = classArray[Math.floor(Math.random()*classArray.length)];
    await driver.sleep(1000);
    await selectCourse.click();
    let aboutCourse = await driver.wait(until.elementLocated(By.xpath('//button[contains(text(),"More about this course")]')));
    await aboutCourse.click();//Clicks the + to expand the About this Course section
    let collapseAbout = await driver.wait(until.elementLocated(By.xpath('//button[contains(text(),"Collapse about this course")]')));
    expect(await collapseAbout).toBeTruthy();//Verifies that the Collapse about this course appears after expanding the course
    let whatLearn = await driver.wait(until.elementLocated(By.xpath('//button[contains(text(),"Expand what you\'ll learn")]')));
    await whatLearn.click();//Clicks the + to expand the What you'll learn section
    let collapseLearn = await driver.wait(until.elementLocated(By.xpath('//button[contains(text(),"Collapse what you\'ll learn")]')));
    expect(await collapseLearn).toBeTruthy()//verifies that the Collapse what you'll learn appears after expanding
    await driver.sleep(2000);
    await collapseAbout.click();//Collapse the About Course section
    expect(await aboutCourse).toBeTruthy();
    await collapseLearn.click();//Collapse the What you'll learn section
    expect(await whatLearn).toBeTruthy();
  });
  test("Can search via the search bar", async() => {
    await edx.searchingHeader("religion");
    let searches = await (driver.wait(until.elementLocated(By.xpath('(//div[contains(text(),"religion")])[2]')))).getText();
    expect(searches).toContain("religion");
  });
test("Can sign in and sign up for a class", async() => {
    await edx.signingIn();
    await edx.enteringEmail("nmh423@gmail.com");
    await edx.enteringPassword("N1234567\n");
    expect(await edx.myCoursesPage()).toContain("My Courses");
    let exploreNewCourses = await driver.wait(until.elementLocated(By.className('btn-neutral')));
    await exploreNewCourses.click();//Clicks Explore New Courses
    let availability = await driver.wait(until.elementLocated(By.xpath('(//div[@class = "collapsible"])[5]')));
    await availability.click();
    await driver.wait(until.elementLocated(By.css('label[for = "availability-0"]')));
    let availableNow = await driver.wait(until.elementLocated(By.css('label[for = "availability-0"]')));
    await availableNow.click();//Filters by courses that are currently available
    await availability.click();
    let availableArray = await driver.findElements(By.className('Verified'));//makes an array of all available courses (not programs)
    let selectCourse = availableArray[Math.floor(Math.random()*availableArray.length)];//chooses a random course
    await selectCourse.click();
    await driver.sleep(1000);
    let courseHeader = await driver.findElement(By.css('.course-intro-heading'));
    let courseTitle = await courseHeader.getText();//gets the text of the course header
    await driver.sleep(1000);
    let enrollNow = await driver.wait(until.elementLocated(By.css('button[label = "Enroll now"]')));
    await enrollNow.click();//clicks the button to enroll in a course
    let userIcon = await driver.wait(until.elementLocated(By.className('menu-title')));
    await userIcon.click();//clicks the user icon to bring the user back to the My Courses page
    await edx.myCoursesPage();
    let myCourseTitle = await driver.wait(until.elementLocated(By.xpath('//a[@class = "course-target-link"]')));
    expect(courseTitle).toContain(await myCourseTitle.getText());//Checks that the title of the courseTitle matches a course under My Courses
    let viewCourse = await driver.wait(until.elementLocated(By.xpath('(//a[@class = "course-target-link"])[1]')));
    await viewCourse.click();
    let startCourse = await driver.wait(until.elementLocated(By.css('.btn.btn-primary.btn-block')));
    await startCourse.click();
    let nextButton = await driver.wait(until.elementLocated(By.css('.next-btn')));
    expect(await nextButton).toBeTruthy();
  });
  test("Can switch between English and Spanish", async() => {
    //await edx.cookieBanner();
    let languageChoice = await driver.wait(until.elementLocated(By.id('site-footer-language-select')));
    await languageChoice.click(); //Click the dropdown menu for language choice
    let spanish = await driver.findElement(By.css('option[value = "es"]'));
    await spanish.click();//click to choose Spanish
    let apply = await driver.findElement(By.id('site-footer-language-submit'));
    await apply.click();//click the Apply button to change the language to Spanish
    await driver.sleep(1000);
    let courses = await driver.wait(until.elementLocated(By.xpath('(//a[@class = "menu-item"])[1]')));
    expect(await (await courses.getText()).toLowerCase()).toContain("cursos"); //Once the language is switched to Spanish, the Apply button will appear in Spanish
  });
  
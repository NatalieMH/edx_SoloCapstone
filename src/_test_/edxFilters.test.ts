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
  
  beforeEach(async () => {
    await (await driver).manage().window().maximize()
    await edx.navigate();
  });
  test("Can sort by Math from Courses dropdown", async() => {
    let course = await driver.wait(until.elementLocated(By.xpath('(//*[@href="/search/?tab=course"])[1]')));
    await action.move({origin: course}).press().perform();//mouse hovers over Courses menu
    let mathSubject = await driver.wait(until.elementLocated(By.css('a[href = "/course/subject/math"]')));
    await action.move({origin: mathSubject}).click().perform();//click on Math in subject dropdown menu
    await driver.sleep(1000);
    let mathCourses = await driver.wait(until.elementLocated(By.className('h1')));
    expect(await mathCourses.getText()).toContain('Math Courses');//Verify when choosing subject of Math, the resulting page displays Math Courses
    await edx.cookieBanner();
    await driver.wait(until.elementLocated(By.className('Verified')));
    let mathArray = await driver.findElements(By.className('Verified'));//make an array of all math courses with card type of Course
    let selectCourse = mathArray[Math.floor(Math.random()*mathArray.length)];//chooses a random course from the list
    await selectCourse.click(); 
    let courseDescription = await (await (await (driver.wait(until.elementLocated(By.className('course-info-page'))))).getText()).toLowerCase();
    //let courseDescArray = courseDescription.split(' ');
    //courseDescArray.some(mathTopics);
    expect(await (await courseDescription)).toContain("math"||"algebra"||"calculus"||"geometry"||"linear algebra"||"logic"||"pre-algebra"||"pre-calculus"||"probability"||"regression"||"statistic"||"data analysis");//Verifies that when searching by subject Math, somewhere in the course description it says math
  });
  test("Can sort by Language", async() => {
    await edx.exploringCourses();
    let language = await driver.wait(until.elementLocated(By.xpath('(//div[@class = "collapsible"])[6]')));//finds the 6th dropdown menu, which is Language
    await language.click();
    await driver.wait(until.elementLocated(By.css('label[for = "language-0"]')));
    let french = await driver.wait(until.elementLocated(By.css('label[for = "language-10"]')));//finds the 11th language in the list, which is French
    await french.click();
    let filterLanguage = await driver.wait(until.elementLocated(By.xpath('(//span[contains(text(),"French")])[2]')));
    expect(await (await filterLanguage.getText()).toLowerCase()).toContain("french");//expects the filter that appears to say FRENCH
    await driver.wait(until.elementLocated(By.className('Verified')));
    let frenchArray = await driver.findElements(By.className('Verified'));//creates an array of all courses (not programs) that appear after the filter
    let selectCourse = frenchArray[Math.floor(Math.random()*frenchArray.length)];//selects a random course from all courses in array
    await selectCourse.click();
    let courseLanguage = await driver.wait(until.elementLocated(By.xpath('(//div[contains(text(),"Français")])[1]')));//verifies the the Language label on the course is Français
    expect(await courseLanguage.getText()).toContain("Français");//expect the language to be French
  });
  test("Can sort by Partner", async() => {
    await edx.exploringCourses();
    let partner = await driver.wait(until.elementLocated(By.xpath('(//div[@class = "collapsible"])[2]')));//finds the 2nd dropdown menu, which is Partner
    await partner.click();
    await driver.wait(until.elementLocated(By.css('label[for = "partner-60"]')));
    let mit = await driver.wait(until.elementLocated(By.css('label[for = "partner-60"]')));//Finds the 60th partner in the list, which is MIT
    await mit.click();
    await partner.click();
    let filterPartner = await driver.wait(until.elementLocated(By.xpath('(//span[contains(text(),"Massachusetts Institute of Technology")])[2]')));
    expect(await (await filterPartner.getText()).toLowerCase()).toContain("massachusetts institute of technology");//expect the filter that appears to say MASSACHUSETTS INSTITUTE OF TECHNOLOGY
    let mitArray = await driver.findElements(By.className('Verified'));//creates an array of all courses (not programs) that appear after the filter
    let selectCourse = mitArray[Math.floor(Math.random()*mitArray.length)];//selects a random course from all courses in array
    await selectCourse.click();
    let coursePartner = await driver.wait(until.elementLocated(By.css('img[alt = "Massachusetts Institute of Technology Logo"]')));
    expect(await coursePartner).toBeTruthy();//Verifies the selected course has the MIT image
    let schoolsPartners = await driver.wait(until.elementLocated(By.xpath('(//a[@href = "/schools-partners"])[2]')));//finds the schools & partners dropdown in the header
    await schoolsPartners.click();
    let schoolsArray = await driver.findElements(By.xpath('//img[@class = "school-img"]'));//makes an array of all schools/partners
    await driver.sleep(1000);
    let school = await driver.findElement(By.xpath(`(//img[@class = "school-img"])[${Math.floor(Math.random()*((schoolsArray.length-1) - 0 + 1) +1)}]`));//finds a random school within the list
    let selectSchool = await school.getAttribute('src');//finds the value of the src in the school image
    await school.click();
    await driver.sleep(1000);
    let schoolsArray2 = await driver.findElements(By.css('.partner-logo'));//makes an array of all courses for that school
    let school2 = await driver.findElement(By.xpath(`(//img[@class = "partner-logo"])[${Math.floor(Math.random()*((schoolsArray2.length-1) - 0 + 1) + 1)}]`));//picks a random course from the array
    let selectSchool2 = await school2.getAttribute('src');//gets the src of the logo image attached to the course
    expect(selectSchool).toBe(selectSchool2);//compares the src of the images from the school and the course
});

test("Can sort by Program", async() => {
    await edx.exploringCourses();
    let programsList = await driver.wait(until.elementLocated(By.xpath('//button[contains(text(),"Programs")]')));
    await programsList.click();
    await driver.wait(until.elementLocated(By.className('d-md-block')));
    let program = await driver.wait(until.elementLocated(By.xpath('(//div[@class = "collapsible"])[3]')));
    await program.click();
    await driver.wait(until.elementLocated(By.css('label[for = "program_type-3"]')));
    let professionalCertificate = await driver.wait(until.elementLocated(By.css('label[for = "program_type-3"]')));
    await professionalCertificate.click();//checking off professional certificate in program dropdown menu
    let filterProgram = await driver.wait(until.elementLocated(By.xpath('(//span[contains(text(),"Professional Certificate")])[2]')));
    expect(await (await filterProgram.getText()).toLowerCase()).toContain("professional certificate");
    let pcArray = await driver.findElements(By.className('professional-certificate'));
    let selectProgram = pcArray[Math.floor(Math.random()*pcArray.length)];
    await selectProgram.click();// select a program with type professional certificate
    let courseProgram = await driver.wait(until.elementLocated(By.xpath('(//span[contains(text(),"Professional Certificate")])[1]')));
    expect(await courseProgram.getText()).toContain("Professional Certificate");//expect the text to include Professional Certificate on the page of the program
});
test("Can sort by Level", async() => {
    await edx.exploringCourses();
    let level = await driver.wait(until.elementLocated(By.xpath('(//div[@class = "collapsible"])[4]')));
    await level.click();
    await driver.wait(until.elementLocated(By.css('label[for = "level-0"]')));
    let introductory = await driver.wait(until.elementLocated(By.css('label[for = "level-0"]')));
    await introductory.click(); //Click on Introductory under the Level filter
    let filterLevel = await driver.wait(until.elementLocated(By.xpath('(//span[contains(text(),"Introductory")])[2]')));
    expect(await (await filterLevel.getText()).toLowerCase()).toContain("introductory");
    let introArray = await driver.findElements(By.className('Verified'));
    let selectCourse = introArray[Math.floor(Math.random()*introArray.length)];
    await selectCourse.click();
    let courseLevel = await driver.wait(until.elementLocated(By.xpath('//div[contains(text(),"Introductory")]')));
    expect(await courseLevel.getText()).toContain("Introductory");//A random course chosen should include Level: Introductory
  });
test("Can sort by Availability", async() => {
    await edx.exploringCourses();
    let availability = await driver.wait(until.elementLocated(By.xpath('(//div[@class = "collapsible"])[5]')));
    await availability.click();
    await driver.wait(until.elementLocated(By.css('label[for = "availability-0"]')));
    let availableNow = await driver.wait(until.elementLocated(By.css('label[for = "availability-0"]')));
    await availableNow.click();
    await availability.click();
    let filterAvailability = await driver.wait(until.elementLocated(By.xpath('(//span[contains(text(),"Available now")])[2]')));
    expect(await (await filterAvailability.getText()).toLowerCase()).toContain("available now");
    let availableArray = await driver.findElements(By.className('Verified'));
    let selectCourse = availableArray[Math.floor(Math.random()*availableArray.length)];
    await selectCourse.click();
    let courseAvailability = await driver.wait(until.elementLocated(By.className('active')));//after filtering by Available Now, the course should have an active course available
    expect(await courseAvailability).toBeTruthy();
  }); 
  
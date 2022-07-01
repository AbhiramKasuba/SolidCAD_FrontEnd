const timeout = 40000;
const URL1="http://localhost:3000"
describe("Customer Enquiry Forms", () => {
    beforeEach(async () => {
        console.log("URL", URL)
        await page.goto(URL1, { waitUntil: "domcontentloaded" });
    });
    test("Validate Enquiry Data with Valid Data", async () => {

        await page.waitForSelector("#fname", { visible: true });
        await page.type("#fname", "Abhiram")
        await page.waitForSelector("#lname", { visible: true });
        await page.type("#lname", "Kasuba")
        await page.waitForSelector("#emailId", { visible: true });
        await page.type("#emailId", "abhiram.kasuba@gmail.com")
        await page.waitForSelector("#message", { visible: true });
        await page.type("#message", "Test Form")
        await page.waitForSelector("#formSubmit", { visible: true });
        await page.click("#formSubmit")
        await page.waitForSelector("#response", { visible: true });
        await page.waitForTimeout(3000)


        const response = await page.$("#response");
        const responseMessage = await page.evaluate(name => name.innerText, response);
        await page.screenshot({
            path: 'screenshots/success.png', fullPage: true
        })

        expect(responseMessage).toBe("Thanks you for reaching SolidCad Team!!We will get back to you asap!!");
    }, timeout);

    test("Validate Email Validations", async () => {

        await page.waitForSelector("#emailId", { visible: true });
        await page.type("#emailId", "abcd.com")

        await page.click("#formSubmit")
        await page.waitForSelector("#emailError", { visible: true });
        await page.waitForTimeout(3000)


        const emailError = await page.$("#emailError");
        const emailErrorMessage = await page.evaluate(name => name.innerText, emailError);
        await page.screenshot({
            path: 'screenshots/emailError.png', fullPage: true
        })
        console.log(emailErrorMessage)
        expect(emailErrorMessage).toBe("Invalid Email Id");

    }, timeout);

    test("Validate FirstName Required Field Validations", async () => {

        await page.waitForSelector("#fname", { visible: true });
        await page.type("#fname", "")
        await page.waitForSelector("#lname", { visible: true });
        await page.type("#lname", "Kasuba")
        await page.waitForSelector("#emailId", { visible: true });
        await page.type("#emailId", "abhiram.kasuba@gmail.com")
        await page.waitForSelector("#message", { visible: true });
        await page.type("#message", "Test Form")
        await page.waitForSelector("#formSubmit", { visible: true });
        await page.click("#formSubmit")
        await page.waitForSelector("#response", { visible: false });
        await page.waitForTimeout(1000)

        const response = await page.$("#response");
        const responseMessage = await page.evaluate(name => name.innerText, response);
        await page.screenshot({
            path: 'screenshots/firstNameRequired.png', fullPage: true
        })
        expect(responseMessage).toBe("");

    }, timeout);
    
    test("Validate LastName Required Field Validations", async () => {

        await page.waitForSelector("#fname", { visible: true });
        await page.type("#fname", "abhiram")
        await page.waitForSelector("#lname", { visible: true });
        await page.type("#lname", "")
        await page.waitForSelector("#emailId", { visible: true });
        await page.type("#emailId", "abhiram.kasuba@gmail.com")
        await page.waitForSelector("#message", { visible: true });
        await page.type("#message", "Test Form")
        await page.waitForSelector("#formSubmit", { visible: true });
        await page.click("#formSubmit")
        await page.waitForSelector("#response", { visible: false });
        await page.waitForTimeout(1000)

        const response = await page.$("#response");
        const responseMessage = await page.evaluate(name => name.innerText, response);
        await page.screenshot({
            path: 'screenshots/lastNameRequired.png', fullPage: true
        })
        expect(responseMessage).toBe("");

    }, timeout);

    test("Validate Email Required Field Validations", async () => {

        await page.waitForSelector("#fname", { visible: true });
        await page.type("#fname", "abhiram")
        await page.waitForSelector("#lname", { visible: true });
        await page.type("#lname", "Kasuba")
        await page.waitForSelector("#emailId", { visible: true });
        await page.type("#emailId", "")
        await page.waitForSelector("#message", { visible: true });
        await page.type("#message", "Test Form")
        await page.waitForSelector("#formSubmit", { visible: true });
        await page.click("#formSubmit")
        await page.waitForSelector("#response", { visible: false });
        await page.waitForTimeout(1000)

        const response = await page.$("#response");
        const responseMessage = await page.evaluate(name => name.innerText, response);
        await page.screenshot({
            path: 'screenshots/emailRequired.png', fullPage: true
        })
        expect(responseMessage).toBe("");

    }, timeout);

    test("Validate Message Required Field Validations", async () => {

        await page.waitForSelector("#fname", { visible: true });
        await page.type("#fname", "abhiram")
        await page.waitForSelector("#lname", { visible: true });
        await page.type("#lname", "Kasuba")
        await page.waitForSelector("#emailId", { visible: true });
        await page.type("#emailId", "abhiram.kasuba@gmail.com")
        await page.waitForSelector("#message", { visible: true });
        await page.type("#message", "")
        await page.waitForSelector("#formSubmit", { visible: true });
        await page.click("#formSubmit")
        await page.waitForSelector("#response", { visible: false });
        await page.waitForTimeout(1000)

        const response = await page.$("#response");
        const responseMessage = await page.evaluate(name => name.innerText, response);
        await page.screenshot({
            path: 'screenshots/messageRequired.png', fullPage: true
        })
        expect(responseMessage).toBe("");

    }, timeout);


}, timeout);
//this is for puppeteer config if we have to launch in headless mode,use slow motion and access to devtools is it required or not like that all configs can be added here
module.exports = {
    launch: {
        headless: true,
        slowMo: false,
        devtools: false
    }
}
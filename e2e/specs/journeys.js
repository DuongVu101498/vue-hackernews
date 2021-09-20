module.exports = {
    'sanity test': function (browser) {
        browser
            .url('http://localhost:8080')
            .waitForElementVisible('.item-list', 2000)
            .end();
    },
    'paginates items correctly': function (browser) {
        let originalItemListText;
        browser
            .url('http://localhost:8080')
            .waitForElementVisible('.news-item', 15000)
            .getText('.item-list', function (result) {
                originalItemListText = result.value
            }).click('.item-list-nav a:nth-of-type(2 )')
            .waitForElementNotVisible('.progress', 15000)
            //.waitForElementPresent('.progress.hidden', 15000) //could use this instead of the line above
            .perform(() => {
                browser.expect.element('.item-list').text.to.not.equal(originalItemListText)
            })
            .getText('.item-list', function (result) {
                originalItemListText = result.value
            })
            .click('.item-list-nav a')
            .waitForElementNotVisible('.progress', 15000)
            .perform(() => {
                browser.expect.element('.item-list').text.to.not.equal(originalItemListText)
            })
    },
    'changes list by clicking through nav': function(browser) {
        let originalItemListText;
        browser
       .url('http://localhost:8080')
        .waitForElementVisible('.news-item', 15000) 
        .getText('.item-list', function(result) { 
        originalItemListText = result.value
        })
        .click('.inner a:nth-of-type(2)') 
        .waitForElementNotVisible('.progress', 15000)
        .perform(() => {
        browser.expect.element('.item-list').text.to.not.equal(originalItemListText) 
        })
        .getText('.item-list', function(result) { 
        originalItemListText = result.value
        })
        .click('.inner a:nth-of-type(4)') 
        .waitForElementNotVisible('.progress', 15000)
        .perform(() => {
        browser.expect.element('.item-list').text.to.not.equal(originalItemListText) 
        })
        },
}

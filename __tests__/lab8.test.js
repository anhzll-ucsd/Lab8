describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      console.log(entries);
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
   
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
  
    const element = await page.$('journal-entry');
    await element.click();
    page.waitForNavigation();
    const url = await page.evaluate(() => location.href);
    expect(url).toBe("http://127.0.0.1:5500/#entry1");


  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
  
    //page.waitForNavigation();
    const header = await page.$eval('h1' , (el) => el.innerText);
    expect(header).toBe("Entry 1");
 
    //
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    let matchy = true;
    const title = await page.evaluate(() => {let eltitle = document.querySelector("body > entry-page").shadowRoot.querySelector("section > section.entry-title-section > h2").textContent; return eltitle;})
    const date = await page.evaluate(() => {let eltitle = document.querySelector("body > entry-page").shadowRoot.querySelector("section > section.entry-title-section > p").textContent; return eltitle;})
    const content = await page.evaluate(() => {let eltitle = document.querySelector("body > entry-page").shadowRoot.querySelector("section > section.entry-content-section > p").textContent; return eltitle;})
    const src = await page.evaluate(() => {let eltitle = document.querySelector("body > entry-page").shadowRoot.querySelector("section > img").src; return eltitle;})
    const alt = await page.evaluate(() => {let eltitle = document.querySelector("body > entry-page").shadowRoot.querySelector("section > img").alt; return eltitle;})


    
    if (title != 'You like jazz?' ){matchy = false;}
    if (date != '4/25/2021' ){matchy = false;}
    if (content != "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible." ){matchy = false;}
    if (src != 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455' ){matchy = false;}
    if (alt != 'bee with sunglasses' ){matchy = false;}
    expect(matchy).toBe(true);
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
     
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const elclass = await page.evaluate(() => {let eltitle = document.querySelector("body").classList[0]; return eltitle;})
    expect(elclass).toBe("single-entry");

  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    const element = await page.$('img');
    await element.click();
    page.waitForNavigation();
    const url = await page.evaluate(() => location.href);
    expect(url).toBe("http://127.0.0.1:5500/#settings");
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const header = await page.$eval('h1' , (el) => el.innerText);
    expect(header).toBe("Settings");
 
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const elclass = await page.evaluate(() => {let eltitle = document.querySelector("body").classList[0]; return eltitle;})
    expect(elclass).toBe("settings");
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    page.goBack();

    await page.waitFor(3000);
    const url = await page.evaluate(() => location.href);
    
    expect(url).toBe("http://127.0.0.1:5500/#entry1");
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11:Clicking the back button once should bring the user back to the home page', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    page.goBack();

    await page.waitFor(3000);
    const url = await page.evaluate(() => location.href);
    
    expect(url).toBe("http://127.0.0.1:5500/");
 
  });


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12:When the user if on the homepage, the header title should be “Journal Entries', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    const header = await page.$eval('h1' , (el) => el.innerText);
    expect(header).toBe("Journal Entries");
 
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const elclass = await page.evaluate(() => {let eltitle = document.querySelector("body").classList[0]; return eltitle;})
    expect(elclass).toBe(undefined);

  });



  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async () => {
  
    const element = await page.$$('journal-entry');
    await element[1].click();
    page.waitForNavigation();
    const url = await page.evaluate(() => location.href);
    expect(url).toBe("http://127.0.0.1:5500/#entry2");


  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: On Second Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
  
    //page.waitForNavigation();
    const header = await page.$eval('h1' , (el) => el.innerText);
    expect(header).toBe("Entry 2");
 
    //
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: On second Entry page - checking <entry-page> contents', async () => {
    let matchy = true;
    const title = await page.evaluate(() => {let eltitle = document.querySelector("body > entry-page").shadowRoot.querySelector("section > section.entry-title-section > h2").textContent; return eltitle;})
    const date = await page.evaluate(() => {let eltitle = document.querySelector("body > entry-page").shadowRoot.querySelector("section > section.entry-title-section > p").textContent; return eltitle;})
    const content = await page.evaluate(() => {let eltitle = document.querySelector("body > entry-page").shadowRoot.querySelector("section > section.entry-content-section > p").textContent; return eltitle;})
    const src = await page.evaluate(() => {let eltitle = document.querySelector("body > entry-page").shadowRoot.querySelector("section > img").src; return eltitle;})
    const alt = await page.evaluate(() => {let eltitle = document.querySelector("body > entry-page").shadowRoot.querySelector("section > img").alt; return eltitle;})


    
    if (title != 'Run, Forrest! Run!' ){matchy = false;}
    if (date != '4/26/2021' ){matchy = false;}
    if (content != "Mama always said life was like a box of chocolates. You never know what you're gonna get." ){matchy = false;}
    if (src != 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg' ){matchy = false;}
    if (alt != 'forrest running' ){matchy = false;}
    expect(matchy).toBe(true);
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
     
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */

  }, 10000);

  // create your own test 17
  it('Test17:Clicking the back button once should bring the user back to the home page from second journal entry', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    page.goBack();

    await page.waitFor(3000);
    const url = await page.evaluate(() => location.href);
    
    expect(url).toBe("http://127.0.0.1:5500/");
 
  });


  // create your own test 18
  it('Test18: Verify the url is correct when clicking on the third entry', async () => {

    const element = await page.$$('journal-entry');
    await element[2].click();
    page.waitForNavigation();
    const url = await page.evaluate(() => location.href);
    expect(url).toBe("http://127.0.0.1:5500/#entry3");


  });
  // create your own test 19
  it('Test19: On Third Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
  
    //page.waitForNavigation();
    const header = await page.$eval('h1' , (el) => el.innerText);
    expect(header).toBe("Entry 3");
 
    //
  });

  // create your own test 20

  it('Test20: On third Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const elclass = await page.evaluate(() => {let eltitle = document.querySelector("body").classList[0]; return eltitle;})
    expect(elclass).toBe("single-entry");

  });
});

  


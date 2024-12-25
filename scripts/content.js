// store all modified elements into window containing DOM document
window.modified_elements = []

// once the page loads
document.addEventListener("DOMContentLoaded", async () => {
    // retrive the keyword
    const keyword = document.getElementById("the_keyword");

    // allow input bar to focus
    keyword.focus()

    // get the current chrome tab that we're on
    const tab = await getCurrentTab()
    
    // once keyword input detects change,
    keyword.addEventListener("input", (event) => {
        // change the chrome browser extension itself
        let user_keyword = document.getElementById("user_keyword")
        // tell user what keyword we're on
        user_keyword.innerHTML = "Blocking articles with keyword: " + event.target.value

        // undo any other changes before changing again!
        chrome.scripting.executeScript({
            // get the tab id
            target: {tabId: tab.id },
            func: undo_changes
        })

        // inject content script!
        chrome.scripting.executeScript({
            // get the tab id
            target: {tabId: tab.id },
            func: start_filter,
            args: [event.target.value]
        })
    })
})

// retrieve tab information
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

// filter out certain keywords
function start_filter(filter_words) {
    if (filter_words) {
        let x = document.querySelectorAll("article")
        
        if (x) {
            x.forEach((element) => {
                if (element.textContent.toLowerCase().includes(filter_words.toLowerCase())) {
                    // add into window.modified_elements
                    window.modified_elements.push({
                        element: element,
                        originalText: element.innerHTML, // innerHTML will maintain everything even children
                        originalStyle: element.style.cssText // retain all css properties of all kids
                    })

                    element.innerHTML = "Contains Keyword: " + filter_words
                    element.style.backgroundColor = "blue"
                    element.style.color = "white"
                    
                }
            })
        }
    }
}

// revert to original
function undo_changes() {
    if (window.modified_elements) {
        window.modified_elements.forEach(({element, originalText, originalStyle}) => {
            if (originalText) {
                element.innerHTML = originalText
            }

            element.style.cssText = originalStyle
        })
    }
    
    // reset array
    window.modified_elements = []
}

/*document.addEventListener("DOMContentLoaded", () => {
    // retrive the keyword
    const keyword = document.getElementById("the_keyword");
    keyword.focus()
    // once keyword input detects change,
    keyword.addEventListener("input", (event) => {
        let user_keyword = document.getElementById("user_keyword")
        user_keyword.innerHTML = "Blocking articles with keyword: " + event.target.value
        start_filter(event.target.value)
    })
})*/


// works for google news
// outside the DOM indicates the chrome browser
//let x = document.querySelector('body')
/*let x = document.querySelector('h1')
        
if (x) {
    // create a block
    const div = document.createElement("div")
    div.style.height = "50px"
    div.style.width = "50px"
    div.style.backgroundColor = "grey"

    // insert a rectangle after the  keyword
    x.insertAdjacentElement("afterend", div)
}*/

// testing for global
/*var filter_words = "stories"
if (filter_words) {
    let x = document.querySelectorAll("a")
    
    if (x) {
        x.forEach((element) => {
            if (element.textContent.toLowerCase().includes(filter_words.toLowerCase())) {
                element.innerHTML = "Contains Keyword: " + filter_words 
                element.style.backgroundColor = "blue"
                element.style.color = "white"
            }
        })
    }
}*/
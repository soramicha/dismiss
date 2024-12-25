// listens to allow extension to set initial state or complete
// some tasks on installation

// on set up
/*chrome.runtime.onInstalled.addListener(() => {
    // default OFF extension is showed
    chrome.action.setBadgeText({
        text: "OFF",
    })
})

const news_link = 'https://news.google.com/'
// but if clicked or cmd+B or ctrl+B is done
// and we're on the google news link, then reset the
// status of the extension
chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(news_link)) {
        // get current status of action badge of extension
        const currState = await chrome.action.getBadgeText({ tabId: tab.id })
        // set the next state
        const nextState = currState === 'OFF' ? 'ON' : 'OFF'

        // set the status again
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        })

        // if it's on, then perform the function
        // TODO
        if (nextState === "ON") {
            // show the keyword.html
            await fetch(chrome.runtime.getURL('keyword.js'))
            .then(data => {
                //document.getElementById('inject-container').innerHTML = data;
                // other code
                console.log(data, "is the data Sophia!")
                // eg update injected elements,
                // add event listeners or logic to connect to other parts of the app
            }).catch(err => {
                // handle error
            });
        }

        // otherwise don't
        // TODO
    }
})
*/
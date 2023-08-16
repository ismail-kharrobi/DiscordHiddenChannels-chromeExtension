var activeTabId;

const component = `<div id="extra-ch" class=" hover:fill-cyan-500 extra-ch icon-2xnN2Y iconWrapper-2awDjA clickable-ZD7xvu" role="button" aria-label="Extra Channels" aria-expanded="false" tabindex="0"><div  id="extra-ch"  class="hover:fill-cyan-500 extra-ch text-md-normal-2rFCH3 count-vTKEhF" data-text-variant="text-md/normal" style="color: var(--interactive-normal);"></div>
<svg xmlns="http://www.w3.org/2000/svg" class="hover:fill-cyan-500" xmlns:xlink="http://www.w3.org/1999/xlink" fill="lightblue" height="24px" width="24px" version="1.1" viewBox="0 0 297.991 297.991" enable-background="new 0 0 297.991 297.991">
        <g class="hover:fill-cyan-500">
          <path class="hover:fill-cyan-500" d="m297.553,74.917c0,0-26.938,7.798-88.522,7.798-24.04,0-45.555,9.563-60.035,24.627-14.481-15.064-35.995-24.627-60.035-24.627-61.584,0-88.522-7.798-88.522-7.798s-4.253,57.773 13.746,100.557c11.491,27.314 40.059,47.6 74.776,47.6 24.04,0 45.555-9.563 60.035-24.627 14.48,15.064 35.995,24.627 60.035,24.627 34.718,0 63.285-20.285 74.776-47.6 17.999-42.783 13.746-100.557 13.746-100.557zm-214.807,90.775c-18.133,0-32.833-16.833-32.833-16.833s14.7-15.833 32.833-15.833c18.133,0 32.833,15.833 32.833,15.833s-14.701,16.833-32.833,16.833zm132.5,0c-18.133,0-32.833-16.833-32.833-16.833s14.7-15.833 32.833-15.833c18.133,0 32.833,15.833 32.833,15.833s-14.701,16.833-32.833,16.833z"></path>
        </g>
      </svg>
</div>`;
const domain= "https://discord.com/channels/";
var state;

  async () => { 
    await chrome.storage.sync.get("state").then((result) => {
    if (result.state) {
      state = result.state
    }
  });
  if (state === "ON") {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func : (component) => {
          // const getnav = document.querySelector(".toolbar-3_r2xA")
          // const extrach = document.getElementById("extra-ch")
          // if (extrach === null)
          //   getnav.insertAdjacentHTML("afterbegin",component)
      },
      args : [component]
    });
    chrome.action.setBadgeText({
      text: "ON",
    });
  }
}

async function getTabInfo(tabId){
  
    chrome.tabs.get(tabId, async (tab) => {
     var url = tab.url;
     if (url && state === "ON" && url.startsWith(domain)) {
      chrome.action.setBadgeText({
        text: state,
      });
        await chrome.scripting.executeScript({
          target: { tabId: tab.id},
          func : (component) => {
            console.log(`check if discord func`)
            const checkexists = document.getElementById("extra-ch");
            if (checkexists == null) {
              const getnav = document.querySelector(".toolbar-3_r2xA")
              getnav.insertAdjacentHTML("afterbegin",component)
            }
          },
          args : [component]
        });
    }
  })

};
chrome.tabs.onActivated.addListener(function(activeInfo) {
  getTabInfo(activeTabId = activeInfo.tabId);
});
chrome.webRequest.onBeforeSendHeaders.addListener(
  async function(details) {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === "Authorization")
      {
        chrome.storage.session.set({ "auth": details.requestHeaders[i].value })
      }
    };
  },
  {urls: ["*://discord.com/*"]},
  ["requestHeaders"]
  
);

chrome.runtime.onInstalled.addListener(async () => {
  
  for (const cs of chrome.runtime.getManifest().content_scripts) {
    for (const tab of await chrome.tabs.query({url: cs.matches})) {
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ["scripts/content.js"],
      });
    }
  }
  chrome.action.setBadgeText({
    text: "OFF",
  });
  await chrome.storage.sync.set({"state":"OFF"})
});


chrome.action.onClicked.addListener(async (tab) => {
   
      await chrome.storage.sync.get("state").then((result) => {
        if (result.state) {
          state = result.state
        }
      });
      state = state === 'ON' ? 'OFF' : 'ON'
      chrome.storage.sync.set({"state":state})
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: state,
      });
    if (tab.url.startsWith(domain)) {
      if (state === "ON") {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func : (component) => {
              const getnav = document.querySelector(".toolbar-3_r2xA")
              const extrach = document.getElementById("extra-ch")
              if (extrach === null)
                getnav.insertAdjacentHTML("afterbegin",component)
          },
          args : [component]
        });
      }
      else {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func : () => {
            const getnav = document.getElementById("extra-ch");
            getnav.remove();
          }        
        });
      }
    }
})

// chrome.webNavigation.onHistoryStateUpdated.addListener(async function (details) {
//   console.log(`check if discord`)
//   var tabId = details.tabId;
//   var url = details.url;
//   if (state === "ON" && url.startsWith(domain)) {
//     chrome.action.setBadgeText({
//       text: state,
//     });
//       await chrome.scripting.executeScript({
//         target: { tabId: tabId},
//         func : (component) => {
//           console.log(`check if discord func1`)
//           // const checkexists = document.getElementById("extra-ch");
//           // if (checkexists == null) {
//           //   const getnav = document.querySelector(".toolbar-3_r2xA")
//           //   getnav.insertAdjacentHTML("afterbegin",component)
//           // }
//         },
//         args : [component]
//       });
//   }
// })

const getChannels = async(s) => {
  const url = await chrome.scripting.executeScript({
    target: { tabId: s.id },
    func: ()  => {
      return JSON.stringify(window.location.toString())
    }
  }); 
  var token;
  await chrome.storage.session.get("auth").then((result) => {
    if (result.auth) {
      token = result.auth
    }
  });
  var link = url[0].result;
  var values = link.split`/`;
  const server_id = values[4];
  var res = await fetch(`https://discord.com/api/v9/guilds/${server_id}/channels`, {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "authorization": `${token}`
    }
  });
  var response = await res.text();
  var channels = JSON.parse(response)
  return channels;
}

const handleUpdateUser = async (sender , sendResponse, target) => {
  try {
    if (target === "channels") {
      let channels = await getChannels(sender.tab)
      sendResponse({channels});
    }
    else if (target === "state")
    {
      sendResponse(state);
    }
  }
  catch {
    sendResponse("ERROR");
  }
};

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message.response === "getChannels")
      handleUpdateUser(sender,sendResponse, "channels")
    else if (message.response === "getState")
      handleUpdateUser(sender,sendResponse, "state")
    return true;
  }
);
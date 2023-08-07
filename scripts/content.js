

const script = document.createElement('script');
script.src = chrome.runtime.getURL(`scripts/assets/tail.js`);
document.head.appendChild(script);


function handleButtonClick(event) {
    if (event.srcElement && (event.srcElement.attributes.length > 0 && event.srcElement.attributes[0].nodeValue === "hover:fill-cyan-500") || (event.srcElement.attributes.length > 1 && event.srcElement.attributes[1].nodeValue === "hover:fill-cyan-500")) {
      (async () => {
        let myres =  await chrome.runtime.sendMessage({response:"getChannels"});
        const to_add = document.querySelector("body")

  

        var wrapers = myres.channels.filter(({type}) => type == 4).sort((a,b) => a.position - b.position);
        myres.channels.sort((a,b) => a.position - b.position);
        const dom = ` 
        <div id="overlay" class="fixed z-[101] w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>

        <div id="dialog"
            class="fixed z-[102] top-1/2 left-1/2 -translate-x-1/2 h-5/6 -translate-y-1/2 w-96 bg-black rounded-md px-8 py-6 space-y-5 drop-shadow-lg">
            <div class="flex justify-start">
                <button id="close" class="px-3 py-1 bg-indigo-500 hover:bg-indigo-700 text-white dark: cursor-pointer rounded-md">X</button>
            </div>
            <h1 class="text-2xl font-semibold text-white">Channels</h1>
              <div class="scroller-1ox3I2 h-5/6 thin-RnSY0a scrollerBase-1Pkza4 fade-27X6bG customTheme-3QAYZq" orientation="vertical" id="channels" tabindex="0" data-jump-section="global" style="overflow: hidden scroll; padding-right: 0px;">
              <ul aria-label="Channels" class="content-yjf30S" >
                ${wrapers.map((x) => {
                  var add = `<div class="iconVisibility-3pLDEs wrapper-1S43wv wrapperCommon-I1TMDb clickable-2AoIYN"><div class="mainContent-uDGa6R" tabindex="-1" data-list-item-id="channels___${x.id}" aria-label="${x.name} (category)" aria-expanded="true" role="button"><svg class="arrow-2HswgU icon-3zI3d2" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path></svg><h3 class="name-3BUDLf container-q97qHp"><div class="overflow-1wOqNV">${x.name}</div></h3></div><div class="children-3MeUvj"></div></div>`
                  myres.channels.map((s) => {
                    if (s.parent_id == x.id)
                    {
                      if (s.type == 4)
                        add += `<li class="containerDefault-YUSmu3" data-dnd-name="${s.name}"><div class="iconVisibility-vptxma wrapper-NhbLHG"><div class=""><a href="/channels/${s.guild_id}/${s.id}" role="link" class="link-1_kTxV" data-list-item-id="channels___${s.mid}" tabindex="-1" aria-label="${s.name} (text channel)"><div class="linkTop-1W1aK6"><div aria-label="Text (Limited)" role="img" class="iconContainer-21RCa3"><svg width="24" height="24" viewBox="0 0 24 24" class="icon-2W8DHg"><path fill="currentColor" d="M14 8C14 7.44772 13.5523 7 13 7H9.76001L10.3657 3.58738C10.4201 3.28107 10.1845 3 9.87344 3H8.88907C8.64664 3 8.43914 3.17391 8.39677 3.41262L7.76001 7H4.18011C3.93722 7 3.72946 7.17456 3.68759 7.41381L3.51259 8.41381C3.45905 8.71977 3.69449 9 4.00511 9H7.41001L6.35001 15H2.77011C2.52722 15 2.31946 15.1746 2.27759 15.4138L2.10259 16.4138C2.04905 16.7198 2.28449 17 2.59511 17H6.00001L5.39427 20.4126C5.3399 20.7189 5.57547 21 5.88657 21H6.87094C7.11337 21 7.32088 20.8261 7.36325 20.5874L8.00001 17H14L13.3943 20.4126C13.3399 20.7189 13.5755 21 13.8866 21H14.8709C15.1134 21 15.3209 20.8261 15.3632 20.5874L16 17H19.5799C19.8228 17 20.0306 16.8254 20.0724 16.5862L20.2474 15.5862C20.301 15.2802 20.0655 15 19.7549 15H16.35L16.6758 13.1558C16.7823 12.5529 16.3186 12 15.7063 12C15.2286 12 14.8199 12.3429 14.7368 12.8133L14.3504 15H8.35045L9.41045 9H13C13.5523 9 14 8.55228 14 8Z"></path><path fill="currentColor" d="M21.025 5V4C21.025 2.88 20.05 2 19 2C17.95 2 17 2.88 17 4V5C16.4477 5 16 5.44772 16 6V9C16 9.55228 16.4477 10 17 10H19H21C21.5523 10 22 9.55228 22 9V5.975C22 5.43652 21.5635 5 21.025 5ZM20 5H18V4C18 3.42857 18.4667 3 19 3C19.5333 3 20 3.42857 20 4V5Z"></path></svg></div><div class="name-28HaxV overflow-1wOqNV" aria-hidden="true">${s.name}</div><div class="children-1MGS9G"></div></div></a></div></div></li>`
                      else if (s.type == 13)
                        add += `<li class="containerDefault-YUSmu3" data-dnd-name="${s.name}"><div class="iconVisibility-vptxma wrapper-NhbLHG"><div class=""><a role="button" class="link-1_kTxV" data-list-item-id="channels___${s.id}" tabindex="-1" aria-label="${s.name} (stage channel)"><div class="linkTop-1W1aK6"><div aria-label="Stage (Limited)" role="img" class="iconContainer-21RCa3"><svg class="icon-2W8DHg" aria-hidden="true" role="img" width="32" height="32" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.025 2V3C22.5635 3 23 3.43652 23 3.975V7C23 7.55228 22.5523 8 22 8H18C17.4477 8 17 7.55228 17 7V4C17 3.44772 17.4477 3 18 3V2C18 0.88 18.95 0 20 0C21.05 0 22.025 0.88 22.025 2ZM19 3H21V2C21 1.42857 20.5333 1 20 1C19.4667 1 19 1.42857 19 2V3Z" fill="currentColor"></path><path d="M15 2.41495C14.0462 2.14467 13.0398 2 12 2C5.93 2 1 6.93 1 13C1 15 1.55 16.88 2.48 18.49L3.77 17.74C2.97 16.35 2.5 14.73 2.5 13C2.5 7.75 6.75 3.5 12 3.5C13.0485 3.5 14.0571 3.66952 15 3.98267V2.41495Z" fill="currentColor"></path><path d="M21.0173 10C21.3305 10.9429 21.5 11.9515 21.5 13C21.5 14.73 21.03 16.35 20.22 17.75L21.51 18.5C22.45 16.88 23 15 23 13C23 11.9602 22.8553 10.9538 22.585 10H21.0173Z" fill="currentColor"></path><path d="M14 13C14 14.1 13.1 15 12 15C10.9 15 10 14.1 10 13C10 11.9 10.9 11 12 11C13.1 11 14 11.9 14 13Z" fill="currentColor"></path><path d="M8.5 19.5V20H15.5V19.5C15.5 17.8 14.06 16.5 12 16.5C9.94 16.5 8.5 17.8 8.5 19.5Z" fill="currentColor"></path><path d="M7 13C7 10.24 9.24 8 12 8C14.76 8 17 10.24 17 13C17 13.91 16.74 14.75 16.31 15.49L17.62 16.25C18.17 15.29 18.5 14.19 18.5 13C18.5 9.42 15.58 6.5 12 6.5C8.42 6.5 5.5 9.42 5.5 13C5.5 14.18 5.82 15.29 6.38 16.25L7.69 15.49C7.26 14.75 7 13.91 7 13Z" fill="currentColor"></path></svg></div><div class="name-28HaxV overflow-1wOqNV" aria-hidden="true">${s.name}</div><div class="children-1MGS9G"><div class="iconItem-1EjiK0 iconBase-2G48Fc" aria-label="Open Chat" role="button" tabindex="0"><svg class="actionIcon-2sw4Sl" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24" fill="none"><path fill="currentColor" d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"></path></svg></div></div></div></a></div></div></li>`
                      else if (s.type == 2)
                        add += `<li class="containerDefault-YUSmu3" data-dnd-name="${s.name}"><div><div class="iconVisibility-vptxma wrapper-NhbLHG"><div class=""><a role="button" class="link-1_kTxV" data-list-item-id="channels___${s.id}" tabindex="-1" aria-label="${s.name} (voice channel), 0 users"><div class="linkTop-1W1aK6"><div aria-label="Voice (Limited)" role="img" class="iconContainer-21RCa3"><svg width="24" height="24" viewBox="0 0 24 24" class="icon-2W8DHg"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M15 12C15 12.0007 15 12.0013 15 12.002C15 12.553 14.551 13.002 14 13.002V15.002C15.654 15.002 17 13.657 17 12.002C17 12.0013 17 12.0007 17 12H15ZM19 12C19 12.0007 19 12.0013 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 12.0013 21 12.0007 21 12H19ZM10.293 3.29604C10.579 3.01004 11.009 2.92504 11.383 3.07904C11.757 3.23204 12 3.59904 12 4.00204V20.002C12 20.407 11.757 20.772 11.383 20.927C11.009 21.082 10.579 20.996 10.293 20.71L6 16.002H3C2.45 16.002 2 15.552 2 15.002V9.00204C2 8.45304 2.45 8.00204 3 8.00204H6L10.293 3.29604Z"></path><path fill="currentColor" d="M21.025 5V4C21.025 2.88 20.05 2 19 2C17.95 2 17 2.88 17 4V5C16.4477 5 16 5.44772 16 6V9C16 9.55228 16.4477 10 17 10H19H21C21.5523 10 22 9.55228 22 9V5.975C22 5.43652 21.5635 5 21.025 5ZM20 5H18V4C18 3.42857 18.4667 3 19 3C19.5333 3 20 3.42857 20 4V5Z"></path></svg></div><div class="name-28HaxV overflow-1wOqNV" aria-hidden="true">${s.name}</div><div class="children-1MGS9G"><div class="iconItem-1EjiK0 iconBase-2G48Fc" aria-label="Open Chat" role="button" tabindex="0"><svg class="actionIcon-2sw4Sl" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24" fill="none"><path fill="currentColor" d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"></path></svg></div></div></div></a></div></div></div></li>` 
                      else if (s.type == 15)
                        add += `<li class="containerDefault-YUSmu3" data-dnd-name="${s.name}"><div class="iconVisibility-vptxma wrapper-NhbLHG"><div class=""><a href="/channels/${s.guild_id}/${s.id}" role="link" class="link-1_kTxV" data-list-item-id="channels___${s.id}" tabindex="-1" aria-label="${s.name} (text channel)"><div class="linkTop-1W1aK6"><div aria-label="Forum (Limited)" role="img" class="iconContainer-21RCa3"><svg class="icon-2W8DHg" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M13 4C13 3.66767 13.0405 3.3448 13.1169 3.03607C11.8881 2.28254 10.4651 1.87427 8.99999 1.87427C6.91141 1.87427 4.90838 2.70395 3.43153 4.1808C1.95469 5.65764 1.125 7.66067 1.125 9.74925V15.9368C1.125 16.3843 1.30279 16.8135 1.61926 17.13C1.93573 17.4465 2.36495 17.6243 2.8125 17.6243H7.88314C8.46123 18.8423 9.34451 19.896 10.4529 20.6794C11.7828 21.6195 13.3714 22.1242 15 22.1243H21.1875C21.6351 22.1243 22.0643 21.9465 22.3808 21.63C22.6972 21.3135 22.875 20.8843 22.875 20.4368V14.2492C22.875 13.3832 22.7323 12.5314 22.4596 11.7253C22.0074 11.9026 21.5151 12 21 12H20.1557C20.4625 12.7033 20.625 13.4682 20.625 14.2493V19.8743H15C13.8365 19.8743 12.7017 19.5136 11.7516 18.8421C11.2271 18.4713 10.7732 18.0159 10.4064 17.4977C11.9724 17.2135 13.4275 16.4587 14.5685 15.3177C15.5076 14.3786 16.185 13.2267 16.5538 11.9754C15.7646 11.8878 15.0447 11.5706 14.4624 11.0921C14.2192 12.0813 13.7097 12.9945 12.9775 13.7267C11.9226 14.7816 10.4919 15.3743 9.00001 15.3743H3.375V9.74925C3.375 8.25741 3.96763 6.82668 5.02252 5.77179C6.07741 4.7169 7.50815 4.12427 8.99999 4.12427C10.4918 4.12427 11.9226 4.7169 12.9775 5.77179L13 5.79444V4Z" fill="currentColor"></path><path d="M21.025 4V5C21.5635 5 22 5.43652 22 5.975V9C22 9.55228 21.5523 10 21 10H17C16.4477 10 16 9.55228 16 9V6C16 5.44772 16.4477 5 17 5V4C17 2.88 17.95 2 19 2C20.05 2 21.025 2.88 21.025 4ZM18 5H20V4C20 3.42857 19.5333 3 19 3C18.4667 3 18 3.42857 18 4V5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div><div class="name-28HaxV overflow-1wOqNV" aria-hidden="true">${s.name}</div><div class="children-1MGS9G"></div></div></a></div></div></li>`
                      else
                        add += `<li class="containerDefault-YUSmu3" data-dnd-name="${s.name}"><div class="iconVisibility-vptxma wrapper-NhbLHG"><div class=""><a href="/channels/${s.guild_id}/${s.id}" role="link" class="link-1_kTxV" data-list-item-id="channels___${s.mid}" tabindex="-1" aria-label="${s.name} (text channel)"><div class="linkTop-1W1aK6"><div aria-label="Text (Limited)" role="img" class="iconContainer-21RCa3"><svg width="24" height="24" viewBox="0 0 24 24" class="icon-2W8DHg"><path fill="currentColor" d="M14 8C14 7.44772 13.5523 7 13 7H9.76001L10.3657 3.58738C10.4201 3.28107 10.1845 3 9.87344 3H8.88907C8.64664 3 8.43914 3.17391 8.39677 3.41262L7.76001 7H4.18011C3.93722 7 3.72946 7.17456 3.68759 7.41381L3.51259 8.41381C3.45905 8.71977 3.69449 9 4.00511 9H7.41001L6.35001 15H2.77011C2.52722 15 2.31946 15.1746 2.27759 15.4138L2.10259 16.4138C2.04905 16.7198 2.28449 17 2.59511 17H6.00001L5.39427 20.4126C5.3399 20.7189 5.57547 21 5.88657 21H6.87094C7.11337 21 7.32088 20.8261 7.36325 20.5874L8.00001 17H14L13.3943 20.4126C13.3399 20.7189 13.5755 21 13.8866 21H14.8709C15.1134 21 15.3209 20.8261 15.3632 20.5874L16 17H19.5799C19.8228 17 20.0306 16.8254 20.0724 16.5862L20.2474 15.5862C20.301 15.2802 20.0655 15 19.7549 15H16.35L16.6758 13.1558C16.7823 12.5529 16.3186 12 15.7063 12C15.2286 12 14.8199 12.3429 14.7368 12.8133L14.3504 15H8.35045L9.41045 9H13C13.5523 9 14 8.55228 14 8Z"></path><path fill="currentColor" d="M21.025 5V4C21.025 2.88 20.05 2 19 2C17.95 2 17 2.88 17 4V5C16.4477 5 16 5.44772 16 6V9C16 9.55228 16.4477 10 17 10H19H21C21.5523 10 22 9.55228 22 9V5.975C22 5.43652 21.5635 5 21.025 5ZM20 5H18V4C18 3.42857 18.4667 3 19 3C19.5333 3 20 3.42857 20 4V5Z"></path></svg></div><div class="name-28HaxV overflow-1wOqNV" aria-hidden="true">${s.name}</div><div class="children-1MGS9G"></div></div></a></div></div></li>`
                    }
                  })
                return add;

              })}
            <div class="py-5 border-t border-b border-gray-300">

                </div>
            </div>
        </div> `
        const check_dom = document.getElementById("overlay")
        if (check_dom === null)
          to_add.insertAdjacentHTML('beforebegin', dom)
        var closeButton = document.getElementById('close');
        const closeoverlay = document.getElementById("overlay")
        closeoverlay.addEventListener('click', function () {
          const overlay = document.getElementById("overlay")
          const dialog  = document.getElementById("dialog")
          dialog.remove()
          overlay.remove();
        });
      
        closeButton.addEventListener('click', function () {
          const overlay = document.getElementById("overlay")
          const dialog  = document.getElementById("dialog")
          dialog.remove()
          overlay.remove();

        });
      })();
    } 
  }
  document.addEventListener("click", handleButtonClick);
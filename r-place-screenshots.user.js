// ==UserScript==
// @name         Screenshot /r/place
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Button in order to get screenshot for /r/place
// @author       Kleith
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==

// yyyy-mm-dd_hh.ii.ss
function getTimestamp () {
  const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
  const d = new Date();
  
  return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}.${pad(d.getMinutes())}.${pad(d.getSeconds())}`;
}

if (window.top !== window.self) {
  window.addEventListener("load", () => {
    const a = document.createElement("a");
    const button = document.createElement("button");

    a.id = "download";
    a.style = "position: absolute; top: 0; left: 0;";

    button.style = "position: absolute; top: var(--button-height); left: 100px; --button-height: 24px; --button-color-background: white; --button-border-width: 0px;";
    button.id = "tampermonkey-ss";
    button.innerHTML = "Download image";
    button.addEventListener("click", () => {
      const canvas = document
        .querySelector(
          "body > mona-lisa-app > faceplate-csrf-provider > faceplate-alert-reporter > mona-lisa-embed"
        )
        .shadowRoot.querySelector(
          "div > mona-lisa-share-container > mona-lisa-camera > mona-lisa-canvas"
        )
        .shadowRoot.querySelector("div > canvas");

      // get canvas and replace with stream
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      // add image and download
      const time = getTimestamp();
      a.download = `place_${time}.png`;
      a.setAttribute("href", image);
      a.click();
    });

    document.querySelector("body").appendChild(a);
    document.querySelector("body").appendChild(button);
  });
}

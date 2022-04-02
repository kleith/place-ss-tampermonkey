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

if (window.top !== window.self) {
  window.addEventListener("load", () => {
    const button = document.createElement("button");
    button.style = "position: fixed; top: 50px; left: 100px; background: white; color: black;";
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
      const image = new Image();
      image.id = "pic";
      image.src = canvas.toDataURL();
      document.querySelector("body").appendChild(image);
      document.querySelector("body #pic");
      const w = window.open("");
      w.document.write(image.outerHTML);
    });

    document.querySelector("body").appendChild(button);
  });
}

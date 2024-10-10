const btnInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  window.deferredPrompt = e;
  //  display the button :)
  btnInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
btnInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }
  // display the prompt to the user
  promptEvent.prompt();

  // reset the defferred prompt
  window.deferredPrompt = null;
  // hide the button
  btnInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (e) => {
  // clear prompt
  window.deferredPrompt = null;
  console.log("👍", "appinstalled", e);
});

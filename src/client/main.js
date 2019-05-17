//@ts-ignore
import Notifications, { notify } from './services/Notifications.svelte';

new Notifications({
  target: document.body,
  props: {}
});

window.addEventListener('unhandledrejection', function (event) {
  console.warn(`WARNING: Unhandled promise rejection. Reason: ${event.reason}`);
  notify(event.reason, 'error')
  return false
});

window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
  console.warn(`WARNING: Unhandled error. Error: ${errorMsg}`, { errorMsg, url, lineNumber });
  notify(errorMsg.toString(), 'error')
  return false
}


import App from './App.svelte';

const app = new App({
  target: document.body,
});

export default app;

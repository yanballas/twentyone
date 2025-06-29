import './index.css';
import {App} from "./game/app.ts";

const rootEl = document.querySelector('#root');
if (rootEl) {
  rootEl.innerHTML = `
   <div id="app"></div>
`;

  new App()
}

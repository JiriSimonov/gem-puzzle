import { App } from './components/app/app';
import Button from './components/elements/button';
import './global.css';

const btn = new Button();
const app = new App();
app.start();
btn.render();

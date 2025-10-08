import { UI } from './src/UI.js';
import { BookManager } from './src/BookManager.js';
import { Storage } from './src/Storage.js';

const storage = new Storage('bookshelf:v1');
const manager = new BookManager(storage);
const ui = new UI(manager);

// Khởi động
ui.init();

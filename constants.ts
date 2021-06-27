/***** REMOTE *****/
/*export const SESSION = sessionStorage.getItem('session') ?
  JSON.parse(sessionStorage.getItem('session')) : sessionStorage.getItem('session');

export const BASE_URL = '/catalogue';
/***** end REMOTE *****/

/***** LOCAL *****/
export const SESSION = {
  accessToken: '75074b35-4237-4e86-b5ca-fd5982f4c1cf' // Sigma
};
export const BASE_URL = 'http://localhost:4223';
/***** end LOCAL *****/

/* endpoints */

export const MENUS = [
  {component: 'home', text: 'MENU.HOME', icon:'#home', description: 'MESSAGE.HOME_DESCRIPTION'},
  {component: 'letters', text: 'MENU.LETTERS', icon:'#envelope', description: 'MESSAGE.LETTER_DESCRIPTION'},
  {component: 'agreements', text: 'MENU.AGREEMENTS', icon:'#file-contract', description: 'MESSAGE.AGREEMENTS_DESCRIPTION'},
  {component: 'habits', text: 'MENU.HABITS', icon:'#heart', description: 'MESSAGE.HABITS_DESCRIPTION'},
  {component: 'announcement', text: 'MENU.ANNOUNCEMENT', icon:'#bullhorn', description: 'MESSAGE.ANNOUNCEMENT_DESCRIPTION'},
  {component: 'bank', text: 'MENU.BANK', icon:'#money-check-alt', description: 'MESSAGE.BANK_DESCRIPTION'},
  {component: 'tasks', text: 'MENU.TASKS', icon:'#tasks', description: 'MESSAGE.TASKS_DESCRIPTION'}
]

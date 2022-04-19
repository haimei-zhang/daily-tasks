/***** REMOTE *****/
// export const BASE_URL = 'https://haimei-zhang.github.io/daily-tasks';
/***** end REMOTE *****/

/***** LOCAL *****/
export const BASE_URL = 'http://localhost:4223';
/***** end LOCAL *****/

export const SESSION = {
  accessToken: '75074b35-4237-4e86-b5ca-fd5982f4c1cf'
};
/* endpoints */

export const MENUS = [
  {component: 'home', text: 'MENU.HOME', icon:'#home', description: 'MESSAGE.HOME_DESCRIPTION', router: '/home', imgSrc: 'assets/images/background1.jpg'},
  {component: 'letters', text: 'MENU.LETTERS', icon:'#envelope', description: 'MESSAGE.LETTER_DESCRIPTION', router: '/letters', imgSrc: 'assets/images/background1.jpg'},
  {component: 'agreements', text: 'MENU.AGREEMENTS', icon:'#file-contract', description: 'MESSAGE.AGREEMENTS_DESCRIPTION', router: '/agreements', imgSrc: 'assets/images/background2.jpg'},
  {component: 'habits', text: 'MENU.HABITS', icon:'#heart', description: 'MESSAGE.HABITS_DESCRIPTION', router: '/habits', imgSrc: 'assets/images/background3.jpg'},
  {component: 'tasks', text: 'MENU.TASKS', icon:'#tasks', description: 'MESSAGE.TASKS_DESCRIPTION', router: '/tasks', imgSrc: 'assets/images/background4.jpg'},
  {component: 'announcement', text: 'MENU.ANNOUNCEMENT', icon:'#bullhorn', description: 'MESSAGE.ANNOUNCEMENT_DESCRIPTION', router: '/announcement', imgSrc: 'assets/images/background5.jpg'},
  {component: 'bank', text: 'MENU.BANK', icon:'#money-check-alt', description: 'MESSAGE.BANK_DESCRIPTION', router: '/bank', imgSrc: 'assets/images/background6.jpg'},
  {component: 'analytics', text: 'MENU.ANALYTICS', icon:'#chart-bar', description: 'MESSAGE.ANALYTICS_DESCRIPTION', router: '/analytics', imgSrc: 'assets/images/background7.jpg'},
  {component: 'timeline', text: 'MENU.TIMELINE', icon:'#stream', description: 'MESSAGE.TIMELINE_DESCRIPTION', router: '/timeline', imgSrc: 'assets/images/background8.jpg'},
  {component: 'shop', text: 'MENU.SHOP', icon:'#shopping-cart', description: 'MESSAGE.SHOP_DESCRIPTION', router: '/shop', imgSrc: 'assets/images/background9.jpg'},
  {component: 'messages', text: 'MENU.MESSAGES', icon:'#comments', description: 'MESSAGE.MESSAGES_DESCRIPTION', router: '/messages', imgSrc: 'assets/images/background10.jpg'}
]

export const TASKS = [
  {id: '1', name: 'test name 1', completedDate: new Date(), notes: 'This is a test note'},
  {id: '2', name: 'test name 2', completedDate: new Date(), notes: 'This is a test note'},
  {id: '3', name: 'test name 3', completedDate: new Date(), notes: 'This is a test note'},
  {id: '4', name: 'test name 4', completedDate: new Date(), notes: 'This is a test note'},
  {id: '5', name: 'test name 5', completedDate: new Date(), notes: 'This is a test note'},
  {id: '6', name: 'test name 6', completedDate: new Date(), notes: 'This is a test note'},
  {id: '7', name: 'test name 7', completedDate: new Date(), notes: 'This is a test note'},
  {id: '8', name: 'test name 8', completedDate: new Date(), notes: 'This is a test note'},
  {id: '9', name: 'test name 9', completedDate: new Date(), notes: 'This is a test note'},
  {id: '10', name: 'test name 0', completedDate: new Date(), notes: 'This is a test note'}
];

export const DB_COLLECTION_NAME = {
  USER: 'user',
  SELF_CARE_TASKS: 'self_care_tasks',
  SPORTS_TASKS: 'sports_tasks',
  STUDY_TASKS: 'study_tasks',
  MEDITATION_TASKS: 'meditation_tasks',
  GAME_TASKS: 'game_tasks',
  CHALLENGING_TASKS: 'challenging_tasks',
  LOVE_TASKS: 'love_tasks',
  MOVIE_TASKS: 'movie_tasks'
};

export const INVITATION_STATUS = {
  CONNECTED: 'Connected',
  INVITED: 'Invited',
  PENDING_ACCEPTED: 'Pending Accepted',
};

export const AGREEMENT_TYPE = {
  GENERAL_RULE: 'GENERAL_RULE',
  DETAILED_RULE: 'DETAILED_RULE'
}

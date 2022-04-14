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

export const SELF_CARE_TASKS = [
  {id: 1, name: '做饭刷碗', completedDate: new Date(), notes: '还是用洗碗机方便啊，啥都往里丢。'},
  {id: 2, name: '健康食物拍照打卡', completedDate: new Date(), notes: '今天吃了酱拌饭，懒得要死。'},
  {id: 3, name: '打扫一个房间', completedDate: new Date(), notes: '每天打扫一个房间就比平时不打扫突然打扫整个房子轻松多了。'},
  {id: 4, name: '洗澡', completedDate: new Date(), notes: '洗澡之前各种不想去，洗澡的时候各种不想停。'},
  {id: 5, name: '抹脸', completedDate: new Date(), notes: '维C维E胶原蛋白，啥都往脸上招呼就对了。'}
];

export const SPORTS_TASKS = [
  {id: 1, name: '跳绳100个', completedDate: new Date(), notes: '跳得心脏病要犯了。'},
  {id: 2, name: '俯卧撑25个', completedDate: new Date(), notes: '才25个，小菜一碟。'},
  {id: 3, name: '散步15分钟', completedDate: new Date(), notes: '走路十分钟就已经腰酸背痛了。'},
  {id: 4, name: '慢跑10分钟', completedDate: new Date(), notes: '欧不，我希望把它去掉！'}
];

export const STUDY_TASKS = [
  {id: 1, name: '安静环境读书半小时', completedDate: new Date(), notes: '这个好。'},
  {id: 2, name: '有效学习半小时', completedDate: new Date(), notes: '只要不是AWS就行。'},
  {id: 3, name: '有效复习15分钟', completedDate: new Date(), notes: '五分钟就搞定了。'},
  {id: 4, name: '绘画或者涂鸦一幅', completedDate: new Date(), notes: '不给小笨笨。'},
  {id: 5, name: '演奏15分钟', completedDate: new Date(), notes: '我等着小笨笨给我买古琴。'},
  {id: 6, name: '音乐灵感一段', completedDate: new Date(), notes: '小笨笨最擅长~'},
  {id: 7, name: '日语/英语一课', completedDate: new Date(), notes: '各做各的~'},
  {id: 8, name: '画画/弹琴一课', completedDate: new Date(), notes: '各做各的~'},
  {id: 9, name: 'AWS/编曲一课', completedDate: new Date(), notes: '各做各的~'},
  {id: 10, name: '个人app + Firebase后台', completedDate: new Date(), notes: '我做，笨笨出谋划策'}
];

export const MEDITATION_TASKS = [
  {id: 1, name: '读经表读经或一日三章', completedDate: new Date(), notes: '听更好。'},
  {id: 2, name: '灵修-读经文后感悟交流或自己写一篇字数不限', completedDate: new Date(), notes: '小笨笨最喜欢写作文了。'}
];

export const GAME_TASKS = [
  {id: 1, name: '玩共同的游戏时间不限', completedDate: new Date(), notes: '这就多了，根本玩不完。'},
  {id: 2, name: '做一件双方都喜爱的事情', completedDate: new Date(), notes: '这就多了，根本做不完。'}
];

export const CHALLENGING_TASKS = [
  {id: 1, name: '喝酒', completedDate: new Date(), notes: '我的最爱。'},
  {id: 2, name: '淋雨', completedDate: new Date(), notes: '大雨压小笨笨的脑袋。'},
  {id: 3, name: '熬夜', completedDate: new Date(), notes: '我最擅长。'},
  {id: 4, name: '冒险', completedDate: new Date(), notes: '小笨笨最不怕。'}
];

export const LOVE_TASKS = [
  {id: 1, name: '每日聊天', completedDate: new Date(), notes: '聊个锤子。'},
  {id: 2, name: '语音时间不限', completedDate: new Date(), notes: '小笨笨太吵了我不愿意。'},
  {id: 3, name: '每周视频时间不限', completedDate: new Date(), notes: '小笨笨太丑了我不愿意。'},
  {id: 4, name: '给对方讲一个可爱故事', completedDate: new Date(), notes: '这个可以有。'},
  {id: 5, name: '给对方一个丑照', completedDate: new Date(), notes: '我是拒绝的。'}
];

export const MESSAGES = [
  {id: 1, name: '笨笨', date: new Date(), notes: '来踩踩。'},
  {id: 2, name: '宝宝', date: new Date(), notes: '不知道说啥好。'},
  {id: 3, name: '笨笨', date: new Date(), notes: '笨笨太笨了。'},
  {id: 4, name: '宝宝', date: new Date(), notes: '笨笨是个大笨蛋。'},
  {id: 5, name: '宝宝', date: new Date(), notes: '没错真的好笨啊。'}
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

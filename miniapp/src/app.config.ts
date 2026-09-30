export default defineAppConfig({
  pages: [
    'pages/explore/index',
    'pages/itinerary/index',
    'pages/squads/index',
    'pages/squads/detail',
    'pages/checkin/index',
    'pages/profile/index',
    'pages/trips/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '周末去哪玩',
    navigationBarTextStyle: 'black',
    backgroundColor: '#faf8ff',
  },
  tabBar: {
    color: '#81765f',
    selectedColor: '#785a00',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/explore/index',
        text: '探索',
        iconPath: 'assets/icons/explore.png',
        selectedIconPath: 'assets/icons/explore_active.png',
      },
      {
        pagePath: 'pages/squads/index',
        text: '搭子',
        iconPath: 'assets/icons/squads.png',
        selectedIconPath: 'assets/icons/squads_active.png',
      },
      {
        pagePath: 'pages/trips/index',
        text: '行程',
        iconPath: 'assets/icons/trips.png',
        selectedIconPath: 'assets/icons/trips_active.png',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/icons/profile.png',
        selectedIconPath: 'assets/icons/profile_active.png',
      },
    ],
  },
  permission: {
    'scope.userLocation': {
      desc: '用于推荐周边景点路线与拼车距离计算',
    },
  },
  requiredPrivateInfos: ['getLocation', 'chooseLocation'],
});

App.info({
  id: 'us.Pakke',
  name: 'Pakke',
  version: '0.1.0',
  description: 'Pakke: Not your typical night out...',
  author: 'Kiel H. Byrne',
  email: 'kiel.byrne@pakke.us',
  website: 'https://www.pakke.us'
});

// App.launchScreens({
  // 'iphone_2x': 'splash/Default@2x~iphone.png',
  // 'iphone5': 'splash/Default~iphone5.png',
  // More screen sizes and platforms...
// });

App.icons({
  'iphone_2x': 'public/icons/apple-touch-icon-120x120.png?v=qA32peaped',
  'iphone_3x': 'public/icons/apple-touch-icon-180x180.png?v=qA32peaped',
  'ipad': 'public/icons/apple-touch-icon-76x76.png?v=qA32peaped',
  'ipad_2x': 'public/icons/apple-touch-icon-152x152.png?v=qA32peaped',
  'ios_notification_3x': 'public/icons/apple-touch-icon-60x60.png?v=qA32peaped'
});
 
App.setPreference('BackgroundColor', '0xff404040');
// App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#226199');
// App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//   APP_ID: '235091633613282',
//   API_KEY: 'f5138f920f667c10c4838a6b074ee451'
// });

// Set up Access Rules
App.accessRule('localhost');
App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');
App.accessRule('*.stripe.com/*');

// App.configurePlugin('cordova-plugin-googleplus', {
//     'REVERSED_CLIENT_ID': 'com.googleusercontent.apps.xxxx'
// });


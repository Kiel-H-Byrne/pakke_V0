App.info({
  id: 'us.Pakke',
  name: 'Pakke',
  version: '0.0.1',
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
  'iphone_2x': 'public/icons/apple-icon-120x120.png',
  'iphone_3x': 'public/icons/apple-icon-180x180.png',
  'ipad': 'public/icons/apple-icon-76x76.png',
  'ipad_2x': 'public/icons/apple-icon-152x152.png',
  'ios_notification_3x': 'public/icons/apple-icon-60x60.png',
  'iphone_legacy': 'public/icons/apple-icon-57x57.png',
  'ipad_app_legacy': 'public/icons/apple-icon-72x72.png',
  'android_hdpi': 'public/icons/apple-icon-72x72.png',
  'android_xxhdpi': 'public/icons/ms-icon-144x144.png'
});
 
App.setPreference('BackgroundColor', '0xff404040');
// App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#ffffff');
// App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//   APP_ID: '235091633613282',
//   API_KEY: 'f5138f920f667c10c4838a6b074ee451'
// });

// Set up Access Rules
App.accessRule('localhost');
App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');

// App.configurePlugin('cordova-plugin-googleplus', {
//     'REVERSED_CLIENT_ID': 'com.googleusercontent.apps.xxxx'
// });


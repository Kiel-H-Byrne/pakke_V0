import { initAnalytics } from '@okgrow/auto-analytics';
import analytics from 'lib/analytics/analytics.min.js';


// Add your analytics integrations and their tracking ids + config options here.
const analyticsSettings = {
  analytics,
  integrations: {
    'Google Analytics': { 'trackingId': Meteor.settings.public.keys.googleAnalytics.trackingId }
  },
  options: {
    // Segment options to be passed to initialize() from analytics.js-core
  },
  autorun: true, // Defaults to true if not provided.
};
 
initAnalytics(analyticsSettings);

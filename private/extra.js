Meteor.loginWithPassword("noreply@pakke.us", "pakkeP@RTY")

Meteor.call('getCL', "KnbJ5WkNbHhkLqHHx");

analytics.page({
  title: 'Signup Modal',
  url: 'https://segment.com/#signup',
  path: '/#signup',
  referrer: 'https://segment.com/'
});

analytics.track('Registered', {
  label: 'Premium',
  value: 50,
  others: 'others...'
});

analytics.track('Registered', {
  label: 'Facebook Account',
  value: 50,
  others: 'others...'
});

analytics.track('Registered', {
  label: 'Google Account',
  value: 50,
  others: 'others...'
});

analytics.track('Events: Applied', {
  label: 'Premium',
  value: event.price,
  others: 'others...'
  guest email
});

analytics.track('Events: New Event', {
  label: event.byline,
  value: event.price * event.size,
  others: 'others...'
  host email, name, etc.
});

analytics.track('Events: Purchased Ticket', {
  label: 'Premium',
  revenue: event.price,
  others: 'others...'
});


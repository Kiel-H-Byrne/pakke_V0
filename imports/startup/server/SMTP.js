Meteor.startup(function () {
  const smtp = {
    // username: 'postmaster@sandbox6ba51b6be4634d88b492b2418b1b7c4c.mailgun.org',
    username: "postmaster@mg.pakke.us",
    password: Meteor.settings.public.keys.mailgun.password,
    server:   "smtp.mailgun.org",
    port: 587
  };
   process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

});





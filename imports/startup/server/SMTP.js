
const smtp = {
  // username: 'postmaster@sandbox6ba51b6be4634d88b492b2418b1b7c4c.mailgun.org',
  username: "noreply@pakke.us",
  password: 'kr0wnedKing!',
  server:   "smtp.zoho.com",
  port: 465
};

process.env.MAIL_URL = `smtps://${encodeURIComponent(smtp.username)}:${encodeURIComponent(smtp.password)}@${encodeURIComponent(smtp.server)}:${smtp.port}`;

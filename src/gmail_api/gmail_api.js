const { google } = require('googleapis');
const Sleeper = require('../sleeper/sleeper');

class GmailApi {

  constructor() {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URIS,
    );
    oauth2Client.setCredentials({
      "access_token": "ya29.GlsZB9sjhMH4BsmvKsP7X-YSfxhQ70jJeHovUjOdFvxpo3UeaCmpq3C__n3Zxb0aCaWtEq-m4F1XghN7dRGVr6PI8TalwAhoCW9f0nMcxCC3H0v-sMDo7udmQsNV",
      "refresh_token": "1/9eRuwZvFeNTOJdNSPcqzNGOkA_mu8RDNYPcgmRjBruE",
      "scope": "https://www.googleapis.com/auth/gmail.readonly",
      "token_type": "Bearer",
      "expiry_date": 1559225168980
    });
    this.gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  }

  async getMail(user){
    return (await this.gmail.users.messages.list({
      userId: user.email
      //q: "from:noreply@filament.ai is:unread"
    })).data;
  }

  async getMessageById(user, messageId){
    await Sleeper.sleep(10);
    const email = (await this.gmail.users.messages.get({
      userId: user.email,
      id: messageId
  }));
  if (email){
    return email.data.snippet;
  }
  else throw new Error(`Couldn't find an email for ${user.email} with an id of ${messageId}.`)
  }
}

module.exports = GmailApi;
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
      "access_token": process.env.GMAIL_ACCESS_TOKEN,
      "refresh_token": process.env.GMAIL_REFRESH_TOKEN,
      "scope": "https://www.googleapis.com/auth/gmail.modify",
      "token_type": "Bearer",
      "expiry_date": process.env.GMAIL_EXPIRY_DATE
    });
    this.gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  }

  async getMail(user){
    await Sleeper.sleep(5);
    return (await this.gmail.users.messages.list({
      userId: user.email
    })).data;
  }

  async getMessageById(user, messageId){
    await Sleeper.sleep(5);
    const email = (await this.gmail.users.messages.get({
      userId: user.email,
      id: messageId
  }));
  if (email){
    return email.data.snippet;
  }
  else throw new Error(`Couldn't find an email for ${user.email} with an id of ${messageId}.`)
  }

  async modifyMessageById(user, messageId) {
    await Sleeper.sleep(5);
    await this.gmail.users.messages.modify({
      userId: user.email,
      id: messageId,
      resource: {
        addLabelIds: ['TRASH'],
        removeLabelIds: ['INBOX']
      }
    });
  };
}

module.exports = GmailApi;
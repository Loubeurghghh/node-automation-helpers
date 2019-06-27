const { google } = require('googleapis');
const Sleeper = require('../sleeper/sleeper');

class GmailApi {

  // These below commented out environment variables need to replace hardcoded data as soon as DevOps ticket

  constructor() {
    const oauth2Client = new google.auth.OAuth2(
      //process.env.GMAIL_CLIENT_ID,
      //process.env.GMAIL_CLIENT_SECRET,
      //process.env.GMAIL_REDIRECT_URIS,
      '489971841888-9gb4ebi67vikmv2h0q7to6s3rcp7gvpg.apps.googleusercontent.com',
      'KoHFl7rDC-Ll0XCiai77BjpB',
      '["urn:ietf:wg:oauth:2.0:oob","http://localhost"]'
    );
    oauth2Client.setCredentials({
      //"access_token": process.env.GMAIL_ACCESS_TOKEN,
      "access_token": 'ya29.GlscB792gIMmknIvB6WRd2AVmEY5ApQuPBe8M4T52sJx-YMBIoa9R0KPtnpymNTM9JcRN6TrRvLMXLTDjfuo7_p6ozLxzhK5QKTiv3B6Sktfm_LJQovMbQNTXfoF',
      //"refresh_token": process.env.GMAIL_REFRESH_TOKEN,
      "refresh_token": '1/TK5jBTn4KYWw-ech5YFjcG2hDjtqjyP8v-DfFQvJOQ44lYBfreyAlYBc8BvZnjC0',
      "scope": "https://www.googleapis.com/auth/gmail.modify",
      "token_type": "Bearer",
      //"expiry_date": process.env.GMAIL_EXPIRY_DATE
      "expiry_date": 1559654510814
    });
    this.gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  }

  async getMail(user) {
    await Sleeper.sleep(5);
    return (await this.gmail.users.messages.list({
      userId: user.email
    })).data;
  }

  async getMessageById(user, messageId) {
    await Sleeper.sleep(5);
    const email = (await this.gmail.users.messages.get({
      userId: user.email,
      id: messageId,
      format: "full"
    }));
    if (email) {
      return email.data.payload.parts[1].body.data;
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
const validations = require('../../lib/validations');


/**
 * Provides prompts configurations in the config generator
 * 
 * @param {type} questionNames
 * @returns {unresolved}
 */
function getPrompts(...questionNames) {

  // Start
  function port () { return { type: 'input',name: 'port',message: 'Port:',default: 3000,validate: validations.assertNonEmpty, }; }
  function packageLocation () { return { type: 'input',name: 'packageLocation', message: 'PackageLocation:',default: "~/.Vulcan",validate: validations.assertNonEmpty, }; }

  // public
  function title() { return {type: 'input', name: 'title', message: 'title:', default: "Your site title", validate: validations.assertNonEmpty, }; } ;
  function tagline() { return {type: 'input', name: 'tagline', message: 'tagline:', default: "Your site tagline", validate: validations.assertNonEmpty, }; } ;
  function logoUrl() { return {type: 'input', name: 'logoUrl', message: 'logoUrl:', default: "http://placekitten.com/250/80", validate: validations.assertNonEmpty, }; } ;
  function logoHeight() { return {type: 'input', name: 'logoHeight', message: 'logoHeight:', default: "80", validate: validations.assertNonEmpty, }; } ;
  function logoWidth() { return {type: 'input', name: 'logoWidth', message: 'logoWidth:', default: "250", validate: validations.assertNonEmpty, }; } ;
  function faviconUrl() { return {type: 'input', name: 'faviconUrl', message: 'faviconUrl:', default: "/favicon.ico", validate: validations.assertNonEmpty, }; } ;
  function requirePostsApproval() { return {type: 'input', name: 'requirePostsApproval', message: 'requirePostsApproval:', default: false, validate: validations.assertNonEmpty, }; } ;
  function requireViewInvite() { return {type: 'input', name: 'requireViewInvite', message: 'requireViewInvite:', default: false, validate: validations.assertNonEmpty, }; } ;
  function requirePostInvite() { return {type: 'input', name: 'requirePostInvite', message: 'requirePostInvite:', default: false, validate: validations.assertNonEmpty, }; } ;
  function enableNewsletter() { return {type: 'input', name: 'enableNewsletter', message: 'enableNewsletter:', default: true, validate: validations.assertNonEmpty, }; } ;
  function autoSubscribe() { return {type: 'input', name: 'autoSubscribe', message: 'autoSubscribe:', default: false, validate: validations.assertNonEmpty, }; } ;
  function emailNotifications() { return {type: 'input', name: 'emailNotifications', message: 'emailNotifications:', default: true, validate: validations.assertNonEmpty, }; } ;
  function postInterval() { return {type: 'input', name: 'postInterval', message: 'postInterval:', default: 20, validate: validations.assertNonEmpty, }; } ;
  function RSSLinksPointTo() { return {type: 'input', name: 'RSSLinksPointTo', message: 'RSSLinksPointTo:', default: "link", validate: validations.assertNonEmpty, }; } ;
  function commentInterval() { return {type: 'input', name: 'commentInterval', message: 'commentInterval:', default: 20, validate: validations.assertNonEmpty, }; } ;
  function maxPostsPerDay() { return {type: 'input', name: 'maxPostsPerDay', message: 'maxPostsPerDay:', default: 10, validate: validations.assertNonEmpty, }; } ;
  function startInvitesCount() { return {type: 'input', name: 'startInvitesCount', message: 'startInvitesCount:', default: 5, validate: validations.assertNonEmpty, }; } ;
  function postsPerPage() { return {type: 'input', name: 'postsPerPage', message: 'postsPerPage:', default: 10, validate: validations.assertNonEmpty, }; } ;
  function language() { return {type: 'input', name: 'language', message: 'language:', default: "en", validate: validations.assertNonEmpty, }; } ;
  function locale() { return {type: 'input', name: 'locale', message: 'locale:', default: "en", validate: validations.assertNonEmpty, }; } ;

   // Emailing 
  function defaultEmail () { return { type: 'input',name: 'defaultEmail',message: 'defaultEmail:',default: "hello@world.com",validate: validations.assertNonEmpty, }; };
  function mailUrl () { return { type: 'input',name: 'mailUrl',message: 'mailUrl:',default: "smtp://username%40yourdomain.mailgun.org:yourpassword123@smtp.mailgun.org:587/",validate: validations.assertNonEmpty, }; };
  function scoreUpdateInterval () { return { type: 'input',name: 'scoreUpdateInterval',message: 'scoreUpdateInterval:',default: "30",validate: validations.assertNonEmpty, }; };
  function embedlyKey () { return { type: 'input',name: 'embedlyKey',message: 'embedlyKey:',default: "123foo",validate: validations.assertNonEmpty, }; };
  function mailChimpAPIKey () { return { type: 'input',name: 'mailChimpAPIKey',message: 'mailChimpAPIKey:',default: "123foo",validate: validations.assertNonEmpty, }; };
  function mailChimpListId () { return { type: 'input',name: 'mailChimpListId',message: 'mailChimpListId:',default: "123foo",validate: validations.assertNonEmpty, }; };
  function newsletterTime () { return { type: 'input',name: 'newsletterTime',message: 'newsletterTime:',default: "14:20",validate: validations.assertNonEmpty, }; };
  function newsletterExcerptLength () { return { type: 'input',name: 'newsletterExcerptLength',message: 'newsletterExcerptLength:',default: 20,validate: validations.assertNonEmpty, }; };
  function postExcerptLength () { return { type: 'input',name: 'postExcerptLength',message: 'postExcerptLength:',default: 30,validate: validations.assertNonEmpty, }; };

  /**
   * Local helper, used as map function
   * @param {type} questionName
   * @returns {Array}
   */
  function getSingleQuestion(questionName) {
    
    switch (questionName) {
      
      
      // Start
      case 'port': return port(); break;
      case 'packageLocation': return packageLocation(); break;
      
      // public 
      case 'title': return title(); break;
      case 'tagline': return tagline(); break;
      case 'logoUrl': return logoUrl(); break;
      case 'logoHeight': return logoHeight(); break;
      case 'logoWidth': return logoWidth(); break;
      case 'faviconUrl': return faviconUrl(); break;
      case 'requirePostsApproval': return requirePostsApproval(); break;
      case 'requireViewInvite': return requireViewInvite(); break;
      case 'requirePostInvite': return requirePostInvite(); break;
      case 'enableNewsletter': return enableNewsletter(); break;
      case 'autoSubscribe': return autoSubscribe(); break;
      case 'emailNotifications': return emailNotifications(); break;
      case 'postInterval': return postInterval(); break;
      case 'RSSLinksPointTo': return RSSLinksPointTo(); break;
      case 'commentInterval': return commentInterval(); break;
      case 'maxPostsPerDay': return maxPostsPerDay(); break;
      case 'startInvitesCount': return startInvitesCount(); break;
      case 'postsPerPage': return postsPerPage(); break;
      case 'language': return language(); break;
      case 'locale': return locale(); break;
      
      // Emailing
      case 'defaultEmail': return defaultEmail(); break;
      case 'mailUrl': return mailUrl(); break;
      case 'scoreUpdateInterval': return scoreUpdateInterval(); break;
      case 'embedlyKey': return embedlyKey(); break;
      case 'mailChimpAPIKey': return mailChimpAPIKey(); break;
      case 'mailChimpListId': return mailChimpListId(); break;
      case 'newsletterTime': return newsletterTime(); break;
      case 'newsletterExcerptLength': return newsletterExcerptLength(); break;
      case 'postExcerptLength': return postExcerptLength(); break;
      
      default: return undefined;
    }
  }

  return questionNames.map(getSingleQuestion);
}

/**
 * Provides lists of options in prompts in the config generator
 * 
 * @param {type} category
 * @returns {Array}
 */
function getList(category) {
  
  switch (category) {
    case 'start' :
      return [
        {name: 'port', value: 'port', checked: false},
        {name: 'packageLocation', value: 'packageLocation', checked: false},
      ];
      break;
    case 'public' :
      return [
        {name: 'title', value: 'title', checked: false},
        {name: 'tagline', value: 'tagline', checked: false},
        {name: 'logoUrl', value: 'logoUrl', checked: false},
        {name: 'logoHeight', value: 'logoHeight', checked: false},
        {name: 'logoWidth', value: 'logoWidth', checked: false},
        {name: 'faviconUrl', value: 'faviconUrl', checked: false},
        {name: 'requirePostsApproval', value: 'requirePostsApproval', checked: false},
        {name: 'requireViewInvite', value: 'requireViewInvite', checked: false},
        {name: 'requirePostInvite', value: 'requirePostInvite', checked: false},
        {name: 'enableNewsletter', value: 'enableNewsletter', checked: false},
        {name: 'autoSubscribe', value: 'autoSubscribe', checked: false},
        {name: 'emailNotifications', value: 'emailNotifications', checked: false},
        {name: 'postInterval', value: 'postInterval', checked: false},
        {name: 'RSSLinksPointTo', value: 'RSSLinksPointTo', checked: false},
        {name: 'commentInterval', value: 'commentInterval', checked: false},
        {name: 'maxPostsPerDay', value: 'maxPostsPerDay', checked: false},
        {name: 'startInvitesCount', value: 'startInvitesCount', checked: false},
        {name: 'postsPerPage', value: 'postsPerPage', checked: false},
        {name: 'language', value: 'language', checked: false},
        {name: 'locale', value: 'locale', checked: false},
      ];
      break;
    case 'emailing' :
      return [
        {name: 'defaultEmail', value: 'defaultEmail', checked: false},
        {name: 'mailUrl', value: 'mailUrl', checked: false},
        {name: 'scoreUpdateInterval', value: 'scoreUpdateInterval', checked: false},
        {name: 'embedlyKey', value: 'embedlyKey', checked: false},
        {name: 'mailChimpAPIKey', value: 'mailChimpAPIKey', checked: false},
        {name: 'mailChimpListId', value: 'mailChimpListId', checked: false},
        {name: 'newsletterTime', value: 'newsletterTime', checked: false},
        {name: 'newsletterExcerptLength', value: 'newsletterExcerptLength', checked: false},
        {name: 'postExcerptLength', value: 'postExcerptLength', checked: false},      ];
      break;
  }

}

module.exports = {
  getPrompts,
  getList
};

const url = require('url');

//set up database
var mongoose = require('mongoose');
//mongodb://<dbuser>:<dbpassword>@ds155961.mlab.com:55961/alt-slacks-bot
console.log("connecting to mongoDB","altSlack","altslack123" );// we're connected!
mongoose.connect("mongodb://fazbat:pass2964@ds155961.mlab.com:55961/alt-slacks-bot");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongoDB");// we're connected!
});

var NewsSite = require("./models/news-site");//news site model for mongodb/mongoose


module.exports = function(bp) {
  bp.middlewares.load()

  var query = " ";

  bp.hear({ platform: 'slack', type: 'message', text: 'hello'}, (event, next) => {
   bp.slack.sendText(event.channel.id, `Hello, ${event.user.name}! I'm the alt-slack bot.`
   + ` I can search over 400 sites to give you information about fake news.`
     + `Type 'menu' to get a list of my commands.`)
  })

 bp.hear({ platform: 'slack', type: 'message', text: 'menu' }, (event, next) => {
 bp.slack.sendText(event.channel.id, "Here is a list of my commands: \n*menu*"
   + "\t\tlists commands\n*alt-title* <publication name>"
   +"\t\tprovides information about a publication\n*alt-url* "
   + "<URL>\t\t find information about a fake news URL\n"
   + "*help*\t\tprovides information about how to use the fake news bot.\n")
 })

 bp.hear({ platform: 'slack', type: 'message', text: 'help' }, (event, next) => {
 bp.slack.sendText(event.channel.id, "I have a database of over 400 fake news websites"
   + " to provide you with information about a fake news site and its"
   + " alignment. To search by site title, type 'alt-title' followed by the name."
   + " of the site. To search by URL, type 'alt-url' followed by the index URL.")
 })

 bp.hear({ platform: 'slack', type: 'message', text: /^alt-title(.*)/ig }, (event, next) => {
    console.log("name",event.user.name);
    console.log("name",event.text);

    //remove command
    let text = event.text;
    text = text.substr(9).trim();

    //error if no search criteria
    if(text.length === 0){
      bp.slack.sendText(event.channel.id, "Oops! You need to give me a title!");
    }

    text=text.toLowerCase();
    console.log("text",text);

  NewsSite.find({title:new RegExp('^'+text+'$', "i")},function(err,site){
    if(err){
      console.log(err);
      bp.slack.sendText(event.channel.id, "Error: Could not retrieve News Site.");
      return;
    }
    console.log(site)//todo

    if(site.length === 0){
      bp.slack.sendText(event.channel.id, `We could not find any fake news sites with the ID "${text}."`);
      return;
    }

    bp.slack.sendText(event.channel.id,
      `We found *${site[0].title}*: \n`+
      `*Category*: ${site[0].category}\n` +
      `*Political alignment*: ${site[0].politicalAlignment}\n`  +//put code for alignment here
      `*Website URL*: ${site[0].url}\n`//code for URL
    )

  })
 })

 bp.hear({ platform: 'slack', type: 'message', text: /^alt-url(.*)/ig }, (event, next) => {
    console.log("name",event.user.name);
    console.log("text",event.text);

    //remove command
    let text = event.text;
    text = text.substr(8).trim();

    //error if no search criteria
    if(text.length === 0){
      bp.slack.sendText(event.channel.id, "Oops! You need to give me a URL.");
    }

    let URL=text.toLowerCase().substring(1,text.length-1);//remove carrots included by Slack ie. '<http://someplace.org>'
    console.log("text",text);//todo

    URL = url.parse(URL);
    console.log("URL",URL);//todo

  NewsSite.find({hostname:new RegExp('^'+URL.hostname+'$', "i")},function(err,site){
    if(err){
      console.log(err);
      bp.slack.sendText(event.channel.id, "Error: could not retrieve news site.");
      return;
    }
    console.log("site",site);
    if(site.length === 0){
      bp.slack.sendText(event.channel.id, `We could not find any fake news sites with the ID "${text}."`);
      return;
    }

    bp.slack.sendText(event.channel.id,
      `We found *${site[0].title}*: \n`+
      `*Category*: ${site[0].category}\n` +
      `*Political alignment*: ${site[0].politicalAlignment}\n`  +//put code for alignment here
      `*Website URL*: ${site[0].url}\n`//code for URL
    )

  })


 })

/*
//testing route
 bp.hear({ platform: 'slack', type: 'message', text: /^alt-test(.*)/ig }, (event, next) => {
    console.log("name",event.user.name);
    console.log("name",event.text);
    bp.slack.sendText(event.channel.id, `TEST: "${event.text}"`);
 })
 //testing route
  bp.hear({ platform: 'slack',type: 'message'}, (event, next) => {
     console.log("GENERAL-TEST");
     console.log(event.text);
     console.log(event.type);
  })
*/
}

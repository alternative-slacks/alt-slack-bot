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
   bp.slack.sendText(event.channel.id, `Hello ${event.user.name}! I'm the fake news bot.
     Type 'menu' to get a list of my commands.`)
  })

 bp.hear({ platform: 'slack', type: 'message', text: 'menu' }, (event, next) => {
 bp.slack.sendText(event.channel.id, "Here is a list of my commands: \n*menu*"
   + "\t\tlists commands\n*alt-title* <publication name>"
   +"\t\tprovides information about a publication\n*alt-url* "
   + "<URL>\t\t find information about a fake news URL\n"
   + "*help*\t\tprovides information about how to use the fake news bot\n")
 })

 bp.hear({ platform: 'slack', type: 'message', text: 'Who are you?' }, (event, next) => {
   bp.slack.sendText(event.channel.id, 'I am the fake news bot!')
 })

 bp.hear({ platform: 'slack', type: 'message', text: 'I love you' }, (event, next) => {
   bp.slack.sendText(event.channel.id, 'Awww, I love you, too, my little pudding pie!')
 })

 bp.hear({ platform: 'slack', type: 'message', text: 'help' }, (event, next) => {
 bp.slack.sendText(event.channel.id, "I can search fake news websites"
   + " to provide you with information about their category and political" +
   " alignment. Type 'get' followed by the name of the publication or the URL.")
 })

 bp.hear({ platform: 'slack', type: 'message', text: 'Thanks' }, (event, next) => {
 bp.slack.sendText(event.channel.id, "You're quite welcome! :slight smile:")
 })

 bp.hear({ platform: 'slack', type: 'message', text: 'get' }, (event, next) => {
 bp.slack.sendText(event.channel.id, "Publication title: \n"
       + "URL: \n Category: \n"
       + "Political Alignment: \n")
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
      bp.slack.sendText(event.channel.id, "error: could not retrieve News Site");
      return;
    }
    console.log(site)
    bp.slack.sendText(event.channel.id, `We found ${site[0].title}, it's ${site[0].category}`)

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
      bp.slack.sendText(event.channel.id, "Oops! You need to give me a URL!");
    }

    let URL=text.toLowerCase().substring(1,text.length-1);//remove carrots included by Slack ie. '<http://someplace.org>'
    console.log("text",text);//todo

    URL = url.parse(URL);
    console.log("URL",URL);//todo

  NewsSite.find({hostname:new RegExp('^'+URL.hostname+'$', "i")},function(err,site){
    if(err){
      console.log(err);
      bp.slack.sendText(event.channel.id, "error: could not retrieve News Site");
      return;
    }
    console.log("site",site);
    if(site.length === 0){
      bp.slack.sendText(event.channel.id, `We could not find any Fake News sites with that ID "${text}"`);
      return;
    }

    bp.slack.sendText(event.channel.id, `We found ${site[0].title}, it's ${site[0].category}`)

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

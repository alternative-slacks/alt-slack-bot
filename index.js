module.exports = function(bp) {
  bp.middlewares.load()

  var query = " ";

  bp.hear({ platform: 'slack', type: 'message', text: 'hello'}, (event, next) => {
 bp.slack.sendText(event.channel.id, "Welcome! I'm the fake news bot."
   + " Type 'menu' to get a list of my commands.")
})

 bp.hear({ platform: 'slack', type: 'message', text: 'menu' }, (event, next) => {
 bp.slack.sendText(event.channel.id, "Here is a list of my commands: \n*menu*"
   + "\t\tlists commands\n*get* <publication name>"
   +"\t\tprovides information about a publication\n*get* "
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

 // for testing purposes only. when actually using it as fake-news-bot, reactivate following
 // command and for loop.

 bp.hear({ platform: 'slack', type: 'message', text: 'get' }, (event, next) => {
 bp.slack.sendText(event.channel.id, "Publication title: \n"
       + "URL: \n Category: \n"
       + "Political Alignment: \n")
 })

 bp.hear({ platform: 'slack', type: 'message', text: 'alt-site' }, (event, next) => {
 bp.slack.sendText(event.channel.id, "ALT-SITE-TEST")
 })


 bp.hear({ platform: 'slack', type: 'message', text: 'alt-url' }, (event, next) => {
 bp.slack.sendText(event.channel.id, "ALT-URL-TEST")
 })


 bp.hear({ platform: 'slack', type: 'message', text: '/test' }, (event, next) => {
 bp.slack.sendText(event.channel.id, "TEST_WORKS!!")
 })




}









 // loop through data to grab the publication or URL in user query
/*
 for (var i = 0; i < data.length; i++) {

      const getPublicationRegex = /^get (.+)/i
      bp.hear({ platform: 'slack', type: 'message', text: getPublicationRegex }, (event, next) => {
      const [__, publication] = getPublicationRegex.exec(event.text)

        bp.slack.sendText(event.channel.id, "Publication title: " + data.siteTitle[i] + "\n"
        + "URL: " + data.siteUrl[i] + "\n Category: " + data.siteCategory[i] + "\n"
        + "Political Alignment: " + data.sitePoliticalAlignment[i] + "\n")

    })


}
*/

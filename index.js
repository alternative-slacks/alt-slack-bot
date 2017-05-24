var query = " ";

module.exports = function(bp) {
  bp.middlewares.load()

  bp.hear({ platform: 'slack', type: 'message', text: 'hello'}, (event, next) => {
	bp.slack.sendText(event.channel.id, "Welcome! I'm the fake news bot."
    + " Type 'menu' to get a list of my commands.")
})

  bp.hear({ platform: 'slack', type: 'message', text: 'menu' }, (event, next) => {
  bp.slack.sendText(event.channel.id, "Here is a list of my commands: \nmenu"
    + "\tlists commands\nget <publication name>"
    + "\tprovides information about a publication\nhelp\tprovides information about how to use "
    + "the fake news bot\n")
  })

  bp.hear({ platform: 'slack', type: 'message', text: 'Who are you?' }, (event, next) => {
  	bp.slack.sendText(event.channel.id, 'I am the fake news bot!')
  })

  bp.hear({ platform: 'slack', type: 'message', text: 'help' }, (event, next) => {
  bp.slack.sendText(event.channel.id, "I can search fake news websites"
    + " to provide you with information about their category and political" +
    " alignment. Type 'get' followed by the name of the publication.")
  })

  bp.hear({ platform: 'slack', type: 'message', text: 'Thanks' }, (event, next) => {
  bp.slack.sendText(event.channel.id, "You're quite welcome! :slight smile:")
  })

  bp.hear({ platform: 'slack', type: 'message', text: 'get' + query }, (event, next) => {
		for (var i = 0; i < data.length; i++) {
				bp.slack.sendText(event.channel.id, "Publication title: " + data.siteTitle[i] + "\n"
		    + "URL: " + data.siteUrl[i] + "\n Category: " + data.siteCategory[i] + "\n"
		    + "Political Alignment: " + data.sitePoliticalAlignment[i] + "\n")
		}

	})


}

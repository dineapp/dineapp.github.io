var Pie = Backbone.Model.extend({
	defaults: {
      type: 'unkown',
      pieces: 8
    }
});

var pie1 = new Pie;

pie1.type = "apple";


var navView = Backbone.View.extend({

	el: $("body"),

	events: {
		'click button#more_trons': 'addMore',
		'click button#less_items': "deleteTron"
	},

	initialize: function(){
		 _.bindAll(this, 'render')

		 this.counter = 1;
		 this.render();
	},

	render: function(){
		var html = new EJS({url: '../JS/templates/nav.ejs'}).render(Pie)
		$(this.el).append(html);
		
	}

});

var homeView = Backbone.View.extend({

	el: $("body"),

	events: {
		'click .take_quiz': 'takeQuiz',
	},

	takeQuiz: function(){
		var quiz = window.location.href="../HTML/quiz.html";
		vi
	},

	initialize: function(){
		 _.bindAll(this, 'render')

		 this.counter = 1;
		 this.render();
	},

	render: function(){
		var html = new EJS({url: '../JS/templates/home.ejs'}).render(Pie);
		$(this.el).append(html);
		
	}

});


var listView = new navView();
var listView = new homeView();





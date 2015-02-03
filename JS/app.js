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
		var html = new EJS({url: '../JS/templates/nav.ejs'}).render(Pie);
		$(this.el).append(html);
		
	}

});

var homeView = Backbone.View.extend({

	el: $("body"),

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

var quizView = Backbone.View.extend({

	el: $("body"),

	events:{
		"click.ans0":"answered1"
	},

	answered1: function(){
		var ans = $(".ans").attr("id");
		console.log(ans);
		$(".ans1").css("display","inline");
		$(".ans0").css("display","none")
	},

	initialize: function(){
		 _.bindAll(this, 'render')

		 this.counter = 1;
		 this.render();
	},

	render: function(){
		var html = new EJS({url: '../JS/templates/quiz.ejs'}).render(Pie);
		$(this.el).append(html);
		
		
	}

});

var listView = new navView();
var listView = new quizView();





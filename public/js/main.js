if(!window.wardrobeMe) var wardrobeMe = {};
wardrobeMe.views = wardrobeMe.views || {};
wardrobeMe.models = wardrobeMe.models || {};

var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "articles"             : "list",
        "articles/"             : "list",
        "articles/page/:page"    : "list",
        "articles/add"         : "addArticle",
        "articles/:id"         : "articleDetails",
        "about"             : "about",
        "roulette"          :"roulette"
    },

    initialize: function () {
        this.headerView = new wardrobeMe.views.Header({el: $('.header')});
        this.headerView.render();
        
        this.homeView = new wardrobeMe.views.Home({el: $('#content')});
        
        this.articleList = new wardrobeMe.ArticleCollection();
        this.articleListView = new wardrobeMe.views.ArticleList({model: this.articleList, el: $('#content')/*, page: p*/});
        
        this.article = new wardrobeMe.Article();
        this.articleView = new wardrobeMe.views.Article({model: this.article, autoRender: true, el: $("#content")});
                
        this.aboutView = new wardrobeMe.views.About({el: $('#content')});
        
        this.rouletteList = new wardrobeMe.ArticleCollection();
        this.rouletteView = new wardrobeMe.views.Roulette({model: this.rouletteList, el: $('#content')});
    },

    home: function (id) {            
        //$('#content').html(this.homeView.el);
        //this.homeView.render(); //is this already auto-rendering?
        this.headerView.selectMenuItem('menu-home');
    },

	list: function(page) {
//        var p = page ? parseInt(page, 10) : 1;
        var that = this;
            
        this.articleList.fetch({success: function(){
            that.articleListView.render();
        }});
        
        this.headerView.selectMenuItem('menu-list');
    },

    articleDetails: function (id) {            
        this.article.set({_id: id});
        
        this.article.fetch({success: function(){
            this.articleView.render();
        }});
        
        this.headerView.selectMenuItem('menu-detail');
    },

	addArticle: function() {
//        var article = new Article();
//        $('#content').html(new Article({model: article}).el);
        this.headerView.selectMenuItem('menu-add');
	},

    about: function () {            
        this.aboutView.render();
        
        this.headerView.selectMenuItem('menu-about');
    },
    
    roulette: function(){
        var that = this;        
        this.rouletteList.fetch({success: function(){
            that.rouletteView.render();
            if(that.rouletteView.onShow) that.rouletteView.onShow();
        }});
        
        this.headerView.selectMenuItem('menu-roulette');
    }

});

wardrobeMe.kickstart = _.after(_.size(wardrobeMe.views), _.once( function(){
    wardrobeMe.router = new AppRouter();
    Backbone.history.start();
    //console.log('kickstarted');
}));

//Load Templates
_.each(wardrobeMe.views, function(classDef, className, list){
    $.get('tpl/' + className + '.html', function(data) {
        classDef.prototype.template = _.template(data);
        //console.log('kickstart attempted');
        wardrobeMe.kickstart();
    }).fail(function() {
        //increment the load counter
        console.log('could not load '+className);
        wardrobeMe.kickstart();
    });
}); 
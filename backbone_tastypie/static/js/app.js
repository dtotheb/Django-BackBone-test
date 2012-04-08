(function(){
    window.Contact = Backbone.Model.extend({
        urlRoot: CONTACT_API
    });

    window.Contacts = Backbone.Collection.extend({
        urlRoot: CONTACT_API,
        model: Contact
    });

    window.ContactView = Backbone.View.extend({
        tagName: 'li',
        className: 'contact',

        initialize: function(){
            this.model.bind('change', this.render, this);
        },

        render: function(){
            $(this.el).html(ich.tweetTemplate(this.model.toJSON()));
            return this;
        }  
    });
});
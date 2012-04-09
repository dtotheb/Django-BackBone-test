(function(){
    window.Contact = Backbone.Model.extend({
        urlRoot: CONTACT_API,
        initialize: function(){
            
        }
    });

    window.Contacts = Backbone.Collection.extend({
        urlRoot: CONTACT_API,
        model: Contact,

        maybeFetch: function(options){
            // Helper function to fetch only if this collection has not been fetched before.
            if(this._fetched){
                // If this has already been fetched, call the success, if it exists
                options.success && options.success();
                return;
            }

            // when the original success function completes mark this collection as fetched
            var self = this,
                successWrapper = function(success){
                    return function(){
                        self._fetched = true;
                        success && success.apply(this, arguments);
                    };
                };
            options.success = successWrapper(options.success);
            this.fetch(options);
        },

        getOrFetch: function(id, options){
            // Helper function to use this collection as a cache for models on the server
            var model = this.get(id);

            if(model){
                options.success && options.success(model);
                return;
            }

            model = new Contact({
                resource_uri: id
            });

            model.fetch(options);
        }

    });

    window.ContactView = Backbone.View.extend({
        tagName: 'li',
        className: 'contact',

        events: {
            'click .permalink': 'navigate'
        },

        initialize: function(){
            this.model.bind('change', this.render, this);
            this.template = _.template($('#contact-template').html());
        },

        navigate: function(e){
            this.trigger('navigate', this.model);
            e.preventDefault();
        },

        render: function(){
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    window.ListView = Backbone.View.extend({
        initialize: function(){
            _.bindAll(this, 'render');
            
            console.log('ListView: ', this);
            console.log('Collection: ' , this.collection);
            this.render();
        },

        render: function(){
            var self = this;

            _(this.collection.models).each(function(item){
                var conView = new ContactView({
                    model: item
                });
                $(this.el).append(conView.render().el);
            }, this );

        }

    });

})(jQuery);
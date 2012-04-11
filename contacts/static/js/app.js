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
        tagName: 'tr',
        className: 'contact',

        events: {
            'click .permalink': 'navigate',
            'click .delete': 'clear',
            'click .edit': 'toggleEditMode',
            'click .canceledit': 'toggleEditMode',
            'click .save': 'saveChanges'
        },

        initialize: function(){
            this.model.bind('change', this.render, this);
            this.view_template = _.template($('#contact-template').html());
            this.edit_template = _.template($('#EditView-template').html());
            this.editmode = false;
            this.model.bind('destroy', this.remove, this);
        },

        toggleEditMode: function(){
            if (this.editmode == false) {
                this.editmode = true;
            }
            else{
                this.editmode = false;
            }
            this.render();

        },

        saveChanges: function(){
            var name = this.$('#name_edit').val();
            var email = this.$('#email_edit').val();


            this.model.set({
                name: name,
                email: email
            });
            this.model.save();
            this.editmode = false;
            this.render();
        },

        navigate: function(e){
            this.trigger('navigate', this.model);
            e.preventDefault();
        },

        render: function(){
            if (this.editmode == true ){
                $(this.el).html(this.edit_template(this.model.toJSON()));
            }
            else {
                $(this.el).html(this.view_template(this.model.toJSON()));
            }
            return this;
        },

        clear: function(){
            this.model.destroy();
        },

        remove: function(){
            $(this.el).remove();
        }
    });

    window.ListView = Backbone.View.extend({
        initialize: function(){
            _.bindAll(this, 'addOne', 'addAll');

            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll, this);
            this.views = [];
        },

        addAll: function(){
            this.views = [];
            this.collection.each(this.addOne);
        },

        addOne: function(contact){
            var view = new ContactView({
                model: contact
            });
            $(this.el).append(view.render().el);
            this.views.push(view);
            view.bind('all', this.rethrow, this);
        },

        rethrow: function(){
            this.trigger.apply(this, arguments);
        }
    });

    window.ListApp = Backbone.View.extend({
        el: "#app",

        rethrow: function(){
            this.trigger.apply(this, arguments);
        },

        render: function(){
            $(this.el).html($('#listApp-template').html());
            var list = new ListView({
                collection: this.collection,
                el: this.$('#contacts')
            });
            list.addAll();
            list.bind('all', this.rethrow, this);
            new InputView({
                collection: this.collection,
                el: this.$('#input')
            });
        } 

    });

    window.InputView = Backbone.View.extend({
    events: {
        'click .createcontact': 'createContact',
        'keypress #name_input': 'createOnEnter',
        'keypress #email_input': 'createOnEnter'
    },

    createOnEnter: function(e) {
        if((e.keyCode || e.which) == 13) {
            this.createContact();
        }

    },

    createContact: function(){
        console.log('createcontact');
        var name = this.$('#name_input').val();
        var email = this.$('#email_input').val();
        var userid = this.$('#userid_input').val();
        if(name){
            this.collection.create({
                    name: name,
                    email: email,
                    user: userid
            });
            this.$('#message').val('');
            this.$('#email').val('');
        }
    }

    });

})(jQuery);
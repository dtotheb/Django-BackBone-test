describe("Contact", function() {
    var contact;


    beforeEach(function() { 
        contact = new Contact({
            name: 'tester',
            email: 'test@test.com'
        });
    });

    it("should have the test name and email", function() {
        expect(contact.get('name')).toBe('tester');
        expect(contact.get('email')).toBe('test@test.com');
    });

    it("should validate the email address: test@test.com", function() {
        expect(contact.isValid()).toBe(true);
    });

    it("should not validate a bad email address: test@fail", function() {
        contact.set({email:'test@fail'});
        expect(contact.isValid()).toBe(false);
    });
});

describe("ContactView", function(){
    var view;
    var contact;

    beforeEach(function() {
        contact = new Contact({
            name: 'tester',
            email: 'test@test.com'
        });
        view = new ContactView({
            model: contact
        });
    });

    it("should have the model set", function() {
        expect(view.model.get('name'))
            .toBe('tester');
        expect(view.model.get('email'))
            .toBe('test@test.com');
    });

    describe("templates", function() {
        it("should have an edit_template set", function() {
            expect(view.edit_template).toBeDefined();
        });
        it("should have a view_template set", function(){
            expect(view.view_template).toBeDefined();
        });
    });

    describe("editmode", function() {
        it("should have an attribute editmode set to false initially", function() {
            expect(view.editmode).toBe(false);
        });
        it("should change editmode to true after calling toggleEditMode()", function() {
            view.toggleEditMode();
            expect(view.editmode).toBe(true);
        })
    })
});

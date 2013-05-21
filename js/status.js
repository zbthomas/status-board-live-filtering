/*
StatusBoardJS - with Live Filtering
Author: Carlos Rodriguez
2013
*/
Status = {
    container: null,
    jsonfile: null,
    init: function(opts) {
        App = Em.Application.create({});
        this.container = opts.container;
        this.jsonfile = opts.jsonfile;
        Status.textfield();
        Status.users();
    },
    textfield: function() {
        App.TFView = Em.TextField.extend({
            placeholder: 'Search',
            valueDidChange: function(sender, key, value, context, rev) {
                var val = this.get('value');
                var container = $(Status.container);
                Status.higlight(val);
            }.observes('value'),
        });
    },
    users: function() {
        App.listController = Ember.ArrayController.create();
        $.get(this.jsonfile, function(data) {
            App.listController.set('content', data);
        });
    },
    higlight: function(val) {
        val = val.toLowerCase();
        if (val && val.length >= 2) {
            var Results = function(found) {
                    if (!found) {
                        //console.log('not found');		
                    } else {
                        var result = $('#' + found);
                        $('.users').hide()
                        result.fadeIn('fast');
                        //result.css({background:'#FFC'})
                        //console.log('found');
                    }
                }
            App.listController.filter(function(item, index, self) {
                var _handle = item.handle.toLowerCase().indexOf(val);
                var _files = item.files.toString().toLowerCase().indexOf(val);
                var _description = item.description.toLowerCase().indexOf(val);
				
                if (_handle !== -1 || _files !== -1 || _description !== -1) {
                    found = item.handle;
                    Results(found);
                } else {
                    Results(null);
                }
            })
        } else {
            $('.users').show();
        }
    }
}
$(function(e) {
    Status.init({
        container: '.display',
        jsonfile: 'json/status.json'
    });
});
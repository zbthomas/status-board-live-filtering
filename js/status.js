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
                for (var x in item) {
                    if (item.hasOwnProperty(x)) {
                        temp = ~item[x].toString().toLowerCase().indexOf(val);
                        if (temp !== 0) {
                            found = item.handle;
                            console.log(temp);
                            Results(found);
                        }
                    }
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
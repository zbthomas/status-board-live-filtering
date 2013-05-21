/*
StatusBoardJS
Author: Carlos Rodriguez
2013
*/
Status = {
    box: null,
    init: function(opts) {
        App = Em.Application.create({});
        this.box = opts.box;
        
		Status.textfield();
        Status.users();
    },
    textfield: function() {
        App.TFView = Em.TextField.extend({
            placeholder: 'Search',
            valueDidChange: function(sender, key, value, context, rev) {
                var val = this.get('value');
                var box = $(Status.box);
                Status.higlight(val);
            }.observes('value'),
        });
        /*
		App.TFView.create({
            //controller: UserController
        }).appendTo('.search');
		*/
    },
  
    users: function() {
	    /*
		App.listController = Ember.ObjectController.extend({          
        });
		App.listController = Ember.ArrayController.extend({
		  sortProperties: ['handle']
		});
		*/
		App.listController = Ember.ArrayController.create();
		$.get('json/status.json', function(data) {
		  App.listController.set('content', data);
		});	
        
    },
    higlight: function(val) {
       
	   val = val.toLowerCase();
	   /*var fp = App.listController.findProperty('handle',val);if(fp){foundIt(fp.handle);}*/
	   if(val && val.length >= 2){
	  	   var Results = function(found){
	  	        if(!found){
	  			  //$('.users').show();
	  			  //console.log('not found');		
	  			}else{
	  			  $('.users').hide()
	  			  $('#'+found).fadeIn('fast');
	  			  //$('#'+found).css({background:'#FFC'})
	  			  //console.log('found');
	  			}
	  	   }
	  	   
	  	   App.listController.filter(function(item, index, self) {

			var _handle = item.handle.toLowerCase().indexOf(val);
			var _files = item.files.toString().toLowerCase().indexOf(val);
			var _description = item.description.toLowerCase().indexOf(val);

	  		if( _handle !== -1 || _files !== -1 || _description !== -1 ) {
				
				  found = item.handle;
	  		      Results(found);
			
	  		}else{
	  		  Results(null);
	  		}
	  		
	  	   })
	   }else{
		   $('.users').show() 
	   }
	 
    }
}
$(function(e) {
    Status.init({
        box: '.display',
        jsonfile: 'json/status.json'
    });
});


/*
				 var regval = new RegExp(val,"g");
				 result.html(function (i, html, val){
				    return html.replace(regval, '<strong>$1</strong>');
				 });
				 */	
					
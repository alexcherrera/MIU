/*
Alexander Herrera
Project 2
For the browser I used Google Chrome, Safari web inspector hardly worked
*/
var parseCInfoForm = function(data) {
    console.log(data);
    for(var i; data.length; i++) {
		var store = $.Storage.set(data.name[i],data.value[i]);
		console.log(store);
	
	};

};


$(document).ready(function(){
    //var todaysDate = $('#todaysDate');
    var collForm = $('#collegeForm');
    var schedErrorsLink = $('#schedErrorsLink');
      //  todaysDate.trigger('datebox');
        collForm.validate({
        invalidHandler: function(form, validator){
                schedErrorsLink.click();
        	var html = '';
        	for (var key in validator.submitted) {
        	       var label = $('label[for^="'+ key +'"]').not('[generated]');
        		var legend = label.closest('fieldset').find('.ui-controlgroup-label');
        		var fieldName = legend.length ? legend.text() : label.text();
        		html += '<li>'+ fieldName +'</li>';

        	};
        	$("#scheduleErrors ul").html(html);	
        	},
        	submitHandler: function(){
        		$('courseInfoForm').submit(function() {
                        console.log($(this).serializeArray());
                        return false;
                });
        		
        		
        	}

        });


});
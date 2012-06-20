/*
Alexander Herrera
Project 2
For the browser I used Google Chrome, Safari web inspector hardly worked
*/



$(document).ready(function(){
//Getting the elements by id:    
    function idTag (e) {
        var tagId = document.getElementById(e);
        return tagId;
    }
//Getting the elements by tag name:
    function tagName (n) {
        var nameOfTag = document.getElementsByTagName(n);
        return nameOfTag;
    }
//Create an Element:
    function makeTag (c) {
        var createNewTag = document.createElement(c);
        return createNewTag;
    }
//Variables:
    var departmentMajors = ["--Choose Major--", 
                        "Architecture", 
                        "Biology", 
                        "Mathematics", 
                        "Accounting",
                        "Economics", 
                        "Computer Engineering", 
                        "Electrical Engineering"];
        //Form Section:
        var collForm = $('#collegeForm');
        //Link Section:
        var schedErrorsLink = $('#schedErrorsLink');
        //Clickable events of submit:
        var linkOfClear = idTag("clear");
        var linkOfDisplay = idTag("display");
        var save = idTag('submit');
//Save the data that is being passed by the submitHandler:
        function parseData (data) {
                console.log(data);
        };
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
                submitHandler: function () {
                        var data = collegeForm.serializeArray();
                        parseData(data);
                }
        });

});

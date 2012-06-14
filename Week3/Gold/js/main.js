var parseCInfoForm = function(data) {
    console.log(data);
};

$(document).ready(function(){
    var cInfoForm = $('#courseInfoForm');
    cInfoForm.validate({
        invalidHandler: function (form, validator) {},
        submitHandler: function () {
            var data = cInfoForm.serializeArray();
            parseCInfoForm(data);
        }
    });
});
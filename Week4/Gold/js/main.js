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
        var optionValue = "";
        var checkValue = "";
        //Form Section:
        var collForm = $('#collegeForm');
        //Link Section:
        var schedErrorsLink = $('#schedErrorsLink');
        var reviewLink = $('reviewCInfo');
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
//Form:
        //This function creates all the majors using the array variable of departmentMajors and then putting in the additem.html.
                function createMajorList () {
                        var getForm = tagName("form");
                        var getDepartmentsId = idTag("departments");
                        //var createSelectTag = makeTag("Select");
                        getDepartmentsId.setAttribute("id", "selectDepart");
                        for (var i = 0, l = departmentMajors.length; i < l; i++) {
                            var createOptionTag = makeTag("option");
                            var optionInArray = departmentMajors[i];
                            createOptionTag.setAttribute("value", optionInArray);
                            createOptionTag.innerHTML = optionInArray; 
                            createSelectTag.appendChild(createOptionTag);
                        }
                        //getDepartmentsId.appendChild(createSelectTag);
                }
                //createMajorList();
        //Radio Selection function: 
                function getSelectionRadio () {
                        var buttonRadio = idTag("collegeForm").courseNumCredits;
                        for (var i = 0; i < buttonRadio.length; i++){
                            if (buttonRadio[i].checked){
                               optionValue = buttonRadio[i].value;         
                           }
                        }
                }
        //Checkbox Selection function:
                function getSelectionCheckBox () {
                        var boxCheckedId = idTag('bestMethodContact');
                        for (var c = 0; c < boxCheckedId.length; c++) {
                                if (boxCheckedId[c].checked) {
                                        checkValue = boxCheckedId[c].value;
                                } else {
                                        checkValue = "No";
                                }
                        }
                }
        //In what way to display the local storage.    
                function visibilityOfElement (v) {
                        switch (v) {
                            case 'on':
                                idTag('collegeForm').style.display = "none";
                                idTag('clear').style.display = "inline";
                                //idTag('display').style.display = "none";
                                idTag('add').style.display = "inline";
                                break;
                            case 'off':
                                idTag('collegeForm').style.display = "block";
                                idTag('clear').style.display = "inline";
                                idTag('display').style.display = "inline";
                                //idTag('add').style.display = "none";
                                idTag('items').style.display = "none";
                                break;
                            default:
                                return false;
                        }
                }
        //This function is being called within the getInfoToDisplay function to get the correct icon of the major that was chosen.
                function getMajorIcons (major, list) {
                        var iconList = makeTag('li');
                        list.appendChild(iconList);
                        var newIcon = makeTag('img');
                        newIcon.id = 'icon';
                        var IconAttribute = newIcon.setAttribute("src", "images/" + major + ".png");
                        iconList.appendChild(newIcon);
                }
        //The Function to how the information in local storage be dispayed.
                function getInfoToDisplay () {
                        displayCheck();
                        reviewLink.setAttribute("id", "items");
                        reviewLink.setAttribute("data-role", "content");
                        var createUl = makeTag('ul');
                        createUl.setAttribute("data-role", "listview");
                        createUl.setAttribute("data-inset", "true");
                        createUl.setAttribute("data-filter", "true");
                        reviewLink.appendChild(createUl);

                        //var createRoster = makeTag('ul');
                        //createDiv.appendChild(createRoster);
                        //document.body.appendChild(createDiv);
                        idTag('items').style.display = "block";//Just to make sure it does display.
                        for (var i = 0, w = localStorage.length; i < w; i++) {
                            var createFirstListTag = makeTag('li');
                            var createListLinks = makeTag('li');
                            createListLinks.appendChild(createFirstListTag);
                            var getKey = localStorage.key(i);
                            var keyValue = localStorage.getItem(getKey);
                            var localStorageObject = JSON.parse(keyValue);
                            var anotherUnorderListTag = makeTag('ul');
                            createFirstListTag.appendChild(anotherUnorderListTag);
                            getMajorIcons(localStorageObject.major[1], anotherUnorderListTag);
                            for (var s in localStorageObject) {
                                var createAnotherList = makeTag('li');
                                anotherUnorderListTag.appendChild(createAnotherList);
                                var listInfoText = localStorageObject[s][0]+ " " + localStorageObject[s][1];
                                createAnotherList.innerHTML = listInfoText;
                                anotherUnorderListTag.appendChild(createListLinks);
                            }
                            createEditLink(localStorage.key(i), createListLinks);//Calling the function that will only have the edit link for the user to make corrections in the local storage.
                            createDeleteLink(localStorage.key(i), createListLinks);//Calling the function that will only have the delete link.
                        }
                         var breakTag = makeTag('br');
                        breakTag.innerHTML = createDiv;
                }
        //Automatically fills in the form if empty as a default.
        //All the default information that is going to be display is coming from the json file.
                function autoDefaultInfo () {
                        for (var d in jsonObject) {
                                var defaultID = Math.floor(Math.random()*1010001921);
                                localStorage.setItem(defaultID, JSON.stringify(jsonObject[d]));
                        }
                        getInfoToDisplay();
                }
        //Safety check dor the display option.
                function displayCheck () {
                        visibilityOfElement("on");
                        if (localStorage.length === 0){
                                alert("No Assignments have been saved so default information was added.");
                                autoDefaultInfo();
                        } else {
                                getInfoToDisplay();
                        }
                }
        //To save all of the information in local storage.
                function saveInformation (key) {
                        //This function is in the case if theirs no key present.
                        //Meaning this will generate a new key. 
                        if (!key) {
                            var id                = Math.floor(Math.random()*1000292002);
                        } else { 
                            //If theirs a key this conditional takes place.
                            //By setting the key to the id it replaces the information.
                            //Reminder!! This is the same key that has been passed by the many functions. 
                            id = key;
                        }
                        //Nothing else changes, were still going todo the getSelectionRadio function and get the local storage. 
                        getSelectionRadio();
                        var info              = {};
                            info.major        = ["Major Choice:", idTag("selectMajor").value];
                            info.cName        = ["Course Name:", idTag("courseName").value];
                            info.cSection     = ["Course Section:", idTag('courseSection').value];
                            info.topicAndSec  = ["Topic and Section:", idTag('topicAndSection').value];
                            info.todaysDate   = ["Today's Date:", idTag('todaysDate').value];
                            info.dueDate      = ["Due Date:", idTag('dueDate').value];
                            info.option       = ["Turn In Option:", optionValue];
                            info.note         = ["Note Section:", idTag('noteSection').value];
                        localStorage.setItem(id, JSON.stringify(info));
                        alert("Assignment Saved!!");
                }


});     

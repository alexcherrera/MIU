/*
Alexander Herrera
Project 3
For the browser I used Google Chrome, Safari web inspector hardly worked
*/

//This is for the index.html forms
document.getElementById('courseInformation').addEventListener("DOMContentLoaded", function() { 
    console.log("working index");
//Getting the elements by id.
    function idTag (e) {
        var tagId = document.getElementById(e);
        return tagId;
    }
    //Getting the elements by tag name.
    function tagName (n) {
        var nameOfTag = document.getElementsByTagName(n);
        return nameOfTag;
    }
//Create an Element.
    function makeTag (c) {
        var createNewTag = document.createElement(c);
        return createNewTag;
    }
//Variables:  
    var departments = ["--Choose Major--", 
                        "Architecture", 
                        "Biology", 
                        "Mathematics", 
                        "Accounting",
                        "Economics", 
                        "Computer Engineering", 
                        "Electrical Engineering"];  
    var radioNumCreditsValue = "";
    var checkContMethod = "";
    var radioNumCredOpt = "";
    var getErrorMessId = idTag('errorMessCInfo');
    var clearCInfo = idTag("clearCInfo");
    var displayCInfo = idTag("displayCInfo");
    var save = idTag('submit');
    var reset = idTag('reset');
//To get the value of the Radio Selection.
    function creditsValue () {
        var radioChoice = idTag('courseInfoForm').courseNumCredits;
        for (var r = 0; radioChoice.length; r++) {
            if (radioChoice[r].checked) {
                radioNumCreditsValue = radioChoice[r].value;
            }
        }
    }
//To get the value of the Check selection field.
    function contactMethod () {
        if (idTag('sendEmail').checked) {
            checkContMethod = idTag('sendEmail').value;
        } else {
            checkContMethod = "No";
        }
    }    
//Save form:    
    function saveCInfoForm (key) {
        var id = Math.floor(Math.random()*10001910201);
        if (!key) {
            id;
        } else {
            id = key;
        }

        //Create an Object, which will get the information from the user 
        //input or from a dummy JSON file.
        creditsValue();
        contactMethod();
        var cInfo = {};
            cInfo.depart        = ["Department:", idTag('courseDepartSelect').value];
            cInfo.courseName    = ["Course Name:", idTag('courseName').value];
            cInfo.courseCredits = ["Number of Credits:", radioNumCreditsValue];
            cInfo.teachName     = ["Teacher Name:", idTag('teacherName').value];
            cInfo.teachEmailA   = ["Teacher Email Address:", idTag('teacherEmail').value];
            cInfo.teachPhoneN   = ["Teacher Phone Number:", idTag('teacherPhone').value];
            cInfo.bestMethod    = ["Best Method To Get in Contact:", checkContMethod];
            cInfo.firstDay      = ["First Day of Class:", idTag('firstDay').value];
            cInfo.lastDay       = ["Last Day of Class:", idTag('lastDay').value];
            localStorage.setItem(id, JSON.stringify(cInfo));
            alert("Course Information Saved!!");
        
    }
//This function creates all the majors using the array variable of departments and then putting in the additem.html.
    function createDepartList () {
        var getCInfoForm = idTag("courseInfoForm");
        var getDepartmentsId = idTag("courseDepartSelect");
        var createSelectTag = makeTag("Select");
        createSelectTag.setAttribute("id", "selectDepart");
        for (var i = 0, l = departments.length; i < l; i++) {
            var createOptionTag = makeTag("option");
            var optionInArray = departments[i];
            createOptionTag.setAttribute("value", optionInArray);
            createOptionTag.innerHTML = optionInArray; 
            createSelectTag.appendChild(createOptionTag);
        }
        getDepartmentsId.appendChild(createSelectTag);
    }
   createDepartList();    
//Now to be able to display the form fields.
    function visibilityOfElements (v) {
        switch (v) {
            case "on":
                idTag('courseInfoForm').style.display = "none";
                idTag('clearCInfo').style.display = "inline";
                idTag('displayCInfo').style.display = "none";
                idTag('addCInfo').style.display = "inline";
                break;
            case "off":
                idTag('courseInfoForm').style.display = "block";
                idTag('clearCInfo').style.display = "inline";
                idTag('displayCInfo').style.display = "inline";
                idTag('addCInfo').style.display = "none";
                idTag('itemsCInfo').style.display = "none";
        }
    }
//Delete the information from the local Storage    
    function eraseInformation () {
        if (localStorage.length === 0){
            alert("You haven't stored any Course Information!");
        } else {
            localStorage.clear();//Delete everything in the localStorage
            alert("All of your Course Information have been deleted");
            window.location.reload();
            return false;//Stopping the link to go anywhere when reloaded
        }
    }
//Automatically fills in the form if empty as a default.
//All the default information that is going to be display is coming from the json file.
    function autoDefaultInfo () {
        for (var d in jsonObjectCInfo) {
            var defaultID = Math.floor(Math.random()*1010001921);
            localStorage.setItem(defaultID, JSON.stringify(jsonObjectCInfo[d]));
        }
    }
//Safety check.
    function displayCheck () {
        if (localStorage.length === 0){
            alert("No Course Information have been saved!");
        }
    }  
//To validate the form to check for errors.
    function validateField (evt) {
        //Get the elements to be validated.
        var emptyField = "";
        var getDepart = idTag('selectMajor');
        var getCourseName = idTag('courseName');
        var getCourseCredits = idTag('courseSection');
        var getTeachName  = idTag('topicAndSection');
        var getTeachEmailA = idTag('todaysDate');
        var getTeachPhoneN = idTag('dueDate');
        var getBestMethod = idTag('noteSection'); 
        var getFirstDay = idTag('firstDay');
        var getLastDay = idTag('lastDay');
        //To Reset the messages with errors when corrected. 
        getErrorMessId.innerHTML = "";
        getDepart.style.border = "1px solid black";
        getCourseName.style.border = "1px solid black";
        getCourseCredits.style.border = "1px solid black";
        getTeachName.style.border = "1px solid black";
        getTeachEmailA.style.border = "1px solid black";
        getTeachPhoneN.style.border = "1px solid black";
        getBestMethod.style.border = "1px solid black";
        getFirstDay.style.border = "1px solid black";
        getLastDay.style.border = "1px solid black";
        //User to get error messages when field is not inputed correctly.
        var errorMessArray = [];
        //Major validation
        if (getDepart.value === "--Choose Major--") {
            var departErrorMess = "Please Choose a Major";
            getDepart.style.border = "1px solid red";
            errorMessArray.push(departErrorMess);
        }
        //Course Name validation
        if (getCourseName.value === "") {
                var courseNameErrorMess = "Please Enter the Course Name";
                getCourseName.style.border = "1px solid red";
                errorMessArray.push(courseNameErrorMess);
        }
        //Course Credits validation
        if (getCourseCredits.value === "") {
            var courseCreditsErrorMess = "Please Enter the Course Section";
            getCourseCredits.style.border = "1px solid red";
            errorMessArray.push(courseCreditsErrorMess);
        }
        //Teacher Name validation
        if (getTeachName.value === "") {
            var teachNameErrorMess = "Please Enter the Topic And Section";
            getTeachName.style.border = "1px solid red";
            errorMessArray.push(teachNameErrorMess); 
        }
        //Teacher Email Address validation
        if (getTeachEmailA.value === "") {
            var teachEmailAErrorMess = "Please Enter Today's Date";
            getTeachEmailA.style.border = "1px solid red";
            errorMessArray.push(teachEmailAErrorMess);
        }
        //Teacher Phone Number validation
        if (getTeachPhoneN.value === "") {
            var teachPhoneNErrorMess = "Please Enter the Due Date";
            getTeachPhoneN.style.border = "1px solid red";
            errorMessArray.push(teachPhoneNErrorMess); 
        }
        //Best Method validation
        if (getBestMethod.value === "") {
            var bestMethodErrorMess = "Please Enter a Note";
            getBestMethod.style.border = "1px solid red";
            errorMessArray.push(bestMethodErrorMess);
        }
        //First Day validation
        if (getFirstDay.value === "") {
            var firstDayErrorMess = "Please Enter a Note";
            getFirstDay.style.border = "1px solid red";
            errorMessArray.push(firstDayErrorMess);
        }
        //Last Day validation
        if (getLastDay.value === "") {
            var getLastDayErrorMess = "Please Enter a Note";
            getLastDay.style.border = "1px solid red";
            errorMessArray.push(getLastDayErrorMess);
        }
        //When an error has occured, each will be displayed on the screen.
        if (errorMessArray.length >= 1) {
            for (var i = 0, l = errorMessArray.length; i < l; i++) {
                var errorTextList = makeTag('li');
                errorTextList.innerHTML = errorMessArray[i];
                getErrorMessId.appendChild(errorTextList);
            }
            //The preventDefault allows the error messages to display with the style features. 
            evt.preventDefault();
        } else {
            //When their is no error's this function will run.
            //Going to send the key value. This key has been passed through functions.
            //Key was creating in the getInfoToDisplay function.
            saveCInfoForm(this.key);
        }
    }
//The event listener function to allow the user edit the form.
    function editCourse (s) {
        var valueToEdit = localStorage.getItem(this.key);
        var info = JSON.parse(valueToEdit);
        visibilityOfElements("off");//Display the form.
        idTag('selectDepart').value = cInfo.depart[1];
        idTag('courseName').value = cInfo.courseName[1];
        radioNumCredOpt = idTag("courseInfoForm").courseNumCredits;
        for (var i = 0; i < radioNumCredOpt.length; i++) {
            if (radioNumCredOpt[i].value == "courseNumCredits1" && cInfo.courseCredits[1] == "courseNumCredits1") {
                radioNumCredOpt[i].setAttribute("checked", "checked");
            } else if (radioNumCredOpt[i].value == "courseNumCredits2" && cInfo.courseCredits[1] == "courseNumCredits2") {
                radioNumCredOpt[i].setAttribute("checked", "checked");
            } else if (radioNumCredOpt[i].value == "courseNumCredits3" && cInfo.courseCredits[1] == "courseNumCredits3") {
                radioNumCredOpt[i].setAttribute("checked", "checked");
            } else if (radioNumCredOpt[i].value == "courseNumCredits4" && cInfo.courseCredits[1] == "courseNumCredits4") {
                radioNumCredOpt[i].setAttribute("checked", "checked");
            }
        }
        idTag('teacherName').value = cInfo.teachName[1];
        idTag('teacherEmail').value = cInfo.teachEmailA[1];
        idTag('teacherPhone').value = cInfo.teachPhoneN[1];
        var checkOptBestMethod = idTag("courseInfoForm").bestMethodContact;
        for (var c = 0; c < checkOptBestMethod.length; c++) {
            if (checkOptBestMethod[c].value == "sendEmail" && cInfo.bestMethod[1] == "sendEmail") {
                checkOptBestMethod[c].setAttribute("checked", "checked");
            } else if (checkOptBestMethod[c].value == "phone" && cInfo.bestMethod[1] == "phone") {
                checkOptBestMethod[c].setAttribute("checked", "checked");
            } else if (checkOptBestMethod[c].value == "Office-Hours" && cInfo.bestMethod[1] == "Office-Hours") {
                checkOptBestMethod[c].setAttribute("checked", "checked");
            }
        }
        idTag('firstDay').value = cInfo.firstDay [1];
        idTag('lastDay').value = cInfo.lastDay [1];
        //Going to remove the event listener that is in the save variable.
        save.removeEventListener("click", saveCInfoForm);
        //Change the button of submit to Edit Schedule.
        idTag('submit').value = "Edit Course";
        var editCourseButton = idTag("submit");
        editCourseButton.addEventListener("click", validateField);
        //Get the key from local storage
        editCourseButton.key = this.key;
    }  
//Create Edit Link to change information that is in the local storage.
    function createEditLink (key, eLink) {
        var linkEdit = makeTag('a');
        linkEdit.href = '#';
        linkEdit.id = 'editC';
        linkEdit.key = key;
        var textEdit = "Edit Course";
        linkEdit.addEventListener("click", editCourse);
        linkEdit.innerHTML = textEdit;
        eLink.appendChild(linkEdit);
    }
//Create Delete Link to erase items in the local storage.
    function createDeleteLink(key, dLink) {
        var linkDelete = makeTag('a');
        linkDelete.href = '#';
        linkDelete.id = 'deleteC';
        linkDelete.key = key;
        var textDelete = "Delete Course";
        linkDelete.addEventListener("click", deleteCourse);
        linkDelete.innerHTML = textDelete;
        dLink.appendChild(linkDelete);
    }
//The event listener function for the user to delete.
    function deleteCourse () {
        var askToDelete = confirm("Please confirm if you want to delete this Course?");
        if (askToDelete) {
            localStorage.removeItem(this.key);
            alert("Course was deleted");
            window.location.reload();
        } else {
            alert("The Course was not deleted");
        }
    }  
//To get the information to display from localstorage.
    function displayCInfo () {
        visibilityOfElements("on");
        displayCheck();
        var createDiv = makeTag('div');
        createDiv.setAttribute("id", "itemsCInfo");
        var createRoster = makeTag('ul');
        createDiv.appendChild(createRoster);
        idTag('itemsCInfoContainer').appendChild(createDiv);
        idTag('itemsCInfo').style.display = "block";//Just to make sure it does display
        for (var i = 0, w = localStorage.length; i < w; i++) {
            var createFirstListTag = makeTag('li');
            createRoster.appendChild(createFirstListTag);
            var getKey = localStorage.key(i);
            var keyValue = localStorage.getItem(getKey);
            var localStorageObject = JSON.parse(keyValue);
            var anotherUnorderListTag = makeTag('ul');
            createFirstListTag.appendChild(anotherUnorderListTag);
            for (var s in localStorageObject) {
                var createAnotherList = makeTag('li');
                anotherUnorderListTag.appendChild(createAnotherList);
                var listInfoText = localStorageObject[s][0]+ " " + localStorageObject[s][1];
                createAnotherList.innerHTML = listInfoText;
            }
            createEditLink(localStorage.key(i), createListLinks);//Calling the function that will only have the edit link for the user to make corrections in the local storage.
            createDeleteLink(localStorage.key(i), createListLinks);//Calling the function that will only have the delete link.
        }
         var breakTag = makeTag('br');
        breakTag.innerHTML = createDiv;
    }
//For the user to reset the form.
    function formReset () {
        window.location.clear();
        window.location.reload();
    }
    
save.addEventListener("click", validateField);
reset.addEventListener("click", formReset);
displayCInfo.addEventListener("click", displayCInfo);
clearCInfo.addEventListener("click", eraseInformation);


});
//This is for the additem.html form
window.addEventListener("DOMContentLoaded", function () {
    console.log("working");
//Getting the elements by id.
    function idTag (e) {
        var tagId = document.getElementById(e);
        return tagId;
    }
//Getting the elements by tag name.
    function tagName (n) {
        var nameOfTag = document.getElementsByTagName(n);
        return nameOfTag;
    }
//Create an Element.
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
    var getErrorMessId = idTag('errorMessages');
    var linkOfClear = idTag("clear");
    var linkOfDisplay = idTag("display");
    var save = idTag('submit');
//Radio Selection function. 
    function getSelectionRadio () {
        var buttonRadio = idTag("collegeForm").turnin;
        for (var i = 0; i < buttonRadio.length; i++){
            if (buttonRadio[i].checked){
               optionValue = buttonRadio[i].value;         
           }
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
//This function creates all the majors using the array variable of departmentMajors and then putting in the additem.html.
    function createMajorList () {
        var getForm = tagName("form");
        var getDepartmentsId = idTag("departments");
        var createSelectTag = makeTag("Select");
        createSelectTag.setAttribute("id", "selectMajor");
        for (var i = 0, l = departmentMajors.length; i < l; i++) {
            var createOptionTag = makeTag("option");
            var optionInArray = departmentMajors[i];
            createOptionTag.setAttribute("value", optionInArray);
            createOptionTag.innerHTML = optionInArray; 
            createSelectTag.appendChild(createOptionTag);
        }
        getDepartmentsId.appendChild(createSelectTag);
    }
   createMajorList();
//In what way to display the local storage.    
    function visibilityOfElement (v) {
        switch (v) {
            case 'on':
                idTag('collegeForm').style.display = "none";
                idTag('clear').style.display = "inline";
                idTag('display').style.display = "none";
                idTag('add').style.display = "inline";
                break;
            case 'off':
                idTag('collegeForm').style.display = "block";
                idTag('clear').style.display = "inline";
                idTag('display').style.display = "inline";
                idTag('add').style.display = "none";
                idTag('items').style.display = "none";
                break;
            default:
                return false;
        }
    }
//Delete the information from the local Storage.   
    function eraseInformation () {
        if (localStorage.length === 0){
            alert("You haven't stored any Assignment Information to erase.");
        } else {
            localStorage.clear();//Delete everything in the localStorage.
            alert("All of your Assignment Information have been deleted.");
            window.location.reload();
            return false;//Stopping the link to go anywhere when reloaded.
        }
    }
//Automatically fills in the form if empty as a default.
//All the default information that is going to be display is coming from the json file.
    function autoDefaultInfo () {
        for (var d in jsonObject) {
            var defaultID = Math.floor(Math.random()*1010001921);
            localStorage.setItem(defaultID, JSON.stringify(jsonObject[d]));
        }

    }
//Safety check dor the display option.
    function displayCheck () {
        if (localStorage.length === 0){
            alert("No Assignments have been saved so default information was added.");
            autoDefaultInfo();
        }
    }
//The event listener function to validate the fields and not saving the edited items.
    function validateField (evt) {
        //Get the elements to be validated.
        var emptyField = "";
        var getMajor = idTag('selectMajor');
        var getCName = idTag('courseName');
        var getCSection = idTag('courseSection');
        var getTopicAndSec = idTag('topicAndSection');
        var getTodaysDate = idTag('todaysDate');
        var getDueDate = idTag('dueDate');
        var getNote = idTag('noteSection'); 
        //To Reset the messages with errors when corrected. 
        getErrorMessId.innerHTML = "";
        getMajor.style.border = "1px solid black";
        getCName.style.border = "1px solid black";
        getCSection.style.border = "1px solid black";
        getTopicAndSec.style.border = "1px solid black";
        getTodaysDate.style.border = "1px solid black";
        getDueDate.style.border = "1px solid black";
        getNote.style.border = "1px solid black";
        //User to get error messages when field is not inputed correctly.
        var errorMessArray = [];
        //Major validation
        if (getMajor.value === "--Choose Major--") {
            var majorErrorMess = "Please Choose a Major";
            getMajor.style.border = "1px solid red";
            errorMessArray.push(majorErrorMess);
        }
        //Course Name validation
        if (getCName.value === "") {
                var cNameErrorMess = "Please Enter the Course Name";
                getCName.style.border = "1px solid red";
                errorMessArray.push(cNameErrorMess);
        }
        //Course Section validation
        if (getCSection.value === "") {
            var cSectionErrorMess = "Please Enter the Course Section";
            getCSection.style.border = "1px solid red";
            errorMessArray.push(cSectionErrorMess);
        }
        //Topic And Section validation
        if (getTopicAndSec.value === "") {
            var topicAndSecErrorMess = "Please Enter the Topic And Section";
            getTopicAndSec.style.border = "1px solid red";
            errorMessArray.push(topicAndSecErrorMess); 
        }
        //Today's Date validation
        if (getTodaysDate.value === "") {
            var todaysDtErrorMess = "Please Enter Today's Date";
            getTodaysDate.style.border = "1px solid red";
            errorMessArray.push(todaysDtErrorMess);
        }
        //Due Date validation
        if (getDueDate.value === "") {
            var dueDtErrorMess = "Please Enter the Due Date";
            getDueDate.style.border = "1px solid red";
            errorMessArray.push(dueDtErrorMess); 
        }
        //Note Section validation
        if (getNote.value === "") {
            var noteErrorMess = "Please Enter a Note";
                getNote.style.border = "1px solid red";
                errorMessArray.push(noteErrorMess);
        }
        //When an error has occured, each will be displayed on the screen.
        if (errorMessArray.length >= 1) {
            for (var i = 0, l = errorMessArray.length; i < l; i++) {
                var errorTextList = makeTag('li');
                errorTextList.innerHTML = errorMessArray[i];
                getErrorMessId.appendChild(errorTextList);
            }
            //The preventDefault allows the error messages to display with the style features. 
            evt.preventDefault();
        } else {
            //When their is no error's this function will run.
            //Going to send the key value. This key has been passed through functions.
            //Key was creating in the getInfoToDisplay function.
            saveInformation(this.key);
        }
    }
//The event listener function to allow the user edit the form.
    function editSchedule (s) {
        var valueToEdit = localStorage.getItem(this.key);
        var info = JSON.parse(valueToEdit);
        visibilityOfElement("off");//Display the form.
        idTag('selectMajor').value = info.major[1];
        idTag('courseName').value = info.cName[1];
        idTag('courseSection').value = info.cSection[1];
        idTag('topicAndSection').value = info.topicAndSec[1];
        idTag('todaysDate').value = info.todaysDate[1];
        idTag('dueDate').value = info.dueDate[1];
        var radioOption = idTag("collegeForm").turnin;
        for (var i = 0; i < radioOption.length; i++) {
            if (radioOption[i].value == "Email" && info.option[1] == "Email") {
                radioOption[i].setAttribute("checked", "checked");
            } else if (radioOption[i].value == "Person" && info.option[1] == "Person"){
                radioOption[i].setAttribute("checked", "checked");
            }
        }
        idTag('noteSection').value = info.note[1];
        //Going to remove the event listener that is in the save variable.
        save.removeEventListener("click", saveInformation);
        //Change the button of submit to Edit Schedule.
        idTag('submit').value = "Edit Schedule";
        var editScheduleButton = idTag("submit");
        editScheduleButton.addEventListener("click", validateField);
        //Get the key from local storage
        editScheduleButton.key = this.key;
    }
//Create Edit Link to change information that is in the local storage.
    function createEditLink (key, eLink) {
        var linkEdit = makeTag('a');
        linkEdit.href = '#';
        linkEdit.id = 'editS';
        linkEdit.key = key;
        var textEdit = "Edit Schedule";
        linkEdit.addEventListener("click", editSchedule);
        linkEdit.innerHTML = textEdit;
        eLink.appendChild(linkEdit);
    }
//Create Delete Link to erase items in the local storage.
 function createDeleteLink(key, dLink) {
        var linkDelete = makeTag('a');
        linkDelete.href = '#';
        linkDelete.id = 'deleteS';
        linkDelete.key = key;
        var textDelete = "Delete Schedule";
        linkDelete.addEventListener("click", deleteSchedule);
        linkDelete.innerHTML = textDelete;
        dLink.appendChild(linkDelete);
    }
//The event listener function for the user to delete.
    function deleteSchedule () {
        var askToDelete = confirm("Please confirm if you want to delete this Schedule?");
        if (askToDelete) {
            localStorage.removeItem(this.key);
            alert("Schedule was deleted");
            window.location.reload();
        } else {
            alert("The Schedule was not deleted");
        }
    }
//The Function to how the information in local storage be dispayed.
    function getInfoToDisplay () {
        visibilityOfElement("on");
        displayCheck();
        var createDiv = makeTag('div');
        createDiv.setAttribute("id", "items");
        var createRoster = makeTag('ul');
        createDiv.appendChild(createRoster);
        document.body.appendChild(createDiv);
        idTag('items').style.display = "block";//Just to make sure it does display.
        for (var i = 0, w = localStorage.length; i < w; i++) {
            var createFirstListTag = makeTag('li');
            var createListLinks = makeTag('li');
            createRoster.appendChild(createFirstListTag);
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
//This function is being called within the getInfoToDisplay function to get the correct icon of the major that was chosen.
    function getMajorIcons (major, list) {
        var iconList = makeTag('li');
        list.appendChild(iconList);
        var newIcon = makeTag('img');
        newIcon.id = 'icon';
        var IconAttribute = newIcon.setAttribute("src", "images/" + major + ".png");
        iconList.appendChild(newIcon);

    }
//Main Event Listeners
    linkOfClear.addEventListener("click", eraseInformation);
    linkOfDisplay.addEventListener("click", getInfoToDisplay);
    save.addEventListener("click", validateField);//Change to validate to check the user input correctly before saving to local storage.
});
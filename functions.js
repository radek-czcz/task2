
var isPeselValid = false;

// warning html element
var elem = document.querySelector("[class^='validationMessage']");

// shows pesel input warning
function showMessage(){
   elem.classList.remove('validationMessageHidden');
   elem.classList.add('validationMessageShown');
}

// hides pesel input warning
function hideMessage(){
   elem.classList.remove('validationMessageShown');
   elem.classList.add('validationMessageHidden');
}

// handler for inputed pesel
function inputChanged(srcElem){

   // is length of pesel and all chars digits?
   if (srcElem.validity.valid){

      hideMessage()

      //generate date to pass to date-of-birth field
      var date = generateDateOfBirth();

      var dateField = document.querySelector("input[type='date']")

      // pass generated date to date-of-birth field
      dateField.value = date;

      //important1: ifcheck in the next line is also a vaalidator for date generated in method generateDateOfBirth()
      if (!dateField.value) {
         elem.textContent = '!! given 6 first digits are invalid!!';
         isPeselValid = false;
         showMessage();
      } else {isPeselValid = true}

   } else {
      elem.textContent = '!!! input should consist of 11 digits only. No letters allowed';
      isPeselValid = false;
      var dateField = document.querySelector("input[type='date']")
      dateField.value = '';
      showMessage();
   }
   }

   // generates date in format yy-mm-dd. Can produce wrong date - for instance 1997-11-31 (only 30 days long November). Wrong date is validated in line annotated "important1"
   function generateDateOfBirth() {

      var dobUnformated;
      var date;
      var year;
      var month;
      var day;

      dobUnformated = document.getElementById('peselNum').value.slice(0,6);
      month = dobUnformated.slice(2,4);

      if (month > 20) {
         month = month - 20;
         year = 2000 + parseInt(dobUnformated.slice(0,2));
      } else if (month < 13) {
         year = 1900 + parseInt(dobUnformated.slice(0,2));
      }
      day = parseInt(dobUnformated.slice(4,6));

      //date = new Date(year, month - 1, day);
      date = [];
      date[0] = year;
      date[1] = (month + '').padStart(2,'0');
      date[2] = dobUnformated.slice(4,6)

      //var dateCheck = Date.parse(date.join('/'));

      date = date.join("-")
      //console.log(date);
      return date;
   }

   // hadler for submit button
   function submitClicked(){
      var message = '';

      for (iterVar of document.querySelectorAll('input.needed')) {
         if (!iterVar.value) {
            message = "Please fill all fields. ";
            break;
         }
         }

      switch (true) {
         case message:
         case !isPeselValid:
            message = message + "Please correct entered pesel.";
         case message.length > 0 || !isPeselValid:
            window.alert(message);
            break;
         default:
            // TODO it should also be checked if date-of-birth hasn't been changed after correct pesel entry or date-of-birth field should be faded out.
            window.alert("Submission successfull.");
      }
   }

// Solution1: works, but delay in front end to recive success message as needs to wait until row is appended by app script
function doPost(e) {
    try {
      var sheet = SpreadsheetApp.openById("1PwC2zrHNcfR5itYFo_6Lqrjos4wLjUMI3y-Xs_UUyqs").getActiveSheet();
      
      var data = e.parameter; 
      
      sheet.appendRow([new Date(), data.firstName, data.lastName, data.email, data.message]);
  
      return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  //Solution 2: no delay @ front end, send success message immediately and append row later.
  //Appending row takes time
  // function doPost(e) {
  //   try {
  //     // Send an immediate response first
  //     var response = ContentService.createTextOutput(JSON.stringify({ status: "success" }))
  //       .setMimeType(ContentService.MimeType.JSON);
  
  //     // Process the data asynchronously using a trigger
  //     ScriptApp.newTrigger("appendDataToSheet")
  //       .timeBased()
  //       .after(1) // Run the function after a short delay (1ms)
  //       .create();
  
  //     // Store the data in script properties for later processing
  //     PropertiesService.getScriptProperties().setProperty("lastData", JSON.stringify(e.parameter));
  
  //     return response; // Immediate response
  //   } catch (error) {
  //     return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
  //       .setMimeType(ContentService.MimeType.JSON);
  //   }
  // }
  
  // // Function to append data asynchronously
  // function appendDataToSheet() {
  //   var sheet = SpreadsheetApp.openById("1PwC2zrHNcfR5itYFo_6Lqrjos4wLjUMI3y-Xs_UUyqs").getActiveSheet();
  //   var storedData = PropertiesService.getScriptProperties().getProperty("lastData");
  
  //   if (storedData) {
  //     var data = JSON.parse(storedData);
  //     sheet.appendRow([new Date(), data.firstName, data.lastName, data.email, data.message]);
  
  //     // Clear stored data
  //     PropertiesService.getScriptProperties().deleteProperty("lastData");
  //   }
  // }
    
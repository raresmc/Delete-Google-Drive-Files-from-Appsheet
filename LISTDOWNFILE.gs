function listFiles() {
  // Spreadsheet and Folder IDs
  const spreadsheetId = 'YOUR SPREADSHEET ID'; // Your Spreadsheet ID
  const folderId = 'G DRIVE ID HERE'; // Your Folder ID
  const sheetName = 'SHEET NAME'; // Define your sheet name here

  // Open the spreadsheet by ID
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  // Get the sheet by name
  const sheet = spreadsheet.getSheetByName(sheetName);

  // Check if the sheet exists
  if (sheet) {
    // Access the folder in Google Drive
    const folder = DriveApp.getFolderById(folderId);
    const files = folder.getFiles();

    // Clear existing content in the sheet and set headers
    sheet.clear();
    sheet.appendRow(['File Name', 'File ID', 'Delete?']);

    // Loop through files in the folder and append their details to the sheet
    while (files.hasNext()) {
      let file = files.next();
      sheet.appendRow([file.getName(), file.getId(), '']);
    }
  } else {
    const ui = SpreadsheetApp.getUi();
    ui.alert('Sheet not found. Please check the sheet name in the script.');
  }
}

function checkAndDeleteFiles() {
  const spreadsheetId = 'YOUR SPREADSHEET ID'; // Your Spreadsheet ID
  const sheetName = 'SHEET NAME'; // Define your sheet name here
  const deleteFlag = 'DELETE'; // The keyword to look for
  const deleteColumn = 3; // Assuming the 'Delete?' column is the 3rd column

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();

  // Iterate backwards through the data to avoid index issues after deleting rows
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i][deleteColumn - 1] === deleteFlag) {
      const fileId = data[i][1]; // Assuming the File ID is in the 2nd column

      // Deleting the file from Google Drive
      DriveApp.getFileById(fileId).setTrashed(true);

      // Delete the entire row from the sheet
      sheet.deleteRow(i + 1); // +1 because array is 0-indexed but sheets are 1-indexed
    }
  }
}

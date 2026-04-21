function doGet() {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('پنل کاربری مهاجرتی')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function checkUserField(fieldName, value, previousData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const userSheet = ss.getSheetByName("user-pass");
  const data = userSheet.getDataRange().getValues();
  
  // ردیف اول هدر است، از ردیف دوم شروع می‌کنیم
  for (let i = 1; i < data.length; i++) {
    let match = false;
    if (fieldName === 'userName' && data[i][0] == value) match = true;
    if (fieldName === 'email' && data[i][0] == previousData.userName && data[i][1] == value) match = true;
    if (fieldName === 'password' && data[i][1] == previousData.email && data[i][2] == value) match = true;
    if (fieldName === 'caseNumber' && data[i][2] == previousData.password && data[i][3] == value) match = true;
    
    if (match) return { success: true };
  }
  return { success: false };
}
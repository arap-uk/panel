function doGet(e) {
  const p = e.parameter;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("user-pass");
  const data = sheet.getDataRange().getValues();
  
  let response = { success: false, errors: [] };

  for (let i = 1; i < data.length; i++) {
    // بررسی تطابق نام کاربری (ستون A)
    if (data[i][0] == p.user) {
      // اگر نام کاربری درست بود، بقیه موارد را چک کن
      if (data[i][1] == p.email && data[i][2] == p.pass && data[i][3] == p.case) {
        response.success = true;
        return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
      } else {
        // تشخیص اینکه کدام فیلد اشتباه است
        if (data[i][1] != p.email) response.errors.push('email');
        if (data[i][2] != p.pass) response.errors.push('password');
        if (data[i][3] != p.case) response.errors.push('caseNumber');
      }
    }
  }
  
  // اگر کلاً یوزرنیم پیدا نشد
  if (response.errors.length === 0) response.errors.push('userName');

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

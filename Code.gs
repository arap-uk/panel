function doGet(e) {
  const p = e.parameter;
  
  // آدرس شیت‌ها - آی‌دی‌های خود را اینجا قرار دهید
  const DB_SHEET_ID = "AKfycbyjvuEm6Trv1SokGDrPUQK9dPJoDnzlTVvORxTYB9mgnomGcxdJgLadFSwGaz6EoDesoA"; 
  const USER_SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId(); // شیت لاگین جاری

  // ۱. بخش لاگین (بررسی شیت User-Pass)
  if (!p.action) {
    const ss = SpreadsheetApp.openById(USER_SHEET_ID);
    const sheet = ss.getSheetByName("user-pass");
    const data = sheet.getDataRange().getValues();
    let response = { success: false, errors: [] };

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == p.user) {
        if (data[i][1] == p.email && data[i][2] == p.pass && data[i][3] == p.case) {
          response.success = true;
          return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
        } else {
          if (data[i][1] != p.email) response.errors.push('email');
          if (data[i][2] != p.pass) response.errors.push('password');
          if (data[i][3] != p.case) response.errors.push('caseNumber');
          return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }
    response.errors.push('userName');
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  }

  // ۲. بخش پنل (استخراج دیتا از شیت دیتابیس اصلی بر اساس شماره کیس)
  if (p.action === "getPanelData") {
    const ssDB = SpreadsheetApp.openById(DB_SHEET_ID);
    const dataSheet = ssDB.getSheetByName("Data");
    const docSheet = ssDB.getSheetByName("Docpic");
    const caseNum = p.caseNumber;

    const dataRows = dataSheet.getDataRange().getValues();
    const docRows = docSheet.getDataRange().getValues();
    
    let result = { success: false };

    for (let i = 1; i < dataRows.length; i++) {
      if (dataRows[i][20] == caseNum) { // ستون U (ایندکس 20)
        result.success = true;
        result.personal = dataRows[i];
        result.docs = docRows[i];
        break;
      }
    }
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  }
}

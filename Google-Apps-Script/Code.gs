/**
 * Vignesh Universe - Google Apps Script Backend
 * Unique Visitor Counter
 */

// ========== CONFIG ==========
var FOUNDER_EMAIL = 'founder.vigneshuniverse@gmail.com';
var SHEET_NAME_CONTACTS = 'Contacts';
var SHEET_NAME_CATEGORIES = 'Categories';
var SHEET_NAME_PRODUCTS = 'Products';
var SHEET_NAME_VISITORS = 'VisitorStats';
var DRIVE_FOLDER_NAME = 'VigneshUniverse-Products';
var TIMEZONE = 'Asia/Kolkata';

var BUSINESS_EMAILS = {
  'Vignesh Digital Hub': 'vigneshdigitalhub1@gmail.com',
  'Vignesh Digital Electronics Service': 'vigneshdigitalservice1@gmail.com',
  'Vignesh Pixel Works': 'vigneshpixelworks1@gmail.com',
  'Vignesh Digital Marketing': 'vigneshdigitalmarketer1@gmail.com',
  'Vignesh Technologies': 'vigneshtechnologies1@gmail.com'
};

// ========== ENTRY POINTS ==========
function doGet(e) {
  e = e || {};
  var action = (e.parameter && e.parameter.action) || 'admin';

  if (action === 'getProducts') {
    return jsonResponse(getProductsData());
  }

  if (action === 'visit') {
    var vid = (e.parameter && e.parameter.vid) ? String(e.parameter.vid).substring(0, 64) : '';
    return jsonResponse(recordVisit(vid));
  }

  // One-time cleanup: ?action=cleanupVisitors
  if (action === 'cleanupVisitors') {
    return jsonResponse(cleanupVisitorSheets());
  }

  return HtmlService.createHtmlOutputFromFile('Admin')
    .setTitle('Vignesh Universe Admin')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
    var action = data.action || '';

    if (action === 'contact') {
      saveContact(data);
      return jsonResponse({ success: true, message: 'Saved' });
    }

    if (!isFounder()) {
      return jsonResponse({ success: false, error: 'Unauthorized. Only Founder Can Access.' });
    }

    switch (action) {
      case 'addCategory': return jsonResponse(addCategory(data));
      case 'updateCategory': return jsonResponse(updateCategory(data));
      case 'deleteCategory': return jsonResponse(deleteCategory(data));
      case 'addProduct': return jsonResponse(addProduct(data));
      case 'updateProduct': return jsonResponse(updateProduct(data));
      case 'deleteProduct': return jsonResponse(deleteProduct(data));
      case 'getAdminData': return jsonResponse(getProductsData());
      case 'uploadImage': return jsonResponse(uploadImage(data));
      default: return jsonResponse({ success: false, error: 'Unknown Action' });
    }
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  }
}

// ========== AUTH ==========
function isFounder() {
  try {
    var email = Session.getActiveUser().getEmail();
    return email && email.toLowerCase() === FOUNDER_EMAIL.toLowerCase();
  } catch (e) {
    return false;
  }
}

function getCurrentUserEmail() {
  try {
    return Session.getActiveUser().getEmail() || '';
  } catch (e) {
    return '';
  }
}

// ========== SHEETS HELPERS ==========
function getSpreadsheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    var files = DriveApp.getFilesByName('VigneshUniverse-Data');
    if (files.hasNext()) {
      ss = SpreadsheetApp.open(files.next());
    } else {
      ss = SpreadsheetApp.create('VigneshUniverse-Data');
    }
  }
  ensureSheets(ss);
  return ss;
}

function ensureSheets(ss) {
  var contacts = ss.getSheetByName(SHEET_NAME_CONTACTS);
  if (!contacts) {
    contacts = ss.insertSheet(SHEET_NAME_CONTACTS);
    contacts.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Business', 'Message']);
  } else {
    var headers = contacts.getRange(1, 1, 1, contacts.getLastColumn()).getValues()[0];
    if (headers.indexOf('Phone') === -1) {
      contacts.insertColumnAfter(3);
      contacts.getRange(1, 4).setValue('Phone');
    }
  }

  var cats = ss.getSheetByName(SHEET_NAME_CATEGORIES);
  if (!cats) {
    cats = ss.insertSheet(SHEET_NAME_CATEGORIES);
    cats.appendRow(['Id', 'Name', 'Order', 'Active']);
  }

  var prods = ss.getSheetByName(SHEET_NAME_PRODUCTS);
  if (!prods) {
    prods = ss.insertSheet(SHEET_NAME_PRODUCTS);
    prods.appendRow(['Id', 'CategoryId', 'Name', 'Description', 'Price', 'ImageUrl', 'Active', 'Created']);
  }

  var vis = ss.getSheetByName(SHEET_NAME_VISITORS);
  if (!vis) {
    vis = ss.insertSheet(SHEET_NAME_VISITORS);
    vis.appendRow(['Date', 'UniqueCount']);
  }

  var visLog = ss.getSheetByName('VisitorLog');
  if (!visLog) {
    visLog = ss.insertSheet('VisitorLog');
    visLog.appendRow(['Date', 'VisitorId']);
  }

  var def = ss.getSheetByName('Sheet1');
  if (def && ss.getSheets().length > 1) {
    try { ss.deleteSheet(def); } catch (e) {}
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Convert Any Sheet Date Cell To YYYY-MM-DD
function cellToDateStr(val) {
  if (val instanceof Date) {
    return Utilities.formatDate(val, TIMEZONE, 'yyyy-MM-dd');
  }
  var s = String(val || '').trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.substring(0, 10);
  return s;
}

// ========== CONTACT ==========
function saveContact(data) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_CONTACTS);
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.business || '',
    data.message || ''
  ]);

  var toEmail = BUSINESS_EMAILS[data.business] || FOUNDER_EMAIL;
  var subject = 'New Contact – ' + (data.business || 'General') + ' – ' + (data.name || 'Visitor');
  var body =
    'New Contact Form Submission\n\n' +
    'Name: ' + (data.name || '') + '\n' +
    'Email: ' + (data.email || '') + '\n' +
    'Phone: ' + (data.phone || '') + '\n' +
    'Business: ' + (data.business || '') + '\n' +
    'Message:\n' + (data.message || '') + '\n\n' +
    '---\nSaved In Google Sheet: VigneshUniverse-Data → Contacts';

  try {
    MailApp.sendEmail({
      to: toEmail,
      subject: subject,
      body: body,
      replyTo: data.email || FOUNDER_EMAIL
    });
  } catch (mailErr) {
    Logger.log('Email send failed: ' + mailErr);
  }
}

// ========== PRODUCTS ==========
function getProductsData() {
  var ss = getSpreadsheet();
  var catSheet = ss.getSheetByName(SHEET_NAME_CATEGORIES);
  var catData = catSheet.getDataRange().getValues();
  var categories = [];
  for (var i = 1; i < catData.length; i++) {
    var r = catData[i];
    if (!r[0]) continue;
    categories.push({
      id: String(r[0]),
      name: String(r[1] || ''),
      order: Number(r[2]) || 0,
      active: r[3] !== false && r[3] !== 'FALSE' && r[3] !== 'false'
    });
  }
  categories.sort(function(a, b) { return a.order - b.order; });

  var prodSheet = ss.getSheetByName(SHEET_NAME_PRODUCTS);
  var prodData = prodSheet.getDataRange().getValues();
  var products = [];
  for (var j = 1; j < prodData.length; j++) {
    var p = prodData[j];
    if (!p[0]) continue;
    products.push({
      id: String(p[0]),
      categoryId: String(p[1] || ''),
      name: String(p[2] || ''),
      description: String(p[3] || ''),
      price: p[4] || '',
      imageUrl: String(p[5] || ''),
      active: p[6] !== false && p[6] !== 'FALSE' && p[6] !== 'false',
      created: p[7] ? String(p[7]) : ''
    });
  }

  return {
    success: true,
    categories: categories,
    products: products,
    userEmail: getCurrentUserEmail(),
    isAdmin: isFounder()
  };
}

function addCategory(data) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_CATEGORIES);
  var id = Utilities.getUuid().substring(0, 8);
  sheet.appendRow([id, data.name || 'New Section', Number(data.order) || 0, true]);
  return { success: true, id: id };
}

function updateCategory(data) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_CATEGORIES);
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(data.id)) {
      if (data.name !== undefined) sheet.getRange(i + 1, 2).setValue(data.name);
      if (data.order !== undefined) sheet.getRange(i + 1, 3).setValue(Number(data.order));
      if (data.active !== undefined) sheet.getRange(i + 1, 4).setValue(!!data.active);
      return { success: true };
    }
  }
  return { success: false, error: 'Category Not Found' };
}

function deleteCategory(data) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_CATEGORIES);
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(data.id)) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  return { success: false, error: 'Category Not Found' };
}

function addProduct(data) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_PRODUCTS);
  var id = Utilities.getUuid().substring(0, 8);
  sheet.appendRow([
    id, data.categoryId || '', data.name || '', data.description || '',
    data.price || '', data.imageUrl || '', true, new Date()
  ]);
  return { success: true, id: id };
}

function updateProduct(data) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_PRODUCTS);
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(data.id)) {
      if (data.categoryId !== undefined) sheet.getRange(i + 1, 2).setValue(data.categoryId);
      if (data.name !== undefined) sheet.getRange(i + 1, 3).setValue(data.name);
      if (data.description !== undefined) sheet.getRange(i + 1, 4).setValue(data.description);
      if (data.price !== undefined) sheet.getRange(i + 1, 5).setValue(data.price);
      if (data.imageUrl !== undefined) sheet.getRange(i + 1, 6).setValue(data.imageUrl);
      if (data.active !== undefined) sheet.getRange(i + 1, 7).setValue(!!data.active);
      return { success: true };
    }
  }
  return { success: false, error: 'Product Not Found' };
}

function deleteProduct(data) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_PRODUCTS);
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(data.id)) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  return { success: false, error: 'Product Not Found' };
}

function getOrCreateFolder() {
  var folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

function uploadImage(data) {
  if (!data.base64) return { success: false, error: 'No Image Data' };
  var base64 = data.base64;
  var contentType = 'image/jpeg';
  var filename = data.filename || ('product_' + Date.now() + '.jpg');
  if (base64.indexOf('data:') === 0) {
    var parts = base64.split(',');
    var meta = parts[0];
    base64 = parts[1];
    var match = meta.match(/data:([^;]+)/);
    if (match) contentType = match[1];
  }
  var blob = Utilities.newBlob(Utilities.base64Decode(base64), contentType, filename);
  var folder = getOrCreateFolder();
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return {
    success: true,
    imageUrl: 'https://drive.google.com/uc?export=view&id=' + file.getId(),
    fileId: file.getId()
  };
}

// ========== UNIQUE VISITOR COUNTER ==========
function recordVisit(visitorId) {
  try {
    var ss = getSpreadsheet();
    var statsSheet = ss.getSheetByName(SHEET_NAME_VISITORS);
    var logSheet = ss.getSheetByName('VisitorLog');

    if (!statsSheet || !logSheet) {
      return { success: false, error: 'Visitor sheets missing' };
    }

    var today = Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd');
    if (!visitorId) visitorId = 'anon_' + Utilities.getUuid().substring(0, 8);

    // --- Check If Already Counted Today ---
    var logData = logSheet.getDataRange().getValues();
    var alreadyCounted = false;
    for (var i = 1; i < logData.length; i++) {
      var rowDate = cellToDateStr(logData[i][0]);
      var rowVid = String(logData[i][1] || '');
      if (rowDate === today && rowVid === visitorId) {
        alreadyCounted = true;
        break;
      }
    }

    if (!alreadyCounted) {
      // Add To Log
      logSheet.appendRow([today, visitorId]);

      // Update Stats - Only ONE Row Per Date
      var statsData = statsSheet.getDataRange().getValues();
      var foundRow = -1;
      for (var j = 1; j < statsData.length; j++) {
        if (cellToDateStr(statsData[j][0]) === today) {
          foundRow = j + 1; // 1-based sheet row
          break;
        }
      }

      if (foundRow > 0) {
        var current = Number(statsSheet.getRange(foundRow, 2).getValue()) || 0;
        statsSheet.getRange(foundRow, 2).setValue(current + 1);
      } else {
        statsSheet.appendRow([today, 1]);
      }

      SpreadsheetApp.flush();
    }

    return computeVisitorStats(statsSheet);
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

function computeVisitorStats(sheet) {
  var data = sheet.getDataRange().getValues();
  var now = new Date();
  var todayStr = Utilities.formatDate(now, TIMEZONE, 'yyyy-MM-dd');
  var year = now.getFullYear();
  var month = now.getMonth();

  // Group By Date (Handles Duplicate Rows Safely)
  var byDate = {};
  for (var i = 1; i < data.length; i++) {
    var dStr = cellToDateStr(data[i][0]);
    var cnt = Number(data[i][1]) || 0;
    if (!dStr || dStr.length < 10) continue;
    if (!byDate[dStr]) byDate[dStr] = 0;
    // Take Max If Duplicate Rows Exist (Safer Than Sum Of Bad Data)
    if (cnt > byDate[dStr]) byDate[dStr] = cnt;
  }

  var todayCount = byDate[todayStr] || 0;
  var weekCount = 0;
  var monthCount = 0;
  var yearCount = 0;

  for (var dStr in byDate) {
    var cnt = byDate[dStr];
    var parts = dStr.split('-');
    if (parts.length < 3) continue;
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    if (isNaN(d.getTime())) continue;

    if (d.getFullYear() === year) {
      yearCount += cnt;
      if (d.getMonth() === month) monthCount += cnt;
    }

    var diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays < 7) weekCount += cnt;
  }

  return {
    success: true,
    today: todayCount,
    weekly: weekCount,
    monthly: monthCount,
    yearly: yearCount
  };
}

// ========== ONE-TIME CLEANUP (Removes Duplicate Rows) ==========
function cleanupVisitorSheets() {
  try {
    var ss = getSpreadsheet();
    var logSheet = ss.getSheetByName('VisitorLog');
    var statsSheet = ss.getSheetByName(SHEET_NAME_VISITORS);

    // Clean VisitorLog - Keep Unique Date+VisitorId Only
    if (logSheet) {
      var logData = logSheet.getDataRange().getValues();
      var seen = {};
      var cleanLog = [['Date', 'VisitorId']];
      for (var i = 1; i < logData.length; i++) {
        var d = cellToDateStr(logData[i][0]);
        var v = String(logData[i][1] || '');
        if (!d || !v) continue;
        var key = d + '|' + v;
        if (!seen[key]) {
          seen[key] = true;
          cleanLog.push([d, v]);
        }
      }
      logSheet.clear();
      if (cleanLog.length > 0) {
        logSheet.getRange(1, 1, cleanLog.length, 2).setValues(cleanLog);
      }
    }

    // Clean VisitorStats - One Row Per Date, Count = Unique IDs For That Date
    if (statsSheet && logSheet) {
      var logData2 = logSheet.getDataRange().getValues();
      var dateCounts = {};
      for (var k = 1; k < logData2.length; k++) {
        var d2 = cellToDateStr(logData2[k][0]);
        if (!d2) continue;
        dateCounts[d2] = (dateCounts[d2] || 0) + 1;
      }

      var cleanStats = [['Date', 'UniqueCount']];
      var dates = Object.keys(dateCounts).sort();
      for (var m = 0; m < dates.length; m++) {
        cleanStats.push([dates[m], dateCounts[dates[m]]]);
      }

      statsSheet.clear();
      if (cleanStats.length > 0) {
        statsSheet.getRange(1, 1, cleanStats.length, 2).setValues(cleanStats);
      }
    }

    SpreadsheetApp.flush();
    return { success: true, message: 'Visitor sheets cleaned. Duplicates removed.' };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

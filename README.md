# ระบบช่วยสร้าง Prompt สำหรับเกม

ระบบนี้ช่วยให้คุณสร้าง Prompt เพื่อใช้กับ Canva AI สำหรับออกแบบเกมการเรียนรู้ โดยกรอกเพียงรายวิชาและแนวคิด พร้อมบันทึกข้อมูลลง Google Sheets ได้

## ไฟล์ประกอบ
- `index.html` — หน้าแรกสำหรับกรอกข้อมูลและสร้าง Prompt
- `script.js` — สคริปต์สำหรับสร้าง Prompt และบันทึก Google Sheets
- `view.html` — หน้าสำหรับดู Prompt ที่สร้างไว้
- `README.md` — คำอธิบายระบบ

## วิธีใช้งาน
1. เปิด `index.html` เพื่อเริ่มสร้าง Prompt
2. กด Generate เพื่อสร้าง Prompt ทั้ง 10 แบบ
3. แต่ละ Prompt จะถูกบันทึกไปยัง Google Sheets โดยใช้ Apps Script
4. ใช้ `view.html` เพื่อดู Prompt ที่เคยสร้าง โดยกรองตามวิชาได้

## การเชื่อมต่อ Google Sheets

1. สร้าง Google Sheet และเปิดเมนู `Extensions > Apps Script`
2. วางโค้ด Apps Script ต่อไปนี้:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Prompt") || SpreadsheetApp.getActiveSpreadsheet().insertSheet("Prompt");
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.subject, data.concept, data.gameType, data.grade, data.players, data.prompt]);
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}
```

3. กด Deploy > New Deployment
4. เลือก "Web App", ตั้งชื่อ, ให้สิทธิ์ "Anyone"
5. คัดลอก URL มาใส่ใน `script.js` ตรง `const SHEET_URL`

> จัดทำโดย ครูนิด (Krunid)

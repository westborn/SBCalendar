function doGet(e) {
  return HtmlService.createTemplateFromFile('claspIndex.html').evaluate()
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

function getSheet(sheetName) {
  const data = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(sheetName)
    .getDataRange()
    .getValues()
  const dataObj = getJsonArrayFromData(data)
  return JSON.stringify(dataObj)
}

function getData() {
  console.log('getdata')
  return 'GetData'
}

function getSheetTest() {
  const res = JSON.parse(getSheet('volunteers'))
  console.log(JSON.stringify(res, null, 2))
}

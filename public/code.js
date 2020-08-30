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

function addVolliesToTask(date, taskId, vollies) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Database')
  const dbData = sheet.getDataRange().getValues()
  const DB = getJsonArrayFromData(dbData, true)
  //get all the rows for this day/task
  const myRows = DB.filter((row) => row.date.getTime() === date.getTime() && row.taskId === taskId)
  //  sort so bottom rows are delted first (apps script sheets issue)
  myRows.sort((a, b) => b.row_ - a.row_)
  // delete all vollies for this data/taskId
  myRows.forEach((row) => sheet.deleteRow(row.row_ + 1))
  // now add the new row(s)
  vollies.forEach((vollie) => sheet.appendRow([date, taskId, vollie]))
  // send back the entire sheet including updates
  const data = sheet.getDataRange().getValues()
  const response = getJsonArrayFromData(data)
  return JSON.stringify({ status: 'ok', date, data: response })
}

function test() {
  addVolliesToTask(new Date('03/04/2020'), '307-N', ['101-PB'])
}

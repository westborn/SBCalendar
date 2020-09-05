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

function updateDBTask(dte, taskId, vollies) {
  // console.log(`updateTask: ${dte} - ${taskId} - ${vollies.join(' ')}`)
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Database')
  const dbData = sheet.getDataRange().getValues()
  const DB = getJsonArrayFromData(dbData, true)
  //get all the rows for this day/task
  const date = new Date(dte)
  const myRows = DB.filter((row) => row.date.getTime() === date.getTime() && row.taskId === taskId)
  //  sort so bottom rows are deleted first (apps script sheets issue)
  myRows.sort((a, b) => b.row_ - a.row_)
  // delete all vollies for this data/taskId
  myRows.forEach((row) => sheet.deleteRow(row.row_ + 1))
  // now add the new row(s)
  vollies.forEach((vollie) => {
    sheet.appendRow([date, taskId, vollie])
    //copy formatting an formula from the first row of data (after headers)
    sheet
      .getRange(2, 1, 1, sheet.getLastColumn())
      .copyTo(sheet.getRange(sheet.getLastRow(), 1), { formatOnly: true })
  })
  // //sort the sheet into date/task seq
  // const rng = sheet.getRange(2,1,sheet.getLastRow(), sheet.getLastColumn())
  // rng.sort([{column: 1,ascending: true},{column: 2,ascending: true}])
  // send back the entire sheet including updates
  const data = sheet.getDataRange().getValues()
  const response = getJsonArrayFromData(data)
  return JSON.stringify({ status: 'ok', data: response })
}

function test() {
  updateDBTask(new Date('03/04/2020'), '307-N', ['101-PB'])
}

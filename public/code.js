function doGet(e) {
  return HtmlService.createTemplateFromFile('claspIndex.html').evaluate()
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

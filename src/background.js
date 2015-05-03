function downloadImages(productData) {
  var fullUrls = productData.urls.map(function(thumbUrl) {
    return thumbUrl
      .replace('wid=78', '$redesign-zoom-5x$')
      .replace('//', 'http://');
  });
  console.log('Full image size urls: ', fullUrls);

  fullUrls.forEach(function(fullUrl, index) {
    chrome.downloads.download({
      url: fullUrl,
      conflictAction: 'overwrite',
      filename: (productData.name+' '+productData.color+' '+index+'.jpg').trim()
    });
  });
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: 'anthropologie.com' }
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function() {
  chrome.tabs.getSelected(function(tab) {
    console.log(tab);
    chrome.tabs.sendMessage(tab.id, 'getProductImages', downloadImages);
  });
});



function getProductImageUrls() {
  var urls = [];
  $('.tg-thumbnail-image').each(function(index, ele) {
    urls.push( $(ele).attr('src') );
  });
  return urls;
}

function getProductName() {
  return $('.product-name span').get(0).innerHTML;
}

function getProductColor() {
  return $('.product-selected-color').text();
}


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  var imgUrls;
  if (msg === 'getProductImages') {
    data = {
      urls:  getProductImageUrls(),
      name:  getProductName(),
      color: getProductColor()
    };
    console.log('-- Sending:', data);
    sendResponse(data);
  }

});


console.log('Anthro Image Downloader loaded');
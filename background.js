chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'copy') {
        var input = document.createElement('textarea');
        document.body.appendChild(input);
        input.value = message.text;
        input.select();
        document.execCommand('Copy');
        input.remove();
        sendResponse({success: true});
    } else if (message.type === 'openWindow') {
        chrome.windows.create({url: message.url});
    }
});

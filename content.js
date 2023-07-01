// Tworzenie menu kontekstowego
var contextMenu = document.createElement("div");
contextMenu.style.display = "none";
contextMenu.style.position = "absolute";
contextMenu.style.backgroundColor = "#f1f1f1";
contextMenu.style.minWidth = "150px";
contextMenu.innerHTML = `
    <a href="#" id="open-link-tab" style="display: block; padding: 12px 16px;">Open in a new Tab</a>
    <a href="#" id="open-link-window" style="display: block; padding: 12px 16px;">Open in a new Window</a>
`;
document.body.appendChild(contextMenu);

// Dodawanie nasłuchiwacza zdarzeń dla zdarzenia contextmenu
document.addEventListener("contextmenu", function(e) {
    if (e.target.closest(".mc_fgvc_u")) {
        e.preventDefault();
        contextMenu.style.display = "block";
        contextMenu.style.left = e.pageX + "px";
        contextMenu.style.top = e.pageY + "px";

        // Pobieranie wartości parametru "mid"
        var mid = e.target.closest(".mc_fgvc_u").querySelector(".playinfo").getAttribute("data-videoid-info");

        // Tworzenie adresu URL do strony z filmem na Bing Videos
        var videoLink = `https://www.bing.com/videos/search?&q=video&view=detail&mid=${mid}&FORM=VDRVSR&ru=%2Fvideos%2Fsearch%3Fq%3Dvideo%26FORM%3DVDVVXX&ajaxhist=0`;

        // Ustawianie adresu URL w atrybucie "href" elementu "a"
        document.querySelector("#open-link-tab").href = videoLink;
        document.querySelector("#open-link-tab").target = "_blank";
        
        document.querySelector("#open-link-window").onclick = function(e) {
            e.preventDefault();
            chrome.runtime.sendMessage({type: 'openWindow', url: videoLink});
        };
    }
});

// Ukrywanie menu kontekstowego po kliknięciu na stronie
document.addEventListener("click", function() {
    contextMenu.style.display = "none";
});

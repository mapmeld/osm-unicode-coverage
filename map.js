
let mymap = L.map('map').setView([0, 0], 1);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(mymap);

let markersByLang = {};

let loadOntoMap = (jdata) => {
  currentLayer = null;

  for (var latstr in jdata) {
    for (var lngstr in jdata[latstr]) {
      let lat = Number(latstr),
          lng = Number(lngstr),
          langs = jdata[latstr][lngstr];
      let marker = L.marker([lat, lng])
        .bindPopup(langs.join(', '));
      langs.forEach((lang) => {
        if (markersByLang[lang]) {
          markersByLang[lang].push(marker);
        } else {
          markersByLang[lang] = [marker];
          let li = document.createElement('li'),
              label = document.createElement('label'),
              option = document.createElement('input'),
              span = document.createElement('span');
          span.innerText = lang;
          option.type = 'radio';
          option.name = 'lang';
          option.value = lang;
          option.addEventListener('click', (event) => {
            if (currentLayer) {
              currentLayer.forEach((marker) => marker.remove());
            }
            currentLayer = markersByLang[event.target.value];
            markersByLang[event.target.value].forEach((marker) => {
              marker.addTo(mymap);
            });
          });
          label.appendChild(option);
          label.appendChild(span);
          li.appendChild(label);
          document.getElementById("uniqueLangs").appendChild(li);
        }
      });
    }
  }
};

fetch("./antarctica.json?r=3").then(res => res.json()).then(loadOntoMap);
fetch("./oceania.json").then(res => res.json()).then(loadOntoMap);

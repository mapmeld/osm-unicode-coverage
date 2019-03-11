
let mymap = L.map('map').setView([0, 0], 1);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(mymap);

let markersByLang = {};

let loadOntoMap = (jdata) => {
  currentLayer = null;
  let hasCoords = {};

  for (var latstr in jdata) {
    for (var lngstr in jdata[latstr]) {
      let lat = Number(latstr),
          lng = Number(lngstr),
          langs = jdata[latstr][lngstr];
      let marker = L.marker([lat, lng])
        .bindPopup(langs.join(', '));

      langs.forEach((lang) => {
        if (markersByLang[lang]) {
          if (langs.length === 1 && (langs[0] === 'Arabic' || langs[0] === 'Hebrew' || langs[0] === 'Tifinagh' || langs[0] === 'Cyrillic' || langs[0] === 'CJK Unified Ideographs')) {
            // yes minimization
            if (!hasCoords[lang]) {
              hasCoords[lang] = {};
            }
            if (hasCoords[lang][Math.round(lat.toFixed(1) * 3)] && hasCoords[lang][Math.round(lat.toFixed(1) * 3)][Math.round(lng.toFixed(1) * 3)]) {
              // hide me

            } else {
              // place and remember me
              if (!hasCoords[lang][Math.round(lat.toFixed(1) * 3)]) {
                hasCoords[lang][Math.round(lat.toFixed(1) * 3)] = {};
              }
              if (!hasCoords[lang][Math.round(lat.toFixed(1) * 3)][Math.round(lng.toFixed(1) * 3)]) {
                hasCoords[lang][Math.round(lat.toFixed(1) * 3)][Math.round(lng.toFixed(1) * 3)] = true;
              }
              markersByLang[lang].push(marker);
            }
          } else {
            // no minimization
            markersByLang[lang].push(marker);
          }
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
  //console.log(hasCoords);
};

fetch("./antarctica.json?r=3").then(res => res.json()).then(loadOntoMap);
fetch("./africa.json").then(res => res.json()).then(loadOntoMap);
fetch("./oceania.json").then(res => res.json()).then(loadOntoMap);
fetch("./southamerica.json").then(res => res.json()).then(loadOntoMap);
fetch("./centralamerica.json").then(res => res.json()).then(loadOntoMap);

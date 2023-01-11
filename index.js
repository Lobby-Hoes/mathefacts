dayjs.extend(window.dayjs_plugin_duration);
dayjs.extend(window.dayjs_plugin_customParseFormat);
function toSeconds(time) {
  var parts = time.split(':');
  return (+parts[0]) * 60 * 60 + (+parts[1]) * 60 + (+parts[2]);
}


document.addEventListener("DOMContentLoaded", () => {
  let host = "https://data.hobbylos.online/graphql";
  //let host = "http://localhost:4000/graphql"
  let table = new simpleDatatables.DataTable("#mathefacts", {
    perPageSelect: [10, 25, 100]
  });
  fetch(host, {
    body: '{"query":"query GetAllMathefacts { mathefacts { startzeit endzeit thema beschreibung folge {folgenId folgenname code}}}"}',
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  })
    .then(data => data.json())
    .then(data => {
      let insertData = data.data.mathefacts.map(({thema, beschreibung, startzeit, endzeit, folge}) => {
        let [start, end] = [startzeit, endzeit].map(el => dayjs(el, "hh:mm:ss"));
        let diff = dayjs.duration(end.diff(start));
        console.log(dayjs(startzeit, "HH:mm:ss"))
        let embed = "<iframe style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/episode/" + folge.code + "?t=" + toSeconds(startzeit) + "\" width=\"330\" height=\"152 \" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\"></iframe>"
        return [folge.folgenId, folge.folgenname, thema, beschreibung, startzeit, endzeit, diff.format("mm:ss"), embed];
      });
      table.rows().add(insertData);
    });
});

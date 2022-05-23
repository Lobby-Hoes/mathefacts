dayjs.extend(window.dayjs_plugin_duration);
dayjs.extend(window.dayjs_plugin_customParseFormat);

document.addEventListener("DOMContentLoaded", () => {
  let table = new simpleDatatables.DataTable(document.getElementById("mathefacts"));
  fetch("./data.json")
    .then(data => data.json())
    .then(data => {
      let insertData = data.data.map(({folge, name, faktthema, beschreibung, startzeit, endzeit}) => {
        let [start, end] = [startzeit, endzeit].map(el => dayjs(el, "hh:mm:ss"));
        let diff = dayjs.duration(end.diff(start));
        return [folge, name, faktthema, beschreibung, startzeit, endzeit, diff.format("mm:ss")];
      });
      table.rows().add(insertData);
    });
});
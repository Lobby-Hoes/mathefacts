dayjs.extend(window.dayjs_plugin_duration);
dayjs.extend(window.dayjs_plugin_customParseFormat);

document.addEventListener("DOMContentLoaded", () => {
    let table = new simpleDatatables.DataTable("#mathefacts", {
      perPageSelect: [10, 25, 100]
    });
    fetch("./data.json")
        .then(data => data.json())
        .then(data => {
            let insertData = data.data.map(({folge, name, faktthema, beschreibung, startzeit, endzeit, code}) => {
                let [start, end] = [startzeit, endzeit].map(el => dayjs(el, "hh:mm:ss"));
                let diff = dayjs.duration(end.diff(start));
                let embed = "<iframe style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/episode/" + code + "?t=" + dayjs(startzeit, "hh:mm:ss").diff(dayjs("00:00:00", "hh:mm:ss")) + "\" width=\"330\" height=\"152 \" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\"></iframe>"
                return [folge, name, faktthema, beschreibung, startzeit, endzeit, diff.format("mm:ss"), embed];
            });
            table.rows().add(insertData);
        });
});

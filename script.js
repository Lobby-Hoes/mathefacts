$(document).ready(function () {
    $('#example').DataTable({
        ajax: 'data/objects.json',
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'faktthema' },
            { data: 'fakt' },
            { data: 'startzeit' },
            { data: 'endzeit' },
            { data: 'dauer' },
        ],
    });
});
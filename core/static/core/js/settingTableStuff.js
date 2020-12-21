$("body").on('click-row.bs.table', function (e, row, $element) {
    window.location = $element.data('href');
});
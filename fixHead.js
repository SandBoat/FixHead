!function () {
    if (!window.$) { console.warn('找不到 jquery'); return; }
    if (window.fixHead) return;

    var fixHead = window.fixHead = {};
    fixHead.init = (selector, {
        width = 1200,
        height = 500
    } = {}) => {
        const $con = $(selector);
        if (!$con) return;

        const $head = $con.find('.fixHead-head');
        const $body = $con.find('.fixHead-body');
        if (!$head || !$body) return;

        const $bodyLines = $body.find('.fixHead-line');
        if (!$bodyLines.length) return;

        let lineProg = []; // line 高度序列
        lineProg[0] = $bodyLines[0].offsetHeight;

        for (let i = 1; i < $bodyLines.length; i++) {
            lineProg[i] = lineProg[i - 1] + $bodyLines[i].offsetHeight;
        }

        $body.width(width);
        $body.height(height);
        $head.width(width);
        const $note = $head.find('.fixHead-head-note');
        if ($note.length) {
            $body.scroll((e) => {
                $head.scrollLeft($body.scrollLeft());
                const index = lineProg.findIndex((prog) => prog > $body.scrollTop());
                $note.text($bodyLines.eq(index).data('note'));
            });
        } else {
            $body.scroll((e) => {
                $head.scrollLeft($body.scrollLeft());
            });
        }
    }
}();
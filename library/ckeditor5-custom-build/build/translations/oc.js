(function (r) {
    const o = (r["oc"] = r["oc"] || {});
    o.dictionary = Object.assign(o.dictionary || {}, {
        "%0 of %1": "",
        Bold: "Gras",
        Cancel: "Anullar",
        Italic: "Italica",
        "Remove color": "",
        "Restore default": "",
        Save: "Enregistrar",
        "Show more items": "",
        Strikethrough: "",
        Subscript: "",
        Superscript: "",
        Underline: "",
    });
    o.getPluralForm = function (r) {
        return r > 1;
    };
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}));

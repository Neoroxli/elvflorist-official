document.querySelectorAll('[data-toggle="input-mask"]').forEach((t) => {
    var a = t.getAttribute("data-mask-format").toString().replaceAll("0", "9");
    t.setAttribute("data-mask-format", a);
    const e = new Inputmask(a);
    e.mask(t);
});

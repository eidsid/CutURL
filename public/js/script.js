function reload() {
    setTimeout(function() {
        window.location.reload(true)
    }, 50000)
}
reload()
document.querySelectorAll('#close').forEach(el => {
    el.addEventListener('click', (e) => {
        e.target.parentElement.remove();
        console.log("welcome eid", e.target.parentElement);
    })
})
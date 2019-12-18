(function () {
    const toggleShowMore = () => {
        ss("#more").forEach(elm => elm.classList.toggle("hidden"));
    };
    ss('#textCard').forEach(elm => {
        elm.addEventListener("mouseover", toggleShowMore);
    });
})()
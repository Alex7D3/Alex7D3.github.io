document.addEventListener("DOMContentLoaded", async (e) => {
    const  name = "echo 'Hello, World!'";
    let time = 400, maxExtraTime = 100;
    const title = document.querySelector(".command");
    for (const c of name) {
        setTimeout(() => {
            title.innerHTML += c;
        }, Math.random() * maxExtraTime + time);
        time += 100 + + (c === ' ' ? 100 : 0);
    }
    setTimeout(() => {
        $('.cursor1').hide();
        $('.line').after(`
            <div class="line">
                <span class="output">Hello, World!</span>
            </div>
            <div class="line">
                <span class="caret">Alex@pc:~$</span> <span class="cursor2">&nbsp;</span>
            </div>`);
    }, time + 1000);
});
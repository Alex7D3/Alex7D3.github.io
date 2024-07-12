import assets from "../data/assets.json" with { type: "json" };
const { commands } = assets;

document.addEventListener("DOMContentLoaded", async (e) => {
    let time = 400, maxExtraTime = 100, title;
    for (let i = 0; i < commands.length; i++) {
        setTimeout(() => {
            title = document.querySelector("#command" + i);
        }, time);
        for (const c of commands[i].command) {
            setTimeout(() => {
                title.innerHTML += c;
            }, Math.random() * maxExtraTime + time);
            time += 100 + (c === ' ' || c === "'" ? 100 : 0);
        }
        time += 2000;
        setTimeout(() => {
            $('#cursor' + i).hide();
            $(`#line${i}`).after(`
                <div class="line">
                    <span class="output">${commands[i].result}</span>
                </div>
                <div id="line${i+1}" class="line">
                    <span class="caret">Alex@pc:~$&nbsp;</span><span id="command${i+1}" class="command"></span><span id="cursor${i+1}" class="cursor">&nbsp;</span>
                </div>`
            );
        }, time);
        time += 2000;
    }
});
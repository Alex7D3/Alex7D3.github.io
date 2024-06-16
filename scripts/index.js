import assets from "../data/assets.json" with { type: "json" };
const { icons, projects } = assets;

// const sections = document.querySelectorAll("section");
// const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         const navElem = document.querySelector(`.navlink > a[href="#${entry.target.id}"]`);
//         if(entry.isIntersecting) {
//            navElem.classList.add("active");
//         } else {
//             navElem.classList.remove("active");
//         }
//     });
// }, { rootMargin: "-50% 0px -55%" });

// sections.forEach(elem => {
//     observer.observe(elem);
// });

$(document).ready(() => {
    const iconGrid = $("#about-content .content .icon-grid");
    fillIconGrid(iconGrid, icons);

    const projectGrid = $("#projects-content .project-grid");
    projects.forEach(({ name, desc, url, tools }, idx) => {
        const project = $("<div></div>").addClass("content").attr("idx", idx);
        const iconGrid = $("<div></div>").addClass("icon-grid");
        const article = $(`<article>${desc}</article>`);
        const title = $("<h3></h3>").append($(`<a>${name}</a>`)
            .attr("href", url)
            .attr("target", "_blank")
            .attr("rel", "noreferrer")
        );
        fillIconGrid(iconGrid, tools);
        project.append(title, article, iconGrid);
        projectGrid.append(project);
    });
});

function fillIconGrid(iconGrid, icons) {
    icons.forEach(({ path, alt }, idx) => {
        iconGrid.append($("<img>")
        .attr("key", idx)
        .attr("src", path)
        .attr("title", alt)
        .attr("alt", alt)
        .attr("width", "60px")
        .attr("height", "60px"));   
    });
}
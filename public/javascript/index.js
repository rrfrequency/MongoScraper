function displayScrape() {
    $.getJSON("/scrape",  (scrape_code) => {
        if (scrape_code.code == "success") {
            $.getJSON("/articles", (data) => {
                // clear out area that displays cards
                $("#news0").empty();
                $("#news1").empty();
                $("#news2").empty();
                $("#total-number").text(data.length);
                for let i = 0; i < data.length; i++) {
                    // generate a card for each scraped result
                    let main = $("<div>");
                    main.addClass("card white lighten-2");
                   let cardContent = $("<div>");
                    cardContent.addClass("card-content black-text");
                    let title = $("<span>");
                    title.addClass("card-title");
                    title.attr("data-id", data[i]._id);
                    title.attr("id", "title-" + data[i]._id);
                    title.text(data[i].title);
                    let p = $("<p>");
                    p.text(data[i].summary);
                    p.attr("id", "summary-" + data[i]._id);
                    cardContent.append(title);
                    cardContent.append(p);
                    let cardAction = $("<div>");
                    cardAction.addClass("card-action");
                    let a = $("<a>");
                    a.attr("href", data[i].link);
                    a.attr("id", "link-" + data[i]._id);
                    a.text("Visit Article");
                    cardAction.append(a);
                    let saveArticle = $("<a>");
                    saveArticle.addClass("waves-effect waves-light btn save-button");
                    saveArticle.attr("id", data[i]._id);
                    saveArticle.text("Save This Article");
                    cardAction.append(saveArticle);
                    main.append(cardContent);
                    main.append(cardAction);
                    $("#news" + String(i % 3)).append(main);
                }
            });
        }
   });
}

$(document).ready(function () {
    $(".button-collapse").sideNav();
    $('.modal').modal();
});
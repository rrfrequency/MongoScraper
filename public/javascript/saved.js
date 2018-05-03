function displaySaved() {
    $.getJSON("/saved/all", (data) => {
        $("#news0").empty();
        $("#news1").empty();
        $("#news2").empty();
        $("#total-number").text(data.length);
        for (let i = 0; i < data.length; i++) {
            let main = $("<div>");
            main.addClass("card white lighten-2");
            main.attr("id", "main-" + data[i]._id);
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
            cardContentv.append(title);
            cardContent.append(p);
            let cardAction = $("<div>");
            cardAction.addClass("card-action");
            let a = $("<a>");
            a.attr("href", data[i].link);
            a.attr("id", "link-" + data[i]._id);
            a.text("Visit Article");
            cardAction.append(a);
            let button = $("<a>");
            button.addClass("waves-effect waves-light white btn create-note modal-trigger");
            button.attr("data-id", data[i]._id);
            button.attr("data-target", "notes");
            button.text("Add a Comment");
            let deleteArticle = $("<a>");
            deleteArticle.addClass("waves-effect waves-light white btn delete-button");
            deleteArticle.attr("id", data[i]._id);
            deleteArticle.text("Delete");
            cardActionDiv.append(deleteArticle);
            mainDiv.append(cardContentDiv);
            mainDiv.append(cardActionDiv);

            $("#news" + String(i % 3)).append(mainDiv);
        }
    });
}

$(document).ready(function () {
    $(".button-collapse").sideNav();
    $('.modal').modal();

    // When click on savearticle button
    $(document).on('click', '.save-button', function () {
        let thisId = $(this).attr("id");
        let summary = $("#summary-" + thisId).text();
        let title = $("#title-" + thisId).text();
        let link = $("#link-" + thisId).attr('href');
        let byline = $("#byline-" + thisId).text();
        let data = {
            "id": thisId,
            "summary": summary,
            "title": title,
            "link": link,
            "byline": byline
        };
        $.ajax({
            type: "POST",
            url: "/save",
            data: data,
            dataType: "json",
            success: (data, textStatus) => {
                console.log(data);
            }
        });
    });
    // When click on delete article button
    $(document).on('click', '.delete-button',  () => {
        let thisId = $(this).attr("id");
        let summary = $("#summary-" + thisId).text();
        let title = $("#title-" + thisId).text();
        let link = $("#link-" + thisId).attr('href');
        let byline = $("#byline-" + thisId).text();
        let data = {
            "_id": thisId
        };
        $.ajax({
            type: "DELETE",
            url: "/delete",
            data: data,
            success: (data, textStatus) => {
                $("#main-" + thisId).remove();
            }
        })
    });

    // create note
    $(document).on("click", ".create-note", (data) => {
        // alert($(this).attr("data-id"));
        $("#savenote").attr("data-id", $(this).attr("data-id"));
        // <div id="display-note"></div>
        let aid = $(this).attr("data-id");
        let title = "Notes for the Article: " + aid;
        $("#display-title").empty();
        $("#display-title").text(title);
        $("#textarea1").val("");
        $.getJSON("/notes/" + aid, (data) => {
            if(data.length) {
                console.log(data);
                let notetext = "Notes: " + data[0].body;
                $("#display-note").empty();
                let noteList = $("<ul>");
                noteList.addClass("collection with-header");
                let hli = $("<li>");
                hli.addClass("collection-header")
                hli.text("Notes");
                noteList.append(hli);
            
                for (let i = 0; i < data.length; i++) {
                    let ili = $("<li>");
                    ili.attr("id", data[i]._id);
                    ili.addClass("collection-item");

                    let idiv = $("<div>");
                    idiv.text(data[i].body);

                    let adelete = $("<a>");
                    adelete.addClass("secondary-content");
                    adelete.attr("note-id", data[i]._id);
                    adelete.attr("href", "#");
                    adelete.attr("onclick", 'deletenote("' + data[i]._id + '")');
                    let xdelete = $("<i>");
                    xdelete.addClass("material-icons");
                    xdelete.attr("note-id", data[i]._id);
                    xdelete.html("delete");
                    adelete.append(xdelete);
                    idiv.append(adelete);
                    ili.append(idiv);
                    noteList.append(ili);
                }
                $("#display-note").append(noteList);
            }
        });
    });

    // When you click the savenote button
    $(document).on("click", "#savenote", () => {
        // Grab the id associated with the article from the submit button
        // get the user input value 
        let thisId = $(this).attr("data-id");
        let text = $("#textarea1").val();
        console.log(thisId);
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            type: "POST",
            url: "/notes",
            data: {
                "article_id": thisId,
                "body": text
            },
            success: (data, textStatus, jqXHR) => {
                console.log(data);
                $("#textarea1").val("");
            }
        });
    });
    // delete note button
    $(document).on("click", "#deletenote", () => {
        // Run a DELETE request to change the note, using what's entered in the inputs
        $.ajax({
            type: "DELETE",
            url: "/deletenote",
            data: data,
            success: (data, textStatus) => {
                $("#display-note").remove();
            }
        });
    });
});

function deletenote(thisId) {
    let data = {
        "_id": thisId
    };
    console.log(data);
    $.ajax({
        type: "DELETE",
        url: "/deletenote",
        data: data,
        success: (data, textStatus) => {
            $("#" + thisId).remove();
        }
    })
}
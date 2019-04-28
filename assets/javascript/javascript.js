// create an array of shows - in this case, awesome 90's tv shows
var animals = ["dog", "cat", "rabbit", "skunk", "goldfish", "bird", "ferret", "turtle"];

// creates buttons for each of these
function makeButtons() {
    // deletes the shows prior to adding new shows so there are no repeat buttons
    $('#show-buttons').empty();
    // loops through the shows array
    for (var i = 0; i < animals.length; i++) {
        // dynamically makes buttons for every show in the array
        var a = $('<button>')
        a.addClass('animal'); // add a class
        a.attr('data-name', animals[i]); // add a data-attribute
        a.text(animals[i]); // make button text
        $('#show-buttons').append(a); // append the button to buttonsView div
    }
}
// handles addShow button event
$("#add-animal").on("click", function () {

    // grabs the user show input
    var animal = $("#animal-input").val().trim();
    // that input is now added to the array
    animals.push(animal);
    // the makeButtons function is called, which makes buttons for all my shows plus the user show
    makeButtons();
    // this line is so users can hit "enter" instead of clicking the submit button
    return false;
})
// function to display gifs
function displayGifs() {
    //
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=9&api_key=G7lZulXleGoWc2fLuJmZxrCOuUtx13YN";
    // creates ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response.data);
        // save results as a variable
        var results = response.data;
        // for loop goes through each gif and adds these variables
        for (var i = 0; i < results.length; i++) {
            // creates a generic div to hold the results
            var gifDiv = $('<div class=gifs>');
            var animalGif = $('<img>');
            animalGif.attr('src', results[i].images.fixed_height_still.url);
            // shows the rating on hover
            animalGif.attr('title', "Rating: " + results[i].rating);
            animalGif.attr('data-still', results[i].images.fixed_height_still.url);
            animalGif.attr('data-state', 'still');
            animalGif.addClass('gif');
            animalGif.attr('data-animate', results[i].images.fixed_height.url);
            // var rating = results[i].rating;
            // var p = $('<p>').text('Rating: ' + rating);
            gifDiv.append(animalGif)
            // gifDiv.append(p)

            $("#view-animals").prepend(gifDiv);
        }

    });
}
// function for animating gifs
$(document).on('click', '.gif', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    };
});
// function for displaying show gifs
$(document).on("click", ".animal", displayGifs);

// initially calls the makeButtons function
makeButtons();

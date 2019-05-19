// Initial array of character
var people = ["Arya Stark", "Tyrion Lannister", "khaleesi", "Jon Snow", "Joffrey Baratheon", "The hound", "Sansa Stark", "Khal Drogo"];

// Function for displaying character data
function renderButtons() {

  // Deleting the character buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of characters
  for (var i = 0; i < people.length; i++) {

    // Then dynamicaly generating buttons for each character in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");

    // Adding a class
    a.addClass("peoples");
    // Adding a data-attribute with a value of the character at index i
    a.attr("data-name", people[i]);
    // Providing the button's text with a value of the character at index i
    a.text(people[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}
// This function handles events where one button is clicked
$("#add-people").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var peoples = $("#people-input").val().trim();
  // The character from the textbox is then added to our array
  people.push(peoples);

  // calling renderButtons which handles the processing of our character array
  renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of characters
renderButtons();


// GIF edits

// Adding click event listen listener to all buttons
$(document).on("click", '.peoples', function() {
  // Grabbing and storing the people property value from the button
  var peopleSearch = $(this).attr("data-name");
  // Constructing a queryURL using the animal name
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
    peopleSearch + "&api_key=dc6zaTOxFJmzC&limit=10";
  // Performing an AJAX request with the queryURL
  //example note
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .done(function(response) {
      console.log(queryURL);
      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;


      var resultsContainerSection = $("<section class='results-container'>");


      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        var singleResultDiv = $("<div class='result-container'>");

        // Creating and storing a div tag
        var peopleDiv = $("<div>");
        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);
        // Creating and storing an image tag
        

        var babeImg = $("<img class='result'>");
    		babeImg.attr("src", results[i].images.fixed_height_still.url);
    		babeImg.attr("data-state", "still");
    		babeImg.attr("data-still", results[i].images.fixed_height_still.url);
    		babeImg.attr("data-animate", results[i].images.fixed_height.url);

    		singleResultDiv.prepend(babeImg);
    		singleResultDiv.prepend(p);

    		resultsContainerSection.prepend(singleResultDiv);
    	}

    	$("#gifs-appear-here").prepend(resultsContainerSection);
    });
});

$(document).on("click", ".result", function() {
	var state = $(this).attr("data-state");

	if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});



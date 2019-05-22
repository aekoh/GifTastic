
// GIF edits


// Adding click event listen listener to all buttons
$(document).on("click", '.peoples', function() {
  // Grabbing and storing the people property value from the button
  var peopleSearch = $(this).attr("data-name");
  // Constructing a queryURL using the animal name

  // CORS
  var originalURL = 'https://api.giphy.com/v1/gifs/search?q=' +
  peopleSearch + "&api_key=dc6zaTOxFJmzC&limit=10";


  var queryURL = "https://cors-anywhere.herokuapp.com/" + originalURL;
  // Performing an AJAX request with the queryURL
  //example note
  $.ajax({
      url: queryURL,
      method: "GET",

      headers: {
        "x-requested-with": "xhr" 
      }
    })
    // After data comes back from the request
    .done(function(response) {
      console.log(queryURL);
      console.log('CORS anywhere response', response);

    

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





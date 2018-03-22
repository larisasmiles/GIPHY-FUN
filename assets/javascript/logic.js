// console.log("hi");


// load the page
$(document).ready(function(){
   

	// Variables
	let gifs = ["batman", "friends", "dancing", "girls", "cars", "football", "the office", "laughing", "sharks", "bloopers", "how i met your mother", "high five" ];
	
	// functions -----------------------------------
	// buttons for movies
	
	function gifButtons () {
			$("#gifButtons").empty();
			for (var i = 0; i < gifs.length; i++) {
					$("#gifButtons").append(`
							<button class="butt" data-button="${gifs[i]}">${gifs[i]}</button>   
							`);            
					$("#gifButtons").attr("giphy", gifs[i]);
					console.log(gifs[i]);
			}
	}
	
	gifButtons();
	// since we are dynamicaly generating buttons, this function needs to be binded to the document at all times as we are appending new buttons
	// on click function
	$(document).on("click", ".butt", ".rating", function(){
			let offset = Math.floor(Math.random() * 75);
			$("#gifShown").empty();
	let gifName = $(this).attr("data-button");
	let queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifs+"&api_key=Zl5hkR9niY178j8gYXFob9H5vkDvxGYN&q=&limit=25&offset=0&rating=G&lang=en";
			
	console.log(gifName);
	
	// ajax get method
			$.ajax({
					url: queryURL,
					method: "GET"
	}).done(function(response){
					let results = response.data;
	for (var i = 0; i < results.length; i++) {
				 let still = results[i].images.fixed_height_small_still.url;
				 let looping = results[i].images.original.url;
	// assigning state of image 
			let gifDiv = $("<div class='gifDisplay'>");
				let rating = $("<div>").html(results[i].rating);
				let giphyImage = $("<img>").attr("data-still", still);
				giphyImage.attr("data-animate", looping);
				giphyImage.attr("data-state", "still");
				giphyImage.attr("src", still);
				giphyImage.addClass("gif");
	gifDiv.append(giphyImage, rating);
	$("#gifShown").append(gifDiv);       
	}
	
			console.log(results[0]);
			});
	
	
	
	});
	
	// this function handles the switch still and animate gifs
	$(document).on("click", ".gif", function(event) {
			console.log("working");
	// grab value of the state of loaded image
	let state = $(this).attr('data-state');
			console.log(state);
	// evaluating if image is still or looping
			if (state === "still") {
					let newSrc = $(this).attr("data-animate");
					$(this).attr("src", newSrc);
					$(this).attr("data-state", "animate");
			} else {
					let newSrc = $(this).attr("data-still");
					$(this).attr("src", newSrc);
					$(this).attr("data-state", "still");
			}
	});
	
	// add new gif based on what is typed
	$("#gifSubmit").on("click", function(event) {
			event.preventDefault();
			let newButton = $("#newGifButtons").val();
			gifs.push(newButton);
			$('#newGifButtons').val("");     
		gifButtons();
	
	});
	
	
	}); 
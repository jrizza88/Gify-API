$(document).ready(function(){ 


var singerArray = ['Prince', 'Whitney Houston', 'Michael Jackson', 'Nas', 'James Brown', 'Beyonce']; 


  $(document).on('click', '.gifToggle', gifState);
  $(document).on('click', '.gif', whichGif);


    function appendNewButton(newGif){ 
        var createButton = $('<button>')
        createButton.attr('type', "button");
        createButton.addClass('btn btn-default');
        createButton.addClass('gif');
        createButton.attr('data-name', newGif);
        createButton.text(newGif);
        $('#buttonsView').append(createButton);
    };

    function renderButtons(){ 
      for (var i = 0; i < singerArray.length; i++){
        appendNewButton(singerArray[i])
        }
    };

function whichGif(){
  var gif = $(this).attr('data-name');
  displaySinger(gif,'still');
}

function displaySinger(gif, state){
        $('#gifDisplay').empty();
        // var singer = $(this).attr('data-name'); // here I create a variable to grab the "name" info from the html buttons tags
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10"; // searches singer / array of 10
        
    $.ajax({
            url: queryURL,
            method: 'GET'
    }).done(function(response) {
      console.log(response);
        var results = response.data;
          for (var i = 0; i <results.length; i++) {
                var singerDiv = $('<div>');
                var p = $('<p>').text("Rated: " + results[i].rating);
                var singerImage = $('<img>');
                var singerActive = results[i].images.fixed_height.url;
                var singerStill = results[i].images.fixed_height_still.url;
             // var singerState = results[i].images.fixed_height.url;
              
           if (state === 'animate') {
              singerImage.attr('src', singerActive);
              singerImage.attr('data-state', state);
           }   
           else {
             singerImage.attr('src', singerStill)
              singerImage.attr('data-state', state);
           }
              singerImage.attr('data-still', singerStill);
              singerImage.attr('data-animate', singerActive);
              singerImage.attr('class', 'singerImage');
              console.log('new button selected');
              singerImage.attr('id', i);
            singerImage.attr('src', singerActive);
              // singerImage.attr('data-state', 'still');
           // singerImage.attr('data-state', 'animate');
            //singerImage.attr('src', singerStill);
            //singerImage.attr('src', singerActive);
            
            
            singerDiv.addClass('gifToggle'); 

            singerDiv.append(p);
            singerDiv.append(singerImage);

            // $('#gifDisplay').prepend(singerDiv);
              $('#gifDisplay').append(singerDiv);
        }   
    });   
 }

    function gifState(){
    // var state = $(this).children('img')[0].attr('data-state'); 
    var state = $(this).attr('data-state'); 
    console.log(state);
    if (state == 'still'){
        // var currImg = $(this).children("img")[0];
        // console.log(currImg);
        // var anisrc = $(this).data('animate');
        //     $(currImg).attr('src', anisrc);
         $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
           console.log("changing to animate");
           console.log(state);
        }else{
        //       var currImg = $(this).children("img")[0];
        // console.log(currImg);
        // var stlsrc = $(this).data('still');
        //     $(currImg).attr('src', stlsrc);
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
                       console.log("changing to still");

            console.log(state);
        }

};
 
    renderButtons();

  $('#searchButton').on('click', function(){
    $('#gif-input').text('');
    $('#gifView').empty();

    var gifSearch = $('#gif-input').val().trim();
    singerArray.push(gifSearch);
    appendNewButton(gifSearch);
    

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
              url: queryURL,
              method: 'GET'
          }).done(function(response) {
            console.log(response);

            var results = response.data;

             $('#gifDisplay').empty();

            for (var i = 0; i <results.length; i++) {
            var singerDiv = $('<div>');
            var p = $('<p>').text("Rating: " + results[i].rating);
            var singerImage = $('<img>');
            var singerStill = results[i].images.fixed_height_still.url;
            var singerActive = results[i].images.fixed_height.url;
           
            singerDiv.addClass('gifToggle');
            singerImage.attr('data-still', singerStill);
            singerImage.attr('data-animate', singerActive);
            singerImage.attr('data-state', 'still');
            singerImage.attr('src', singerActive);

            // singerImage.attr('data-state', 'animate')
           // singerImage.attr('src', singerStill);
        

            singerDiv.append(p);
            singerDiv.append(singerImage);

            $('#gifDisplay').prepend(singerDiv);

              }

              if (results.length == 0) {
                $('#gifDisplay').text("Sorry, no gifs found")
             gifState();
              };
return false;
          });
        
    
    });



  // $(document).on('click', '.gifToggle', gifState);
  // $(document).on('click', '.gif', displaySinger);

  });





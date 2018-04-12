// Function to present the data on the html page
function createHTML(bookData) {
  var title = bookData.items[0].volumeInfo.title;
  var author = bookData.items[0].volumeInfo.authors[0];
  var description = bookData.items[0].volumeInfo.description;
  var image = bookData.items[0].volumeInfo.imageLinks.smallThumbnail;
  $('.book').append( '<h1>' + title + '</h1>' +
      '<p>' + description + '</p>' +
      '<h3>Written by:' + author + '</h3>' +
      '<img src="' + image + '">'
  );
}

// Ajax functiom to get the data from the google books API
var fetch = function(isbnNumber) {
  $.ajax({
    method: 'GET',
    url: isbnNumber,
    success: function(data) {
      createHTML(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

// EventHandler when the search button is clicked
$('.search-book').on('click', function() {
  var isbnNum = $('#isbn').val();
  var generalURL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
  var url = generalURL.concat(isbnNum);
  // get the data from the google API
  fetch(url);
});



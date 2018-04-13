// Function to present the data on the html page
function createHtml(bookData, status) {
  for (var i = 0; i < bookData.items.length; i += 1) {
    var title = bookData.items[i].volumeInfo.title;
    var author = bookData.items[i].volumeInfo.authors[0];
    var description = bookData.items[i].volumeInfo.description;
    var image = bookData.items[i].volumeInfo.imageLinks.smallThumbnail;
    if (status === 1) {
      $('.books').append('<div class="book">' + '<h1>' + title + '</h1>' +
      '<p>' + description + '</p>' +
      '<h3>Written by:' + author + '</h3>' +
      '<img src="' + image + '"></div>' );
    } else {
      $('.books').append('<div class="book-list">' + '<h5><a href="#">' + title + '</a></h5>' +
        '<span>Written by: ' + author + '</span></div>');
    }
  }
}

// Ajax function to get the data from the google books API
var fetch = function (searchURL, func, status) {
  $.ajax({
    method: 'GET',
    url: searchURL,
    success: function (data) {
      func(data, status);
      console.log(data);

    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

// EventHandler when the search button is clicked
$('.search-book').on('click', function () {
  // get the value of the inputs on the page
  var isbnNum = $('#isbn').val();
  var titleInput = $('#title').val();
  var authorInput = $('#author').val();
  // declare some variables
  var url, generalURL;
  var status = 0;

  if (isbnNum !== '') {
    generalURL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
    url = generalURL.concat(isbnNum);
    status = 1;
    fetch(url, createHtml, status);
  } else if (titleInput !== '') {
    generalURL = 'https://www.googleapis.com/books/v1/volumes?q=intitle:';
    url = generalURL.concat(titleInput);
    fetch(url, createHtml, status);
  } else if (authorInput !== '') {
    generalURL = 'https://www.googleapis.com/books/v1/volumes?q=inauthor:';
    url = generalURL.concat(authorInput);
    fetch(url, createHtml, status);
  }
});

// EventHandler when a title book is clicked
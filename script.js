// Function to present the data on the html page
function createHtml(bookData) {
  var output;

  if (bookData.items !== undefined) {
    output = '';
    for (var i = 0; i < bookData.items.length; i += 1) {
      var title = bookData.items[i].volumeInfo.title;
      if (bookData.items[i].volumeInfo.authors !== undefined) {
        var author = bookData.items[i].volumeInfo.authors[0];
      } else {
        author = 'No author';
      }
      if (bookData.items[i].volumeInfo.description !== undefined) {
        var description = bookData.items[i].volumeInfo.description;
      } else {
        description = 'No Description';
      }
      if (bookData.items[i].volumeInfo.imageLinks !== undefined) {
        var image = bookData.items[i].volumeInfo.imageLinks.thumbnail;
      } else {
        image = 'sorry-image.jpg';
      }
      output += '<div class="book">' + '<h1>' + title + '</h1>' +
        '<p>' + description + '</p>' + '<h3>Written by: ' + author + '</h3>' +
        '<img src="' + image + '" width="150" height="200"></div>';
      output += '<div class="book-listItem">' + '<h5><a href="#">' + title + '</a></h5>' +
        '<span>Written by: ' + author + '</span></div>';
    }

    $('.books').append(output);
    if (bookData.items.length === 1) {
      $('.book-listItem').hide();
    } else {
      $('.book').hide();
    }
  } else {
    $('.books').append('<h4 class="no-result">No book was found. Try another search!</h4>');
  }
}

// Ajax function to get the data from the google books API
var fetch = function (searchURL, func) {
  $.ajax({
    method: 'GET',
    url: searchURL,
    success: function (data) {
      console.log(data);
      func(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

// EventHandler when the search button is clicked
$('.search-book').on('click', function () {
  // Empty the search section first
  $('.books').empty();
  // get the value of the inputs on the page
  var isbnNum = $('#isbn').val();
  var titleInput = $('#title').val();
  var authorInput = $('#author').val();
  var url;
  // If all inputs are empty
  if (isbnNum === '' && titleInput === '' && authorInput === '') {
    $('.books').append('<h4 class="no-result">You need to choose one of the search options!</h4>');
    return;
  }
  // Check which option was filled for the book search
  if (isbnNum !== '') {
    url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnNum}`;
  } else if (titleInput !== '') {
    url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${titleInput}`;
  } else if (authorInput !== '') {
    url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorInput}`;
  }
  fetch(url, createHtml);
});

// EventHandler when a title book is clicked
$('.books').on('click', 'a', function () {
  $(this).closest('.book-listItem').prev().show();
  $('.book-listItem').hide();
});

// Event for showing the loading image when waiting for ajax response
$(document).ajaxSend(function() {
  $('#ajax-loader').show();
});

$(document).ajaxComplete(function() {
  $('#ajax-loader').hide();
});
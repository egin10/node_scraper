//Listen for form Submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save Bookmark
function saveBookmark(e) {
  //Get Form Values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  /*
  //Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  //Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    //Init array
    var bookmarks = [];
    //Add to array
    bookmarks.push(bookmark);
    //Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Add bookmark to array
    bookmarks.push(bookmark);
    //Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  //Re-fetch Bookmark
  fetchBookmarks();

  //Clear form
  document.getElementById('myForm').reset();

  //Prevent Form From Submitting
  e.preventDefault();
}

//Delete Bookmark
const deleteBookmark = (url) => {
  //Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Loop throught bookmarks
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      //Remove from array
      bookmarks.splice(i, 1);
    }
  }
  //Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //Re-fetch Bookmark
  fetchBookmarks();
};


//Fetch bookmarks
const fetchBookmarks = () => {
  //Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Get Output id
  var bookmarksResults = document.getElementById('bookmarksResults');
  //Build Output
  bookmarksResults.innerHTML = '';

  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += `<div class="well">
                                  <h3> ${name}
                                  <a class="btn btn-default" target="_blank" href="${url}">Visit</a>
                                  <a onclick="deleteBookmark(\'${url}\');" class="btn btn-danger" href="#">Delete</a>
                                  <h3>
                                  </div>`;
  }
};

//Validate Form Input
const validateForm = (siteName, siteUrl) => {
  //Validation parsing data
  if(!siteName || !siteUrl){
    alert(`Please fill Site Name and Site Url in the form`);
    return false;
  }

  //Regular Expression to match an email
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  //Check if siteUrl not matching an email
  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
};

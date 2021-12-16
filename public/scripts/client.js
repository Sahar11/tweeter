// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

   
$(document).ready(function () {
  var $tweetContainer = $(".tweets");

  function createTweetElement(tweet) {
    var html = `
    <article class="tweet-container">
      <header>
      <div>
        <img class="logo" src="${tweet.user.avatars}">
        <span class="full-name">${escape(tweet.user.name)}</span>
        </div>
        <div>
        <h4 class="user-handle">${escape(tweet.user.handle)}</h4>
        </div>
      </header>
        <p class="tweet">${escape(tweet.content.text)}</p>
        <hr> 
      <footer>
      <span class="timeago">${timeago.format(tweet.created_at)}</span>
     <span class="icons"> <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
       </span>
      </footer>
    </article>
    `
    return html;
  }

  function renderTweets(tweets) {
    $tweetContainer.empty();
    for (var ii = 0; ii < tweets.length; ii++) {
      let tweet = tweets[ii];
      $tweetContainer.prepend(createTweetElement(tweet));
    }
  }

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: renderTweets
    });
  }

  loadTweets();

  function createNewTweet(data) {
    $.ajax({
      url: "/tweets",
      data: data,
      method: "POST",
      success: function(data) {
        loadTweets();
        $("textarea").val('');
        $(".counter").text("140");
      }
    });
  }//

  function escape(str) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
  }
// form validation
  $("form").on("submit", function(evt) {
    evt.preventDefault();
    let content = $("textarea").val();
    if (content.length === 0) {
      $("#empty-tweet").slideDown("fast");
    } else if (content.length > 140) {   
      $("#excessive-tweet").slideDown("fast");
    } else {
      var formStuff = $(this).serialize();
      createNewTweet(formStuff);
    }
  });

  $("button").click(function(){
    $(".new-tweet").slideToggle();
    $("textarea").focus();
  });
});

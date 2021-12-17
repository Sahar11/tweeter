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
     <span class="icons"> <i class="fas color fa-flag"></i>
      <i class="fas color fa-retweet"></i>
      <i class="fas color fa-heart"></i>
       </span>
      </footer>
    </article>
    `
    return html;
  }

  function renderTweets(tweets) {
    $tweetContainer.empty();
    for (var i = 0; i < tweets.length; i++) {
      let tweet = tweets[i];
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
      success: function (data) {
        loadTweets();
        $("textarea").val('');
        $(".counter").text("140");
      }
    });
  }

  function escape(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  // form validation
  $("form").on("submit", function (event) {
    event.preventDefault();
    let content = $("textarea").val();

    if (!$('textarea', this).val()) {
      $(".error").slideDown("slow");
      $('#error-message').text('Error : Empty input');
      // $(".error").slideUp("slow");
    };

    if ($('textarea', this).val().length > 140) {
      $(".error").slideDown("slow");
      $('#error-message').text('Error : Too many characters');
      // $(".error").slideUp("slow");

    }
    if (($('textarea', this).val()) && ($('textarea', this).val().length < 140)) {
      $(".error").slideUp("slow");
      var formStuff = $(this).serialize();
      createNewTweet(formStuff);
    }
  });

  $("button").click(function () {
    // $(".new-tweet").slideToggle();
    $("textarea").focus();
  });
});

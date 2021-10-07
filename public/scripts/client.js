/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  // hide error
  const errorElement = $('.form-error');
  errorElement.hide()

  //Load tweets
  loadTweets();

  //Posts tweets
  const form = $('#tweet-form')
  form.on('submit', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    if (validateForm(serializedData)) {
      $.post('/tweets', serializedData)
        .done(() => {
          loadTweets();
        }) 
        .fail((error) => {
          console.log("messed up because:", error);
        }) 
    }
  })
  
  //Form visibility
  const arrow = $('.arrow')
  const icon = $('.icon')
  const up = "fa-angle-double-up"
  const down = "fa-angle-double-down"
  arrow.on('click', function() {
    if(form.is(":visible")) {
      form.slideUp();
      icon.addClass(up);
      icon.removeClass(down);
    } else {
      form.slideDown();
      icon.addClass(down);
      icon.removeClass(up);
      $('#tweet-text').focus()
    }
  })
});

const validateForm = (tweetData) => {
  const counter = Number($('.counter').val());
  const errorElement = $('.form-error')
  const errorRead = $('.error-message')
  
  if (errorElement.is(":visible")) {
    errorElement.slideUp()
  }
  if(counter === 140) {
    let errorMessage = "Tweet field is required";
    setTimeout(() => {
      errorRead.text(errorMessage);
      errorElement.slideDown('slow');
    }, 300)
    return false;
  }
  if(counter < 0) {
    let errorMessage = "Exceeding max character count (140)";
    setTimeout(() => {
      errorRead.text(errorMessage);
      errorElement.slideDown('slow');
    }, 300)
    return false;
  }
  return true;
};

const loadTweets = () => {
  $.get('/tweets')
    .done((response) => {
      renderTweets(response);
    })
    .fail((error) => {
      console.log("Something's wrong:", error);
    })
}

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const $newTweet = createTweetElement(tweet);
    $('#tweets-container').prepend($newTweet);
  }
};

const createTweetElement = (tweet) => {
  // tweet header
  const $header = $('<header>')
  const $profilePicture = $('<div class="profile-picture">')
  const $avatar = $(`<img src=${tweet.user.avatars} alt="profile">`);
  const $name = $('<span>').text(tweet.user.name);
  $profilePicture.append($avatar, $name);
  $header.append($profilePicture);

  const $handle = $('<div class="handle">');
  const $handleText = $('<p>').text(tweet.user.handle);
  $handle.append($handleText)
  $header.append($handle);

  // tweet body
  const $tweetContnet = $('<div class= "tweet-content">')
  const $content = $('<p>').text(tweet.content.text);
  const $line = $('<hr>');
  $tweetContnet.append($content, $line);

  // tweet footer
  const $footer = $('<footer>');
  const $date = $('<div class="date">');
  const $day = $('<span>').text(timeago.format(tweet.created_at));
  $date.append($day);
  $footer.append($date);

  const $reactions = $('<div class="reactions">')
  const $flag = $('<i class="fas fa-flag"></i>')
  const $retweet = $('<i class="fas fa-retweet"></i>')
  const $heart = $('<i class="fas fa-heart"></i>')
  $reactions.append($flag, $retweet, $heart);
  $footer.append($reactions);

  // tweet
  const $tweet = $(`<article class="tweet">`);
  $tweet.append($header, $tweetContnet, $footer);
  return $tweet;
};



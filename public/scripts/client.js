/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  //Posts tweets
  const form = $('#tweet-form')
  form.on('submit', function(event) {
    event.preventDefault();
    console.log('form was submitted');
    const serliazedData = $(this).serialize();
    $.post('/tweets', serliazedData)
      .done(() => {
        console.log('success');
        console.log(serliazedData);

      }) 
      .fail(() => {
        console.log("messed up");
      }) 
  })
  renderTweets(data);
});

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const $newTweet = createTweetElement(tweet);
    $('#tweets-container').append($newTweet);
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



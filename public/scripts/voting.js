// const { createVoter } = require("../../routes/database");

new Sortable(options, {
  animation: 500
});

$(() => {
  const $pollSubmit = $('#poll-submit');
  const $optionOrder = $('#options');
  const $poll = $('#poll');
  const $voterName = $('#voter-name');
  const $nameSubmit = $('#name-submit');
  const $options = $('#options');
  const $listItem = $('#list-group-item');

  $poll.hide();

  $voterName.on('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const serializedData = $voterName.serialize();
    $.post('/polling/voter', serializedData)
      .then(() => {
        $voterName.slideUp();
        $poll.slideDown();
        // const $list = $options.find('li');
        // for(let i = 0; i < $list.length; i++) {
        //   console.log($list[i].id);
        // }

      });
  });

  $poll.on('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const $list = $options.find('li');
    const $optionID = [];
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    for(let i = 0; i < $list.length; i++) {
      $optionID.push($list[i].id);
    }
    const serializedData = encodeURIComponent($optionID);
    console.log('optionsIDSerialized', serializedData);
    console.log($optionID)
    $.post(`/polling/${id}`, {optionsArr : $optionID})
      .then(() => {
        $poll.slideUp();

      });
  });

});


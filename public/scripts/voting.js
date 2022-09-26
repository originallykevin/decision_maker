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
        const $list = $options.find('li');
        for(let i = 0; i < $list.length; i++) {
          console.log($list[i].id);
        }

      });
  });

  $poll.on('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const $list = $options.find('li');
    for(let i = 0; i < $list.length; i++) {
      console.log($list[i].id);
    }
    // $.post('/:id', serializedData)
    //   .then(() => {
    //     $poll.slideUp();

    //   });
  });

});


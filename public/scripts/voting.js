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
        console.log($options.find('li')[0].id);
      });
  });

  $poll.on('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();
    // $(function() {
    //   ('#options').sortable();
    // });

    $.post('/:id', serializedData)
      .then(() => {
        $poll.slideUp();

      });
  });

});


// function submit() {
//   let indexOrder = $('#options').sortable('toArray');
//   alert(indexOrder);
// }


//allows our list of voting option to be draggable
new Sortable(options, {
  animation: 500
});

$(() => {
  const $pollSubmit = $('#poll-submit'); //?
  const $optionOrder = $('#options'); //?
  const $poll = $('#poll');
  const $voterName = $('#voter-name');
  const $nameSubmit = $('#name-submit'); //?
  const $options = $('#options');
  const $listItem = $('#list-group-item'); //?
  const $finishVote = $('#finish-vote');


  $poll.hide(); //hides voting options before voter has entered their name
  $finishVote.hide();


  //on submission of voter name
  $voterName.on('submit', (event) => {
    let x = document.getElementById("voter-name").value;
    if (x === '') {
      alert('please input name');
      return false;
    }
    event.preventDefault();
    event.stopPropagation();
    const serializedData = $voterName.serialize();

    //sending post request with voters given name to then create voter in db
    $.post('/polling/voter', serializedData)
      .then(() => {
        $voterName.slideUp();
        $poll.slideDown();
      });
  });

  //on submission of poll
  $poll.on('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    //grabbing current url substring /polling/{this}
    const url = window.location.href;
    const urlID = url.substring(url.lastIndexOf('/') + 1);
    const serializedData = $voterName.serialize();

    //creating the submitted list of voting options and their ranked position
    const $optionID = [];
    const $list = $options.find('li'); //finds the list of voting options based on html selector
    for (let i = 0; i < $list.length; i++) {
      $optionID.push($list[i].id); //pushing into an array so we can send voting options in a post request
    }

    //post request sending voting options
    $.post(`/polling/${urlID}`, { optionsArr: $optionID })
      .then(() => {
        $poll.slideUp();
        getNameFromSubmit(serializedData);
        $finishVote.slideDown();
      });

    // grab voter name and display message with name
    const getNameFromSubmit = function(data) {
      const nameSubmitted = data.slice(5).replaceAll('%20', ' ');
      $finishVote.append(`Thank you for voting ${nameSubmitted}!`);
    };
  });
});


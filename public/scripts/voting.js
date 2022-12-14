//allows our list of voting option to be draggable
new Sortable(options, {
  animation: 500
});

$(() => {

  const $poll = $('#poll');
  const $voterName = $('#voter-name');
  const $options = $('#options');
  const $finishVote = $('#finish-vote');
  const $nameError = $('#name-error');
  const $navMessage = $('#nav-message');

  $poll.hide(); //hides voting options before voter has entered their name
  $finishVote.hide();

  //on submission of voter name
  $voterName.on('submit', (event) => {

    //alert if no name is entered
    let x = document.getElementById("valid-name").value;
    if (x === '') {
      $nameError.hide();
      $nameError.append(`<span id="nameError" class="alert"><i class="triangle fa-solid fa-triangle-exclamation"></i>Please enter your name</span>`);
      $nameError.slideDown('slow');
      setTimeout(() => { $('.alert').slideUp(); }, 1500);
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

  // nav-bar create a poll
  $navMessage.on('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.location.replace('/');
  });
});


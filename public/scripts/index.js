$(() => {
  const $form = $('#form');
  const $email = $('#email');
  const $addOption = $('#addOption');
  const $removeOption = $('#removeOption');
  const $options = $('#options');
  const $linkAdmin = $('#link-admin');
  const $linkVoter = $('#link-voter');
  const $adminCopy = $('#adminCopy');
  const $voterCopy = $('#voterCopy');
  const $linkMessage = $('#linkMessage');
  const $optionForm = $('#optionForm');
  const $emailSubmit = $('#email-submit');

  $optionForm.hide(); //hides poll creation form
  $linkMessage.hide(); //hides final message elements

  $emailSubmit.on('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    $email.slideUp(); //hides email submission after email has been entered
    $optionForm.slideDown(); //proceeds to show poll creation form
  });

  $form.on('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const serializedData = $form.serialize();

    //poll form submission post request creates poll in db
    $.post('/form', serializedData)
      .then((response) => {
        createLinkElement(response); //appends url links as elements onto html for final message
        $optionForm.slideUp(); //hides poll form
        $linkMessage.slideDown(); //reveals final message
      });
  });

  //add voting option to poll form
  $addOption.on('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const $option = $('.option');

    //limits the voting options to 10
    if ($option.length < 10) {
      $options.append(`<input class="form-control option" name="option" type="text" placeholder="Choice" aria-label="default input example">`);
    }
  });

  //removes voting option from poll form
  $removeOption.on('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const $option = $('.option'); //why does this only work in this eventlistener?

    //doesn't allow less than two poll options
    if ($option.length > 2) {
      $option.last().remove();
    };
  });


  //appends url links as elements onto html for final message
  const createLinkElement = function(data) {
    console.log('createLink');
    const resultLink = data.url_admin;
    const pollLink = data.url_voter;
    $linkAdmin.append(`<a href="${resultLink}" style="text-decoration: none" >Admin Link</a>`);
    $adminCopy.append(`<a id="adminCopy" data-toggle="tooltip" title="Copy to Clipboard" href="${resultLink}"><i class="fa-regular fa-clipboard"></i></a>`);
    $linkVoter.append(`<a href="${pollLink}">Voter Link</a>`);
    $voterCopy.append(`<a id="voterCopy" data-toggle="tooltip" title="Copy to Clipboard" href="${pollLink}"><i class="fa-regular fa-clipboard"></i></a>`);

    $adminCopy.on('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const copyText = resultLink;
      document.addEventListener('copy', (event) => {
        event.clipboardData.setData('text/plain', copyText);
        event.preventDefault();
        event.stopPropagation();
      }, true);

      document.execCommand('copy');
      console.log('copied text : ', copyText);
      alert('Your admin link: ' + copyText);
    });

    $voterCopy.on('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const copyText = pollLink;
      document.addEventListener('copy', (event) => {
        event.clipboardData.setData('text/plain', copyText);
        event.preventDefault();
        event.stopPropagation();
      }, true);

      document.execCommand('copy');
      console.log('copied text : ', copyText);
      alert('Your voter link: ' + copyText);
    });

  };
});

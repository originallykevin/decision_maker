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
  const $emailError = $('#email-error');
  const $navMessage = $('#nav-message');

  $optionForm.hide(); //hides poll creation form
  $linkMessage.hide(); //hides final message elements

  $emailSubmit.on('click', (event) => {

    //adding alert fields for empty email field
    let x = document.getElementById("exampleFormControlInput1").value;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (x === '') {
      $emailError.hide()
      $emailError.append(`<div id="alert" class="alert" style="padding-top: 8px;"><i class="fa-solid fa-triangle-exclamation"></i> Please enter your email</div>`);
      $emailError.slideDown('slow');
      setTimeout(() => { $('.alert').slideUp(); }, 1500);
      return false;
    } else if (!emailReg.test(x)) {
      $emailError.hide()
      $emailError.append(`<div id="alert" class="alert" style="padding-top: 8ems"><i class="fa-solid fa-triangle-exclamation"></i> Please enter a valid email</div>`);
      $emailError.slideDown('slow');
      setTimeout(() => { $('.alert').slideUp(); }, 1500);
      return false;
    }

    event.preventDefault();
    event.stopPropagation();
    $email.slideUp(); //hides email submission after email has been entered
    $optionForm.slideDown(); //proceeds to show poll creation form
  });

  $form.on('submit', (event) => {

    //adding alert field for empty question field
    let x = document.getElementById("question").value;
      const $questionError = $('#question-error')
      if (x === '') {
        $questionError.hide()
        $questionError.append(`<div id="alert" class="alert"><i class="fa-solid fa-triangle-exclamation"></i> Please enter a question</div>`);
        $questionError.slideDown('slow');
        setTimeout(() => { $('.alert').slideUp(); }, 1500);
        return false;
      }

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
    const $option = $('.option');

    //doesn't allow less than two poll options
    if ($option.length > 2) {
      $option.last().remove();
    };
  });

  //appends url links as elements onto html for final message
  const createLinkElement = function(data) {
    const resultLink = data.url_admin;
    const pollLink = data.url_voter;
    $linkAdmin.append(`<a href="${resultLink}" id='admin-link' style="text-decoration: none" >Admin Link</a>`);
    $adminCopy.append(`<a id="adminCopy" data-toggle="tooltip" title="Copy to Clipboard" href="${resultLink}"><i class="fa-regular fa-clipboard" style="font-size: 30px;padding-right: 3px;"></i></a>`);
    $linkVoter.append(`<a href="${pollLink}" id='vote-link' style="text-decoration: none" >Voter Link</a>`);
    $voterCopy.append(`<a id="voterCopy" data-toggle="tooltip" title="Copy to Clipboard" href="${pollLink}"><i class="fa-regular fa-clipboard" style="font-size: 30px;padding-right: 3px;"></i></a>`);

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
      const element1 = document.getElementById('admin-link');
      element1.remove();// nav-bar create a poll
      $linkAdmin.append(`<span id="admin-copy"> Link Copied!</span>`);
      const element2 = document.getElementById('admin-copy');
      setTimeout(() => {
        element2.remove();
        $linkAdmin.append(`<a href="${resultLink}" id='admin-link'style="text-decoration: none" >Admin Link</a>`);
      }, 2000);
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
      const element1 = document.getElementById('vote-link');
      element1.remove();
      $linkVoter.append(`<span id="vote-copy"> Link Copied!</span>`);
      const element2 = document.getElementById('vote-copy');
      setTimeout(() => {
        element2.remove();
        $linkVoter.append(`<a href="${pollLink}" id='vote-link' style="text-decoration: none" >Voter Link</a>`);
      }, 2000);
    });
  };

  // nav-bar create a poll
  $navMessage.on('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.location.replace('/')
  })
});


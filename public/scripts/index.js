// Client facing scripts here
$(() => {
  const $form = $('#form');
  const $email = $('#email');
  const $addOption = $('#addOption');
  const $removeOption = $('#removeOption');
  const $options = $('#options');
  const $links = $('#links');
  const $linkMessage = $('#linkMessage');
  const $optionForm = $('#optionForm');
  const $emailSubmit = $('#email-submit');

  $optionForm.hide();
  $linkMessage.hide();

  $emailSubmit.on('click', (event) => {
    // const serializedEmailData = $email.serialize();
    event.preventDefault();
    event.stopPropagation();
    // console.log(serializedEmailData);
    // $.post('/email', serializedEmailData)
    // .then(() => {
    //     $email.slideUp();
    //     $form.slideDown();
    //   });
      $email.slideUp();
      $optionForm.slideDown();
  });

  $form.on('submit', (event) => {
    const serializedFormData = $form.serialize();
    event.preventDefault();
    event.stopPropagation();
    console.log(serializedFormData);
    $.post('/form', serializedFormData)
      .then(() => {
        $.get('/polling/:id')
          .then((data) => {
            createLinkElement(data);
            $optionForm.slideUp();
            $linkMessage.slideDown();
        });
      });
  });

  $addOption.on('click', (event) => {
    const $option = $('.option');
    event.preventDefault();
    event.stopPropagation();
    if($option.length < 10) {
      $options.append(`<input class="form-control option" name="option" type="text" placeholder="Default input" aria-label="default input example">`);
    }
  })

  $removeOption.on('click', (event) => {
    const $option = $('.option'); //why does this only work in this eventlistener?
    event.preventDefault();
    event.stopPropagation();
    if($option.length > 2) {
      $option.last().remove();
    };
  })

  // links to the polls that are created
  const createLinkElement = function(data) {
    console.log('createLink');
    const resultLink = data.resultLink;
    const pollLink = data.pollLink;
    $links.append(`<a href="${resultLink}">Admin Link</a> <a href="${pollLink}">Voter Link</a>`);

  }
});

  // $email.on('submit', (event) => {
  //   event.preventDefault();
  //   console.log("Before ajax");
  //   $.ajax({
  //     method: 'POST',
  //     url: '/email',
  //     data: serializedData,
  //   })
  //     .then(() => {
  //       $email.slideUp();
  //       $form.slideDown();
  //     })
  // });

    // .done((response) => {
    //   const $usersList = $('#users');
    //   $usersList.empty();

    //   for(const user of response.users) {
    //     $(`<li class="user">`).text(user.name).appendTo($usersList);
    //   }
    // });

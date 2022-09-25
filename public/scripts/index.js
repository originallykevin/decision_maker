// Client facing scripts here
$(() => {
  const $form = $('#form');
  const $email = $('#email');
  const $addOption = $('#addOption');
  const $removeOption = $('#removeOption');
  const $options = $('#options');

  $form.hide();

  $email.on('submit', (event) => {
    const serializedEmailData = $email.serialize();
    event.preventDefault();
    event.stopPropagation();
    console.log(serializedEmailData);
    $.post('/email', serializedEmailData)
    .then(() => {
        $email.slideUp();
        $form.slideDown();
      });
  });

  $form.on('submit', (event) => {
    const serializedFormData = $form.serialize();
    event.preventDefault();
    event.stopPropagation();
    console.log(serializedFormData);
    $.post('/form', serializedFormData)
      .then(() => {
        $form.slideUp();
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

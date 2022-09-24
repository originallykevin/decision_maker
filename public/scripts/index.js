// Client facing scripts here
$(() => {

  const $form = $('#form');
  const $email = $('#email');
  const serializedData = $('#email').serialize();

  $form.hide();

  $('#email').on('submit', (event) => {
    event.preventDefault();
    console.log("Before ajax");
    $.ajax({
      method: 'POST',
      url: '/email',
      data: serializedData,
    })
      .then(() => {

        $email.slideUp();
        $form.slideDown();

      })
  });
});




    // .done((response) => {
    //   const $usersList = $('#users');
    //   $usersList.empty();

    //   for(const user of response.users) {
    //     $(`<li class="user">`).text(user.name).appendTo($usersList);
    //   }
    // });

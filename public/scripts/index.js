// Client facing scripts here
$(() => {

  const serializedData = $('#email').serialize();
    $('#email').on('submit', (event) => {
      event.preventDefault();
      console.log("Before ajax");
      $.ajax({
        method: 'POST',
        url: '/polling/:id',
        data: serializedData,
      })
        .then(() => {
          $.ajax({
            type: 'GET',
            url: '/polling/:id',
            success: (data) => {
              console.log("data");
            }
          })
        })
      // .done((response) => {
      //   const $usersList = $('#users');
      //   $usersList.empty();

      //   for(const user of response.users) {
      //     $(`<li class="user">`).text(user.name).appendTo($usersList);
      //   }
      // });
    });
  });

  // $('#email').on('submit', (event) => {
  //   event.preventDefault();
  //   console.log('before post');
  //   // $.post('/polling/:id', serializedData, (res) => {
  //   //   console.log('Working!', res);
  //   // });
  //   const serializedData = $('#email').serialize();
  //   $.post('/polling/:id', serializedData)
  //     .then(() => {
  //       console.log('Working!');
  //     })
  //     .then(
  //       $.get('/polling/:id', (data) => {
  //         console.log(data);
  //       })
  //     )
  // })

// });

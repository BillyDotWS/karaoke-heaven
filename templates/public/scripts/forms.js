function testclone() {
  swal.mixin({
    confirmButtonText: 'Next &rarr;',
    showCancelButton: true,
    progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Question 1',
        text: 'Chaining swal2 modals is easy',
        input: 'text'
      },
      'Question 2',
      'Question 3'
    ]).then((result) => {
    if (result.value) {
      const answers = JSON.stringify(result.value)
      Swal.fire({
        title: 'All done!',
          html: `
            Your answers:
            <pre><code>${answers}</code></pre>
      `   ,
        confirmButtonText: 'Lovely!'
    })
  })
}

function complex () {
  swal.withForm({
    title: 'More complex Swal-Forms example',
    text: 'This has different types of inputs',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Get form data!',
    closeOnConfirm: true,
    formFields: [
      { id: 'name', placeholder: 'Name Field' },
      { id: 'nickname', placeholder: 'Add a cool nickname' },
      { id: 'password', type: 'password' },

      { name: 'sex', value: 'Male', type: 'radio' },
      { name: 'sex', value: 'Female', type: 'radio' },

      { name: 'skills', value: 'JS', type: 'checkbox' },
      { name: 'skills', value: 'Ruby', type: 'checkbox' },
      { name: 'skills', value: 'Java', type: 'checkbox' },

      { id: 'select',
        type: 'select',
        options: [
          {value: 'test1', text: 'test1'},
          {value: 'test2', text: 'test2'},
          {value: 'test3', text: 'test3'},
          {value: 'test4', text: 'test4'},
          {value: 'test5', text: 'test5'}
        ]}
    ]
  }, function (isConfirm) {
    // do whatever you want with the form data
    console.log(this.swalForm) // { name: 'user name', nickname: 'what the user sends' }
  })
}

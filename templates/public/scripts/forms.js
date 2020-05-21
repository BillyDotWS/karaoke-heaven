window.onload = function () {
  document.querySelector('#complex').addEventListener('click', complex)
}

function sample1 () {
  swal.withFormAsync({
    title: 'Cool Swal-Forms example',
    text: 'Any text that you consider useful for the form',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Get form data!',
    closeOnConfirm: true,
    formFields: [
      { id: 'name', placeholder: 'Name Field', required: true },
      { id: 'nickname', placeholder: 'Add a cool nickname' }
    ]
  }, function (isConfirm) {
    // do whatever you want with the form data
    console.log(this.swalForm) // { name: 'user name', nickname: 'what the user sends' }
  })
}

function sampleWithPromises () {
  swal.withFormAsync({
    title: 'Cool Swal-Forms example',
    text: 'Any text that you consider useful for the form',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Get form data!',
    closeOnConfirm: true,
    formFields: [
      { id: 'name', placeholder: 'Name Field' },
      { id: 'nickname', placeholder: 'Add a cool nickname' }
    ]
  }).then(function (context) {
    console.log(context._isConfirm)
    // do whatever you want with the form data
    console.log(context.swalForm) // { name: 'user name', nickname: 'what the user sends' }
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
      { id: 'hosts', placeholder: 'CookieBilly#1234' },
      { id: 'name', placeholder: 'Event Name' },
      { id: 'nickname', placeholder: 'Event Description' },
      { id: 'theme', placeholder: 'Event theme' },

      { name: 'eventdate', placeholder: 'Event Date', type: 'date' },
      { name: 'eventtime', value: '00:00', type: 'text' },

      { id: 'maxparticipants', placeholder: 'Maximum Participants' },
      { id: 'maxparticipants', placeholder: 'Maximum Participants' }

    ]
  }, function (isConfirm) {
    // do whatever you want with the form data
    console.log(this.swalForm) // { name: 'user name', nickname: 'what the user sends' }
  })
}

function lotsOfFields () {
  swal.withForm({
    title: 'Cool Swal-Forms example',
    text: 'Any text that you consider useful for the form',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Get form data!',
    closeOnConfirm: true,
    formFields: [
      { id: 'name', placeholder: 'Name Field' },
      { id: 'nickname0', placeholder: 'Add a cool nickname' },
      { id: 'nickname1', placeholder: 'Add a cool nickname' },
      { id: 'nickname2', placeholder: 'Add a cool nickname' },
      { id: 'nickname3', placeholder: 'Add a cool nickname' },
      { id: 'nickname4', placeholder: 'Add a cool nickname' },
      { id: 'nickname5', placeholder: 'Add a cool nickname' },
      { id: 'nickname6', placeholder: 'Add a cool nickname' },
      { id: 'nickname7', placeholder: 'Add a cool nickname' },
      { id: 'nickname8', placeholder: 'Add a cool nickname' },
      { id: 'nickname9', placeholder: 'Add a cool nickname' },
      { id: 'nickname10', placeholder: 'Add a cool nickname' }
    ]
  }, function (isConfirm) {
    // do whatever you want with the form data
    console.log(this.swalForm)
  })
}

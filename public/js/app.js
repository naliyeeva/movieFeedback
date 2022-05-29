$('.numbers-button').click(function () {
    $('.numbers-button').removeClass('active')
    $(this).addClass('active')
})


$(document).ready(function () {

  $("#submit-feedback").click(function() {
    checkForInputs();
  });

});

function checkForInputs() {
  let hasEmptyInput = false;

  let email = $('#email').val().trim();
  let feedback_text = $('#feedback_text').val().trim();
  let rate = $(".numbers-button.active").attr('value');
  

  $("#get-feedback input").each(function () {
    if ($(this).val().trim() === '') {
        hasEmptyInput = true;
    }
    if (email === '' || feedback_text === '') {
        hasEmptyInput = true;
    }
  });

  if (hasEmptyInput) {
    Swal.fire({
    title: 'Please, fill in the form',
    icon: 'warning',
    confirmButtonText: 'Close'
    })
  }

  else {

    // Swal.fire({
    //   title: 'Thank you!',
    //   icon: 'success',
    //   confirmButtonText: 'Close'
    // })  

    // return false 
    
    axios.post('/getFeedback', {
      rate: rate,
      email: email,
      feedback_text: feedback_text
    })
    .then(function (response) {
      if (response.data.status === 1) {
        Swal.fire({
          title: 'Thank you!',
          icon: 'success',
          confirmButtonText: 'Close'
        })  
      }
    })
    .catch(function (error) {
        console.log(error);
    })
  }
}

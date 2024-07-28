const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}
$(document).ready(function () {
    // $('.materialboxed').materialbox();
    $('#clickMeButton').click(() => {
        clickMe();
    })
});

$(document).ready(function () {
    $('#getResult').click(() => {
        
        var first_num = $('#first_num').val();
        var second_num = $('#second_num').val();

        $.ajax({
            type: 'GET',
            url: `/addTwoNumber?n1=${first_num}&n2=${second_num}`,
            success: function (data, status, xhr) {
                $("#displaySection").text(`Your Answer is - ${data.data}`);

                $('#first_num').val("");
                $('#second_num').val("");
            }
          });

    })
});
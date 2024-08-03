function clearForm() {
    $('#pet-name').val("");
    $('#pet-type').val("");
    $('#pet-age').val("");
    $('#pet-owner-name').val("");
    $('#location').val("");
    $('#pet-image').val("");
}

function saveFormData() {

    var pet_name = $('#pet-name').val();
    var pet_type = $('#pet-type').val();
    var pet_age = $('#pet-age').val();
    var pet_owner_name = $('#pet-owner-name').val();
    var location = $('#location').val();
    var pet_image = $('#pet-image').val();

    if (pet_name === "" || pet_type === "" ||  pet_age === "" || 
        pet_owner_name === "" || location === "" || pet_image === ""
    ) {

        $('#error-msg').text(`Some fields not filed. Please fill missing fields.`);
        setTimeout(function() {
            $('#error-msg').text(``)
        }, 5000);

    } else {

        let data = {
            petName: pet_name,
            petType: pet_type,
            petAge: pet_age,
            petOwnerName: pet_owner_name,
            location: location,
            petImage: pet_image
        };

        $.ajax({
            url: '/api/pet',
            type: 'POST',
            data: data,
            success: (result)=>{
                if (result.statusCode === 201) {
                    alert('Pet details saved successful');
                    clearForm();
                    getAllPets();
                }
            }
        });

    }
}

function getAllPets(){
    $.get('/api/pets', (response)=>{
        if (response.statusCode === 200) {
            addCardItems(response.data);
        }
    });
}

const addCardItems = (items) => {
    $("#card-section").append([])
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
                '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.petImage+'">'+
                '</div><div class="card-content">'+
                '<span class="card-title activator grey-text text-darken-4">'+item.petName+'<i class="material-icons right">more_vert</i></span><p><a href="#"></a></p></div>'+
                '<div class="card-reveal">'+
                '<span class="card-title grey-text text-darken-4">'+item.petOwnerName+'\' Pet<i class="material-icons right">close</i></span>'+
                '<p class="card-text">'+item.petType+'</p>'+
                '<a class="waves-effect waves-light btn modal-trigger"'+
                'href="#viewModal" onClick="viewItem(\''+item._id+'\')">'+
                '<i class="material-icons right">pageview</i>View Pet Details</a>'+
                '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

function viewItem(id) {
    
    $.get(`/api/pet/${id}`, (response)=>{
        if (response.statusCode === 200) {
            var item = response.data;

            $('#view-pet-name').val(item.petName + " (Name)");
            $('#view-pet-type').val(item.petType + " (Type)");
            $('#view-pet-age').val(item.petAge + " (Age)");
            $('#view-pet-owner-name').val(item.petOwnerName + " (Owner's Name)");
            $('#view-location').val(item.location + " (Location)");

            $('#petImage').attr('src', item.petImage);

        }
    });
}

// Open modal
$(document).ready(function(){
    
    // For get all pets data
    getAllPets();

    // For open modal
    $('.modal').modal();

    // For save form data
    $('#save-details').click(() => {
        saveFormData();
    })
});
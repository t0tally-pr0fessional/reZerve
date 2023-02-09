function showCreate() {
    if (sessionStorage.getItem("Username") != null) {
        $('#createResForm').modal('show');
    } else {
        alert('Please Login to List a restaurant!');
        return;
    }
}
function createRestaurant() {
    var response = "";
    var jsonData = new Object();
    jsonData.restaurant = document.getElementById("restaurantName").value;
    jsonData.closing = document.getElementById("closing").value;
    jsonData.opening = document.getElementById("opening").value;
    jsonData.description = document.getElementById("description").value;
    jsonData.location = document.getElementById("location").value;
    jsonData.phone_number = document.getElementById("contactno.").value;
    jsonData.website = document.getElementById("website").value;
    jsonData.category = document.getElementById("category").value;
    jsonData.owner = sessionStorage.getItem("Username")
    if (jsonData.restaurant == "" || jsonData.closing == "" || jsonData.opening == "" ||
        jsonData.description == "" || jsonData.location == "" || jsonData.phone_number == "" ||
        jsonData.website == "" || jsonData.category == "") {
        alert('All fields are required!');
        return;
    }
    console.log(jsonData)
    var request = new XMLHttpRequest();
    request.open("POST", "https://mu3gbparul.execute-api.us-east-1.amazonaws.com/res-create", true);
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "restaurant added") {
            alert('Success. Restaurant Created.');
        }
        else if (response.message == "Restaurant name already in use!") {
            alert('Error. Name already is use.');
        } else {
            alert('Error. Unable to create Restaurant.');
        }
    };
    request.send(JSON.stringify(jsonData));
}

function getAllRes() {
    var response = "";
    var request = new XMLHttpRequest();
    request.open("GET", "https://mu3gbparul.execute-api.us-east-1.amazonaws.com/res-getall", true);
    request.onload = function () {
        response = JSON.parse(request.responseText).Items;
        var html = "";

        var max = response.length;
        for (var i = 0; i < max; i++) {
            if (response[i].category == "fastfood") {
                html += `
                        <div class="box">
                            <span class="price"> ${response[i].opening} - ${response[i].closing}</span>
                            <a class="logo"><i class="fas fa-hamburger"></i></a>
                            <h3 >${response[i].restaurant}</h3>
                            <h2 >${response[i].description}</h2>
                            <h2 >${response[i].location}</h2>
                            <h2 >${response[i].phone_number}</h2>
                            <h2 >${response[i].website}</h2>
                            <h2 >${response[i].owner}</h2>
                            <a href="../restaurant/restaurant.html?restaurant=${response[i].restaurant.replaceAll(" ", "+")}" class="btn btn-warning">Reserve Now!</a>
                        </div>`
            }
            else if (response[i].category == "casual") {
                html += `
                        <div class="box">
                            <span class="price"> ${response[i].opening} - ${response[i].closing}</span>
                            <a class="logo"><i class="fas fa-fish"></i></a>
                            <h3 >${response[i].restaurant}</h3>
                            <h2 >${response[i].description}</h2>
                            <h2 >${response[i].location}</h2>
                            <h2 >${response[i].phone_number}</h2>
                            <h2 >${response[i].website}</h2>
                            <h2 >${response[i].owner}</h2>
                            <a href="../restaurant/restaurant.html?restaurant=${response[i].restaurant.replaceAll(" ", "+")}" class="btn btn-warning">Reserve Now!</a>
                        </div>`
            }
            else if (response[i].category == "finedining") {
                html += `
                        <div class="box">
                            <span class="price"> ${response[i].opening} - ${response[i].closing}</span>
                            <a class="logo"><i class="fas fa-utensils"></i></a>
                            <h3>${response[i].restaurant}</h3>
                            <h2>${response[i].description}</h2>
                            <h2>${response[i].location}</h2>
                            <h2>${response[i].phone_number}</h2>
                            <h2>${response[i].website}</h2>
                            <h2>${response[i].owner}</h2>
                            <a href="../restaurant/restaurant.html?restaurant=${response[i].restaurant.replaceAll(" ", "+")}" class="btn btn-warning">Reserve Now!</a>
                        </div>`
            }
        }

        document.getElementById("allResDisplay").innerHTML = html;
    }
    request.send();
};

function getSelectedRestaurant() {
    const urlParams = window.location.search;

    if (urlParams.length > 0) {
        const restaurant = urlParams.split("=")[1].replaceAll("+", " ");

        var response = "";
    
        var request = new XMLHttpRequest();
    
        request.open("GET", "https://mu3gbparul.execute-api.us-east-1.amazonaws.com/res-getall/" + restaurant, true);
        
        request.onload = function () {
            response = JSON.parse(request.responseText);
    
            if (response[0].category == "fastfood") {
                document.getElementById("resName").innerHTML = response[0].restaurant;
                document.getElementById("resDescription").innerHTML = response[0].description;
                document.getElementById("resLocation").innerHTML = 'Located at:' + response[0].location;
                document.getElementById("resContact").innerHTML = response[0].phone_number;
                document.getElementById("resOpening").innerHTML = 'Opens at:' + response[0].opening;
                document.getElementById("resClosing").innerHTML = 'Closes at:' +response[0].closing;
                document.getElementById("resOwner").innerHTML = 'Created by:' + response[0].owner;
                document.getElementById("resCategory").innerHTML = '<i class="fas fa-hamburger"></i>';

            }
            else if (response[0].category == "casual") {
                document.getElementById("resName").innerHTML = response[0].restaurant;
                document.getElementById("resDescription").innerHTML = response[0].description;
                document.getElementById("resLocation").innerHTML = 'Located at:' + response[0].location;
                document.getElementById("resContact").innerHTML = response[0].phone_number;
                document.getElementById("resOpening").innerHTML = 'Opens at:' + response[0].opening;
                document.getElementById("resClosing").innerHTML = 'Closes at:' + response[0].closing;
                document.getElementById("resOwner").innerHTML = 'Created by:' + response[0].owner;
                document.getElementById("resCategory").innerHTML = '<i class="fas fa-fish"></i>';
            }
            else if (response[0].category == "finedining") {
                document.getElementById("resName").innerHTML = response[0].restaurant;
                document.getElementById("resDescription").innerHTML = response[0].description;
                document.getElementById("resLocation").innerHTML = 'Located at:' + response[0].location;
                document.getElementById("resContact").innerHTML = response[0].phone_number;
                document.getElementById("resOpening").innerHTML = 'Opens at:' + response[0].opening;
                document.getElementById("resClosing").innerHTML = 'Closes at:' +response[0].closing;
                document.getElementById("resOwner").innerHTML = 'Created by:' + response[0].owner;
                document.getElementById("resCategory").innerHTML = '<i class="fas fa-utensils"></i>';
            }
        };
    
        request.send();
    }
}

function checkOwner() {
    const urlParams = window.location.search;

    if (urlParams.length > 0) {
        const restaurant = urlParams.split("=")[1].replaceAll("+", " ");

        var response = "";
    
        var request = new XMLHttpRequest();
    
        request.open("GET", "https://mu3gbparul.execute-api.us-east-1.amazonaws.com/res-getall/" + restaurant, true);
        
        request.onload = function () {
            response = JSON.parse(request.responseText);
            console.log(response[0].owner)
    
            if(response[0].owner == sessionStorage.getItem("Username")){
                document.getElementById("resUpdate").innerHTML = '<a href="#" data-toggle="modal" data-target="#editResForm" class="btn btn-warning">Update Restaurant</a>';
                document.getElementById("resDelete").innerHTML = '<a href="#" onclick="deleteRestaurant()" class="btn btn-warning">Delete Restaurant</a>';
            }else{
                return;
            }
        };
    
        request.send();
    }
}




function updateRestaurant() {
    var response = "";
    var jsonData = new Object();
    jsonData.restaurant = document.getElementById("editRestaurantName").value;
    jsonData.closing = document.getElementById("editClosing").value;
    jsonData.opening = document.getElementById("editOpening").value;
    jsonData.description = document.getElementById("editDescription").value;
    jsonData.location = document.getElementById("editLocation").value;
    jsonData.phone_number = document.getElementById("editContactno.").value;
    jsonData.website = document.getElementById("editWebsite").value;
    jsonData.category = document.getElementById("editCategory").value;
    jsonData.owner = sessionStorage.getItem("Username")
    if (jsonData.restaurant == "" || jsonData.closing == "" || jsonData.opening == "" ||
    jsonData.description == "" || jsonData.location == "" || jsonData.phone_number == "" ||
    jsonData.website == "" || jsonData.category == "") {
        alert('All fields are required!'); return;
    }
    var request = new XMLHttpRequest();
    request.open("PUT", "https://mu3gbparul.execute-api.us-east-1.amazonaws.com/res-update", true);
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "restaurant edited") {
            alert('Restaurant updated successfully.');
            window.location = "index.html"
        }
        else {
            alert('Error. Unable to update restaurant.');
        }
    };
    request.send(JSON.stringify(jsonData));
}


function fillRestaurant() {
    const urlParams = window.location.search;

    if (urlParams.length > 0) {
        const restaurant = urlParams.split("=")[1].replaceAll("+", " ");

        var response = "";
    
        var request = new XMLHttpRequest();
    
        request.open("GET", "https://mu3gbparul.execute-api.us-east-1.amazonaws.com/res-getall/" + restaurant, true);
        
        request.onload = function () {
            response = JSON.parse(request.responseText);
            console.log(response[0].restaurant)
            document.getElementById("editRestaurantName").value = response[0].restaurant;
            document.getElementById("editDescription").value = response[0].description;
            document.getElementById("editOpening").value = response[0].opening;
            document.getElementById("editClosing").value = response[0].closing;
            document.getElementById("editLocation").value = response[0].location;
            document.getElementById("editWebsite").value = response[0].website;
            document.getElementById("editContactno.").value = response[0].phone_number;
            document.getElementById("editCategory").value = response[0].category;
        };
        request.send();
    }
}

function deleteRestaurant() {
    const urlParams = window.location.search;

    if (urlParams.length > 0) {
        const restaurant = urlParams.split("=")[1].replaceAll("+", " ");

        var response = "";
    
        var request = new XMLHttpRequest();
    
        request.open("DELETE", "https://mu3gbparul.execute-api.us-east-1.amazonaws.com/res-delete/" + restaurant, true);
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "Restaurant deleted") {
            alert('Restaurant deleted successfully.');
            window.location = "../index.html"
        }
        else {
            alert('Error. Unable to delete restaurant.');
        }
    };
    request.send();
}
}

function setNavBar() {
    console.log(document.getElementById("navLogin"))
      if (sessionStorage.getItem("Username") != null) {
          document.getElementById("navLogin").innerHTML = '<a class="nav-link" href="../profile.html">Profile</a>'
      document.getElementById("navRegister").innerHTML = '<a class="nav-link" type="button" onclick="logOut()">Log Out</a>'
      document.getElementById("navBooking").innerHTML = '<a class="nav-link" href="../booking/displayBooking.html">Bookings</a>'
      } else {
      document.getElementById("navLogin").innerHTML = '<a href="#" data-toggle="modal" data-target="#loginForm">Login</a>'
      document.getElementById("navRegister").innerHTML = '<a href="#" data-toggle="modal" data-target="#registerForm">Register</a>'
      } 
  }
  
  
  function logOut() {
      sessionStorage.removeItem("Username");
      sessionStorage.removeItem("user");
      window.location = "../index.html"
  }

window.onscroll = () =>{


  if(window.scrollY > 60){
    document.querySelector('#scroll-top').classList.add('active');
  }else{
    document.querySelector('#scroll-top').classList.remove('active');
  }

}

function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3000);
}
  
  
  
  
  window.onload = fadeOut();
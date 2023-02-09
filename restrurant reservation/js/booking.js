function createBooking() {
    const urlParams = window.location.search;

    if (urlParams.length > 0) {
        const restaurant = urlParams.split("=")[1].replaceAll("+", " ");

    var response = "";
    var jsonData = new Object();
    jsonData.restaurant = restaurant;
    jsonData.booked_on = new Date();
    jsonData.Username = sessionStorage.getItem("Username");
    jsonData.pax = document.getElementById("pax").value;
    jsonData.remarks = document.getElementById("remarks").value;
    jsonData.time = document.getElementById("dateSelected").value;
    if (jsonData.restaurant == "" || jsonData.booked_on == "" || jsonData.Username == "" ||
        jsonData.pax == "" || jsonData.remarks == "" || jsonData.time == "") {
        alert('All fields are required!');
        return;
    }
    console.log(jsonData)
    var request = new XMLHttpRequest();
    request.open("POST", "https://mu3gbparul.execute-api.us-east-1.amazonaws.com/reservation-create", true);
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "booking added") {
            alert('Success. Booking created.');
        }
        else if (response.message == "Username already in use!") {
            alert('Error. Username already is use.');
        } else {
            alert('Error. Unable to create booking.');
        }
    };
    request.send(JSON.stringify(jsonData));
    }
}

function getAllBooking() {
    var response = "";
    var User = sessionStorage.getItem("Username");
    console.log(User);
    var request = new XMLHttpRequest();
    request.open("GET", "https://mu3gbparul.execute-api.us-east-1.amazonaws.com/reservation-getall/" + User, true);
    request.onload = function () {
        response = JSON.parse(request.responseText);
        var html = "";
        console.log(response);

        var max = response.length;
        for (var i = 0; i < max; i++) {
                html += `
                        <div class="box">
                            <a class="logo"><i class="fas fa-bookmark"></i></a>
                            <h3>${response[i].restaurant}</h3>
                            <h2>Booked for: ${response[i].time}</h2>
                            <h2> For: ${response[i].pax}</h2>
                            <h2>${response[i].remarks}</h2>
                            <h2>Booked on: ${response[i].booked_on}</h2>
                            <div class ="row" style="slign = centre;">
                            <a href="#" onclick="deleteBooking()" class="btn btn-warning">Cancel Booking</a>
                            <a href="#" data-toggle="modal" data-target="#editBookingForm" class="btn btn-warning">Edit Booking</a>
                            </div>
                        </div>`
        }

        document.getElementById("allBookingDisplay").innerHTML = html;
    }
    request.send();
};

function deleteBooking() {
    const urlParams = window.location.search;

    if (urlParams.length > 0) {
        const restaurant = urlParams.split("=")[1].replaceAll("+", " ");

        var response = "";
        var User = sessionStorage.getItem("Username");
    
        var request = new XMLHttpRequest();
    
        request.open("DELETE", "https://mu3gbparul.execute-api.us-east-1.amazonaws.com/reservation-delete/" + restaurant + "/" + User, true);
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "reservation deleted") {
            alert('Reservation deleted successfully.');
            window.location = "..booking/displayBooking.html"
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

  function loader(){
    document.querySelector('.loader-container').classList.add('fade-out');
  }
  
  function fadeOut(){
    setInterval(loader, 3000);
  }
  
  
  
  
  
  window.onload = fadeOut();
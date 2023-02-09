let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{

  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');

}

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

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

$("body").ready(function() {
  setNavBar()
  getAllRes()
})

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





window.onload = fadeOut();
//VARIABLES
const courses = document.querySelector('#courses-list'),
       shoppingCartContent = document.querySelector('#cart-content tbody');


//LISTENERS
loadEventListeners();

function loadEventListeners() {
    //When a new course is added
    courses.addEventListener('click', buyCourse);
}

//FUNCTION
function buyCourse(e) {
  e.preventDefault();
    //USE DELEGATION TO FIND THE ADDED COURSE
   if (e.target.classList.contains('add-to-cart')){
       //READ THE COURSE VALUES
       const course = e.target.parentElement.parentElement;

       //READ THE VALUES
       getCourseInfo(course);
   }
}

//READ THE HTML INFO OF SELECTED COURSE
function getCourseInfo(course) {
    //CREATE OBJECT WITH COURSE DATA
    const courseInfo = {
         image: course.querySelector('img').src,
         title: course.querySelector('h4').textContent,
         prize: course.querySelector('.price span').textContent,
         id: course.querySelector('a').getAttribute('data-id')
    }
    //INSERT TO THE SHOPPING CART
    addIntoCart(courseInfo);
}
//DISPLAY THE SELECTED COURSE INTO THE SHOPPING CART

function addIntoCart(course) {
 //CREATE A <tr>
 const row = document.createElement('tr');

 //BUILD THE TEMPLATE
 row.innerHTML =  `
      <tr>
          <td>
              <img src="${course.image}" width=100>
          </td>
          <td>${course.title}</td>
          <td>${course.prize}</td>
          <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>

      </tr>

      `;
        //ADD INTO THE SHOPPING CART
       shoppingCartContent.appendChild(row);
}
   




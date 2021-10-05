//VARIABLES
const courses = document.querySelector('#courses-list'),
       shoppingCartContent = document.querySelector('#cart-content tbody'),
       clearCartBtn = document.querySelector('#clear-cart');


//LISTENERS
loadEventListeners();

function loadEventListeners() {
    //When a new course is added
    courses.addEventListener('click', buyCourse);

    //WHEN THE REMOVE BUTTON IS CLICK
    shoppingCartContent.addEventListener('click', removeCourse);

    //CLEAR CART BUTTON
    clearCartBtn.addEventListener('click', clearCart);

    //DOCUMENT READY
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);

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
            </td>
      </tr>

      `;
        //ADD INTO THE SHOPPING CART
       shoppingCartContent.appendChild(row);

       //ADD COURSES INTO THE STORAGE
       saveIntoStorage(course);
}

//ADD COURSES INTO THE LOCAL STORAGE
function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    //ADD COURSE INTO THE ARRAY
    courses.push(course);

    //SINCE STORAGE ONLY SAVES STRINGS, CONVERT JSON INTO STRING
    localStorage.setItem('courses', JSON.stringify(courses) );
}

//GET THE CONTENT FROM THE STORAGE
function getCoursesFromStorage() {

    let courses;

    //IF SOMETHING EXISTON STORAGE THEN GET VALUE OTHERWISE CREATE AN EMPTY ARRAY
    if(localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses') );
    }
    return courses;
}


//REMOVE COURSE FROM DOM
function removeCourse(e) {
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
    }
}

//CLEAR THE SHOPPING CARRT
function clearCart() {
    //shoppingCartContent.innerHTML = '';

        while(shoppingCartContent.firstChild) {
            shoppingCartContent.removeChild(shoppingCartContent.firstChild);
        }

}

//LOADS WHEN DOCUMENT IS READY AND PRINT COURSES INTO SHOPPING CART
function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    //LOOP THROUGH THE COURSES AND PRINT INTO THE CART
    coursesLS.forEach(function(course) {
        //CREATE THE TABLE ROW
        const row = document.createElement('tr');

        //PRINT THE CONTENT
        row.innerHTML = `
        <tr>
        <td>
            <img src="${course.image}" width=100>
        </td>
        <td>${course.title}</td>
        <td>${course.prize}</td>
        <td>
              <a href="#" class="remove" data-id="${course.id}">X</a>
        </td>
    </tr>
        `;
        shoppingCartContent.appendChild(row);
    })

}
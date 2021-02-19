document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});
$(document).ready(function () {
  $('.modal').modal();
  $('.addBook').click(addBook);
  getAllBooks();
  $(".logout").click(logoutUser);
  $('.search-tool button').click(searchBookName)
});

const logoutUser = (e) => {
  e.preventDefault();
  Cookies.remove("token");
  window.location.href = '/login';
}

const addBook = async (e) => {
  //stop submit the form, we will post it manually.
  e.preventDefault();

  // Get form
  var form = $('#add-book')[0];

  // Create an FormData object 
  var data = new FormData(form);

  // Lúc này req.body lấy các key và value chính là name và value của input ???????? IMPORTANT

  // const files = $('#input-many-images')[0].files;
  // If you want to add an extra field for the FormData
  // data.append('images', files);
  console.log(data);

  // disabled the submit button

  $.ajax({
    type: "POST",
    enctype: 'multipart/form-data',
    url: "/books/create",
    data: data,
    processData: false,
    contentType: false,
    cache: false,
  }).then((result) => {
    if (result.status === 200 && !result.error) {
      window.location.href = '/'
      alert(result.message);
    } else {
      alert(result.message);
    }
  }).catch((err) => {
    console.log(err);
  });
 
}
/* 
$(".reset-value").click(resetValue);
const resetValue = () => {
  var name = $("#name-book-add");
  var author = $("#author-book-add");
  var description = $("#textarea-add");
  name.val("").removeClass('valid');
  author.val("").removeClass('valid');
  description.val("");
  $('label').removeClass('active');
} */

const getAllBooks = async () => {
  await $.ajax({
    type: "get",
    url: "/books"
  }).then((result) => {
    if (result.status === 200 && !result.error) {
      const { data } = result;
      getDetailBooks(data);
    }
  }).catch((err) => {
    console.log(err);
  });
}

async function deleteBook() {
  const idBook = $(this).attr('data-id');
  console.log(idBook);
  confirm("Bạn có muốn xóa không?") && await $.ajax({
    type: "delete",
    url: "/books/delete/" + idBook,
  }).then((result) => {
    if (result.status === 200 && !result.error) {
      alert(result.message);
      $(this).parent().parent().parent().remove();
    } else {
      alert(result.message)
    }
  }).catch((err) => {
    console.log(err);
  });
}
async function updateBook() {
  const idBook = $(this).attr('data-id');
  getInfoBook(idBook)
}

const getInfoBook = (idBook) => {
  $.ajax({
    type: "get",
    url: "/books/" + idBook,
  }).then((result) => {
    const { data } = result;

    if (result.status === 200 && !result.error) {
      $("#update-book").empty();
      const template = `

      <div class="modal-content">

      <h4 class="header">Update Book</h4>
      <div class="row name-book ">
        <div class="input-field">
          <input value='${data.name}' name='name' id="name-book-update" type="text" class="valid validate">
          <label class='active' for="name-book-update">Name Book</label>
        </div>
      </div>
      <div class="row authors">
        <div class="input-field">
          <!--   col s12 -->
          <input  value='${data.author}' name='author' id="author-book-update" type="text" class="valid validate">
          <label class='active' for="author-book-update">Author Book</label>
        </div>
      </div>
      <div class="row descriptions ">
        <div class="input-field col s12">
          <textarea id="textarea-update"  name='description' class="materialize-textarea valid">${data.description}</textarea>
          <label class='active' for="textarea-update">Textarea</label>
        </div>
      </div>

      <div class="row images-detail">
        <h6 style="color: #5A0081" >Images</h6>

      </div >
      <br>
      <div class="file-field input-field ">
        <br>
        <div class="btn">
          <span>File</span>
          <input type="file" name="updateImages" id="input-update-images" multiple>
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" value='${data.images.map(element => element.slice(-5))}' 
          data-value= "${data.images}" style='color:white' name='images' id='update-images' type="text" placeholder="Upload one or more files">
        </div>
      </div>
      
      <div class="modal-footer">
        <a href="#!" data-id=${data._id} onclick=acceptUpdateBook.call(this) class="updateBook modal-close waves-effect waves-green btn-flat">Update</a>
      </div>`;
      let templateImage = data.images.map(element => '<img class="col s4" src=' + element + '>');
      $("#update-book").append(template);
      $(".images-detail").append(templateImage);
    }
  }).catch((err) => {
    console.log(err);
  });

}

function acceptUpdateBook() {

  const id = $(this).attr('data-id');
  // Khai báo form
  var form = $("#update-book")[0];
  var data = new FormData(form);
  // Lấy value của input
  const name = $("#name-book-update").val();
  const author = $("#author-book-update").val();
  const description = $("#textarea-update").val();
  const images = $("#update-images").attr('data-value');
  // Cho dữ liệu vào form
  data.append('name', name);
  data.append('author', author);
  data.append('description', description);
  if (images !== '')
    data.append('images', images);

  console.log(data);
  $.ajax({
    method: "put",
    url: "/books/update/" + id,
    data: data,
    processData: false,
    contentType: false,
    cache: false,
  }).then((result) => {
    if (result.status === 200 && !result.error) {
      window.location.href = '/'
      alert(result.message);
    } else {
      alert(result.message);
    }
  }).catch((err) => {
    console.log(err);
  });
}


const searchBookName = async () => {
  const name = $(".search-name").val();
  await $.ajax({
    method: 'post',
    url: "/books/search-book-name",
    data: { name }
  }).then((result) => {
    if (result.status === 200 && !result.error) {
      const { data } = result;
      getDetailBooks(data);
    }
  }).catch((err) => {
    console.log(err);
  });
}

const getDetailBooks = (data) => {
  const allBook = $(".all-books");

  var template;
  allBook.empty();
  if (data.length === 0) {
    allBook.append(`<h2>Nothing at all! :( </h2>`)
  } else {
    data.forEach(book => {
      template = `
  <div class="col s6 m6 l4 xl3">
    <div class="card">
      <div class="card-image">
        <img src="${book.images[0]}">
        <span class="card-title">${book.name}</span>
      </div>
      <div class="card-content">
        <p class='description' >
         ${book.description}  
        </p>
        <p class="book-authors"> ${book.author}</p>
      </div>
      <div class="card-action">
        <a data-id=${book._id} onclick= updateBook.call(this)  class="btn-update-book waves-effect waves-light btn modal-trigger" href="#update-book">Update</a>
        <a data-id=${book._id} onclick= detailBook.call(this)  class="btn-detail-book waves-effect waves-light btn modal-trigger" href="#detail-book">Detail</a>
        <button data-id=${book._id} onclick= deleteBook.call(this) class="btn-delete-book waves-effect waves-light btn">Delete</button>
      </div>
    </div>
  </div>
`;
      allBook.append(template);
    });
  }
}

function detailBook() {
  const idBook = $(this).attr('data-id');
  modalDetailBook(idBook)
}

const modalDetailBook = (idBook) => {
  $.ajax({
    type: "get",
    url: "/books/" + idBook,
  }).then((result) => {
    const { data } = result;

    if (result.status === 200 && !result.error) {
      $("#detail-book").empty();
      const template = `

      <div class="modal-content">

      <h4 class="header">Detail Book</h4>
      <div class="row name-book ">
        <div class="input-field">
          <h6 style="color: #5A0081" >Name Book</h6>
          <p>${data.name}</p>
        </div>
      </div>
      <div class="row authors">
        <div class="input-field">
          <h6 style="color: #5A0081" >Author Book</h6>
          <p>${data.author}</p>
        </div>
      </div>
      <div class="row descriptions ">
        <div class="input-field col s12">
        <h6 style="color: #5A0081" >Description Book</h6>
        <p>${data.description}</p>
        </div>
      </div>
      <div class="row images-detail">
        <h6 style="color: #5A0081" >Images</h6>

      </div >

  <div class="modal-footer">
    <a href="#" class="modal-close waves-effect waves-green btn-flat">Close</a>
  </div>
`;
      let templateImage = data.images.map(element => '<img class="col s4" src=' + element + '>');
      $("#detail-book").append(template);
      $(".images-detail").append(templateImage);
    }
  }).catch((err) => {
    console.log(err);
  });
}
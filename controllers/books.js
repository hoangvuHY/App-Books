const {
  caseSuccess,
  caseErrorClient,
  caseErrorServer
} = require('../utils/results');
const {
  createBookService,
  updateBookService,
  deleteBookService,
  findAllBooksService,
  findOneBookService,
  findBookByNameService
} = require("../services/books");

const createBookController = async (req, res) => {
  try {
    const images = new Array();

    req.files.forEach(element => {
      let paths = element.path;
      images.push(paths.slice(6));
    })
    const { name, author, description } = req.body;
    const idUser = req.user._id || req.body.idUser;
    const bookObject = { name, author, description, idUser, images };
    console.log(bookObject);
    const createBook = await createBookService(bookObject);
    if (createBook) {
      caseSuccess(res, "Bạn đã tạo sách thành công");
    } else {
      caseErrorClient(res, "Bạn đã tạo sách thất bại");
    }
  } catch (error) {
    caseErrorServer(res, error);
  }
}
const updateBookController = async (req, res) => {
  try {
    /* 
      Hướng dẫn cách làm việc update ảnh
       
      Cũng như thêm ảnh thì phải có multer trong router
      Cho value ra 1 đường attr và lấy value đó ra ( Kiểm tra phần file của phần upload để thấy rõ  )
        - Nếu mà value đó rỗng thì gửi kèm theo form
        - Nếu không rỗng thì nó sẽ tự được đưa vào req.files
      Lúc này thì xử lý bên backend như ở dưới
    */
    const { id } = req.params;
    var imagesArr = new Array();
    let { name, author, description, images } = req.body;

    if (req.files.length === 0) {
        imagesArr = images[1].split(',');
    } else {
      req.files.forEach(element => {
        let paths = element.path;
        imagesArr.push(paths.slice(6));
      })
    }
    const bookObject = { name: name[1], author: author[1], description: description[1], images: imagesArr };
    const updateBook = await updateBookService(id, bookObject)
    if (updateBook) {
      caseSuccess(res, "Bạn đã cập nhật thành công");
    } else {
      caseErrorClient(res, "Bạn đã cập nhật thất bại");
    }
  } catch (error) {
    caseErrorServer(res, error);
  }
}
const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await deleteBookService(id);
    if (deleteBook) {
      caseSuccess(res, "Bạn đã xóa thành công");
    } else {
      caseErrorClient(res, "Bạn đã xóa thất bại");
    }
  } catch (error) {
    caseErrorServer(res, error);
  }
}
const findAllBooksController = async (req, res) => {
  try {
    const idUser = req.user._id || req.body.idUser;
    const allBooks = await findAllBooksService(idUser);
    if (allBooks) {
      caseSuccess(res, "Tất cả những quyển sách của bạn", allBooks);
    } else {
      caseErrorClient(res, "Lấy thông tin sách thất bại");
    }
  } catch (error) {
    caseErrorServer(res, error);
  }
}
const findOneBooksController = async (req, res) => {
  try {
    const { id } = req.params;
    const oneBook = await findOneBookService(id);
    if (oneBook) {
      caseSuccess(res, "Sách của bạn", oneBook);
    } else {
      caseErrorClient(res, "Lấy thông tin sách thất bại");
    }
  } catch (error) {
    caseErrorServer(res, error);
  }
}

const findBookByNameController = async (req, res) => {
  try {
    const idUser = req.user._id || req.body.idUser;
    const { name } = req.body;
    var searchName;
    if (name === '') {
      searchName = await findAllBooksService(idUser);
    } else {
      searchName = await findBookByNameService(name);
    }
    if (searchName) {
      caseSuccess(res, "Sách của bạn", searchName);
    } else {
      caseErrorClient(res, "Lấy thông tin sách thất bại");
    }
  } catch (error) {
    caseErrorServer(res, error);

  }
}
const uploadImageCtrl = (req, res) => {
  console.log(req.files[0]);
}
module.exports = {
  createBookController,
  deleteBookController,
  updateBookController,
  findAllBooksController,
  findOneBooksController,
  findBookByNameController,
  uploadImageCtrl
}
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBook } from "../data/data";

const Book = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const book = getBook(parseInt(params.bookId));

  if (book) {
    return (
      <main style={{ padding: "1rem" }}>
        <h2>قیمت کل : {`${book.amount} تومان`}</h2>
        <p>
          {book.name}
        </p>
        <p>
          تاریخ انتشار : {book.due}
        </p>
        <p>
          <button
            onClick={() => {
              deleteBook(book.number);
              navigate("/books" + location.search);
            }}
          >
            حذف کتاب
          </button>
        </p>
      </main>
    );
  } else {
    return (
      <main style={{ padding: "1rem" }}>
        <h2>همچین کتابی یافت نشد دوست من .</h2>
      </main>
    );
  }
};

export default Book;

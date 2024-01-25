import { NavLink, Outlet } from "react-router-dom";

import { getBooks } from "../data/data";

const Books = () => {
  const books = getBooks();

  return (
    <div style={{ display: "flex" }}>
      <nav style={{ borderLeft: "solid 1px", padding: "1rem" }}>
        <input type="text" placeholder="جستجوی کتاب" />
        {books.map((book) => (
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            // className={isActive?"activeCalss":""} یا اینجوری هم میشه
            to={`/books/${book.number}`}
            key={book.number}
          >
            {book.name}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
};

export default Books;

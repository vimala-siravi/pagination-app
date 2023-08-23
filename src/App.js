import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await response.json();
    if (data?.products) {
      setProducts(data.products);
      setTotalPages(data?.total / 10);
    }
  };

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <>
      <div className="products">
        {products?.map((product) => {
          return (
            <span className="products__single" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <span>{product.title}</span>
            </span>
          );
        })}
      </div>
      {products?.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => {
              selectPageHandler(page - 1);
            }}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ⬅️
          </span>
          {[...Array(totalPages)].map((_, index) => {
            return (
              <span
                onClick={() => selectPageHandler(index + 1)}
                key={index}
                className={page === index + 1 ? "pagination__selected" : ""}
              >
                {index + 1}
              </span>
            );
          })}
          <span
            onClick={() => {
              selectPageHandler(page + 1);
            }}
            className={page < totalPages ? "" : "pagination__disable"}
          >
            ➡️
          </span>
        </div>
      )}
    </>
  );
}

export default App;

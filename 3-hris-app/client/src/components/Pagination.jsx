export default function Pagination({ pagination, totalPage, setPagination }) {
  function nextHandler() {
    if (pagination !== totalPage) {
      setPagination(pagination + 1);
    }
  }

  function prevHandler() {
    if (pagination !== 1) {
      setPagination(pagination - 1);
    }
  }

  return (
    <div className="join">
      <button onClick={prevHandler} className="join-item btn">
        Previous
      </button>
      {(() => {
        let page = [];
        for (let i = 1; i <= totalPage; i++) {
          page.push(
            <button
              key={i}
              onClick={() => setPagination(i)}
              className={
                pagination === i ? "join-item btn btn-active" : "join-item btn"
              }
            >
              {i}
            </button>
          );
        }
        return page;
      })()}
      <button onClick={nextHandler} className="join-item btn">
        Next
      </button>
    </div>
  );
}

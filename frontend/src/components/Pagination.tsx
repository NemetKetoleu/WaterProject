// This is a "Pagination" component. It helps you move through pages of information like flipping through pages of a book.

interface PaginationProps {
    // The page you're currently on.
    currentPage: number;
    // The total number of pages you have.
    totalPages: number;
    // How many things you see on one page.
    pageSize: number;
    // A function that tells the app to change the page when you click a button.
    onPageChange: (newPage: number) => void;
    // A function that tells the app how many things should show up on each page.
    onPageSizeChange: (newSize: number) => void;
    // void represents that the function does not return anything. It means that when you call the onPageSizeChange function, 
    // it will perform some action (like changing the page size), but it won't give you any value back after it's done.
  }
  
  // This is the "Pagination" component. It's like a button that helps you move through pages.
  const Pagination = ({
    currentPage,
    totalPages,
    pageSize,
    onPageChange,
    onPageSizeChange,
  }: PaginationProps) => {
    return (
      <div className="flex item-center justify-center mt-4">
        {/* This button lets you go to the previous page. It doesn't work if you're on the first page. */}
        <button
          disabled={currentPage === 1} // If you're on the first page, this button doesn't do anything.
          onClick={() => onPageChange(currentPage - 1)} // When clicked, it goes to the previous page.
        >
          Previous
        </button>
  
        {/* This part makes buttons for each page. Each button is like a number you can click. */}
        {[...Array(totalPages)].map((_, i) => (
            <button
                key={i + 1} // This is the button for the page number, like 1, 2, 3, etc.
                onClick={() => onPageChange(i + 1)} // When the button is clicked, it will go to that page number.
                disabled={currentPage === i + 1} // If we are already on this page, the button doesn't work (it's disabled).
            >
                {i + 1} {/* This shows the page number on the button, like 1, 2, 3, etc. */}
            </button>
        ))}
  
        {/* This button lets you go to the next page. It doesn't work if you're on the last page. */}
        <button
          disabled={currentPage === totalPages} // If you're on the last page, this button doesn't do anything.
          onClick={() => onPageChange(currentPage + 1)} // When clicked, it goes to the next page.
        >
          Next
        </button>
  
        <br />
  
        {/* This part lets you pick how many things you want to see on each page. */}
        <label>
          Results per page:
          <select
            value={pageSize} // This shows how many things are on one page right now.
            onChange={(p) => {
              onPageSizeChange(Number(p.target.value)); // When you pick a new number, it updates how many things are on each page.
              onPageChange(1); // It also takes you back to the first page when you change the number.
            }}
          >
            {/* These are the options you can choose for how many things you see per page */}
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>{' '}
      </div>
    );
  };
  
  export default Pagination;
  
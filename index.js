const toggleSpin = (displaySpin) => {
  document.getElementById("spinner").style.display = displaySpin;
};
const toggleBookShow = (displaySpin) => {
  document.getElementById("book-show").style.display = displaySpin;
};
const toggleSearchResult = (displaySpin) => {
  document.getElementById("search-result").style.display = displaySpin;
};
const toggleError = (displaySpin) => {
  document.getElementById("error-msg").style.display = displaySpin;
};
const searchBook = () => {
  const inputSearch = document.getElementById("input-search");
  const inputSearchText = inputSearch.value;
  inputSearch.value = "";
  toggleSpin("block");
  toggleBookShow("none");
  toggleSearchResult("none");

  //////////////////////
  if (inputSearchText.length === 0) {
    toggleError("block");
    toggleSpin("none");
  } else {
    const url = `https://openlibrary.org/search.json?q=${inputSearchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayBook(data));
    toggleError("none");
  }
  //////////////////////
};
const displayBook = (data) => {
  const searchResult = document.getElementById("search-result");
  searchResult.innerHTML = `
  <p>Total Search Result : ${data.numFound}</p>
  `;
  //////////////////////////
  const books = data.docs;
  const section = document.getElementById("book-show");
  section.textContent = "";
  books.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-8">
        <div class="card-body">
          <h3 class="card-title">${book.title.slice(0, 40)}</h3>
          <h5>Author : ${book.author_name}</h5>
          <h5>Publisher : ${book.publisher}</h5>
          <p class="card-text">
            <small class="text-muted">First publisher : ${
              book.first_publish_year
            }</small>
          </p>
        </div>
      </div>
      <div class="col-md-4">
        <img
          src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"
          class="img-fluid rounded-start w-100"
          alt="..."
        />
      </div>
    </div>
  </div>
    `;
    section.appendChild(div);
  });
  toggleSpin("none");
  toggleBookShow("flex");
  toggleSearchResult("block");
};
// data.docs{
//     author_name
//     cover_i
//     first_publish_year
//     publisher
//     text.title
// }
//    // console.log(book.author_name[0]);
// console.log(book.text.title);
// data.numFound

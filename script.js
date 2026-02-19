function showFilter() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  newForm.style.display = "none";

  if (filterForm.style.display === "none" || filterForm.style.display === "") {
    filterForm.style.display = "block";
  } else {
    filterForm.style.display = "none";
  }
}

function showAddNew() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  filterForm.style.display = "none";

  if (newForm.style.display === "none" || newForm.style.display === "") {
    newForm.style.display = "flex";
  } else {
    newForm.style.display = "none";
  }
}

function filterArticles() {
  const showOpinion = document.getElementById("opinionCheckbox").checked;
  const showRecipe = document.getElementById("recipeCheckbox").checked;
  const showUpdate = document.getElementById("updateCheckbox").checked;

  const articles = document.querySelectorAll("#articleList article");

  articles.forEach((article) => {
    const isOpinion = article.classList.contains("opinion");
    const isRecipe = article.classList.contains("recipe");
    const isUpdate = article.classList.contains("update");

    let shouldShow = true;

    if (isOpinion && !showOpinion) shouldShow = false;
    if (isRecipe && !showRecipe) shouldShow = false;
    if (isUpdate && !showUpdate) shouldShow = false;

    article.style.display = shouldShow ? "" : "none";
  });
}

function addNewArticle() {
  const titleInput = document.getElementById("inputHeader");
  const textInput = document.getElementById("inputArticle");

  const title = titleInput.value.trim();
  const text = textInput.value.trim();

  const selected = document.querySelector('input[name="articleType"]:checked');
  if (!title || !text || !selected) {
    alert("Please enter a Title, select a Type, and enter Text.");
    return;
  }

  const typeClass = selected.value;

  let typeLabel = "Opinion";
  if (typeClass === "recipe") typeLabel = "Recipe";
  if (typeClass === "update") typeLabel = "Update";

  const article = document.createElement("article");
  article.classList.add(typeClass);

  article.id = "new_" + Date.now();

  article.innerHTML = `
    <span class="marker">${typeLabel}</span>
    <h2>${escapeHTML(title)}</h2>
    <p>${escapeHTML(text)}</p>
    <p><a href="moreDetails.html">Read more...</a></p>
  `;

  
  document.getElementById("articleList").appendChild(article);

  
  titleInput.value = "";
  textInput.value = "";
  selected.checked = false;

  filterArticles(); 
}


function escapeHTML(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {
  filterArticles();
});

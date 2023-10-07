
const dataContainerDiv = document.getElementById("data-container");
const seeMoreBtn = document.getElementById("see-more-btn");
const loaderDiv = document.getElementById("loader");
const sortByDateBtn = document.getElementById("sort-by-date-btn");

sortByDateBtn.style.display = "none";
seeMoreBtn.style.display = "none";

const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res => res.json())
    .then(data => passDataInAllFunction(data.data.tools))
};

loadData();

const passDataInAllFunction = (dataArr) => {
  const newDataArr = [...dataArr];
  displaySomeData(newDataArr);
  sortByDateBtn.style.display = "block";
  seeMoreBtn.style.display = "block";
};

// const displayBlogDetails = (id) => {
//   console.log(id, "Blog details in console!")
// }


const displaySomeData = (results) => {
  loaderDiv.style.display = "none";
  // dataContainerDiv.style.display = "none";

  const filteredResultsArr = results.filter(result => +result.id % 2 != 0);

  filteredResultsArr.forEach(filteredResult => {
    const cardsDiv = document.createElement("div")
    cardsDiv.innerHTML =
      `
    <div class="card">
      <div class="card-top">
        <img class="card-img" src=${filteredResult.name == "Jasper Chat" || filteredResult.name == "Replika" ? "https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg" : filteredResult.image} alt="${filteredResult.name} image couldn't load">
      </div>
      <div class="card-info">
        <h4 class="feature">Features</h4>
        <ol>
        <li>${filteredResult.features[0]}</li>
        <li>${filteredResult.features[1]}</li>
        <li>${filteredResult.features[2]}</li>
        </ol>
      </div>
      <hr>
      <div class="card-bottom">
        <div class="left">
          <h3 class="card-title">${filteredResult.name}</h3>
          <p class="card-publish-date"><i class="fa-regular fa-calendar"></i> ${filteredResult.published_in}</p></div>
        <div onclick="displayBlogDetails(${filteredResult.id})" class="right">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
      </div>
    `;
    dataContainerDiv.appendChild(cardsDiv);
  })

  seeMoreBtn.addEventListener('click', () => {
    dataContainerDiv.innerHTML = '';
    displayAllData(results);
  });

  sortByDateBtn.addEventListener('click', () => {
    const newResults = [...results, isSorted = false]
    sortDataOnClick(results);
  })

};

const sortDataOnClick = (data) => {
  dataContainerDiv.innerHTML = "";
  if(data) {
    data.sort((a, b) => a.published_in - b.published_in);
    data.isSorted = true;
  }
  if(data.isSorted) {
    displayAllData(data)
  } else {
    if(alert("already sorted!")) {
      displaySomeData(data);
    }
  }
}

const displayAllData = (dataArr) => {
  const newDataArr = [...dataArr]
  newDataArr.map(newData => {
    const cardsDiv = document.createElement("div");
    cardsDiv.innerHTML =
      `
    <div class="card">
      <div class="card-top">
      <img class="card-img" src=${newData.name == "Jasper Chat" || newData.name == "Replika" ? "https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg" : newData.image} alt="${newData.name} image couldn't load">
      </div>
      <div class="card-info">
        <h4 class="feature">Features</h4>
        <ol>
        <li>${newData.features[0]}</li>
        <li>${newData.features[1]}</li>
        <li>${newData.features[2]}</li>
        </ol>
      </div>
      <hr>
      <div class="card-bottom">
        <div class="left">
          <h3 class="card-title">${newData.name}</h3>
          <p class="card-publish-date"><i class="fa-regular fa-calendar"></i> ${newData.published_in}</p>
        </div>
        <div onclick="displayBlogDetails(${newData.id})" class="right">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </div>
    `;
    dataContainerDiv.appendChild(cardsDiv);
  })
  seeMoreBtn.style.display = "none";
}

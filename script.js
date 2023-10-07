
const containerDiv = document.getElementById("container");
const seeMoreBtn = document.getElementById("see-more-btn");

const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
  .then(res => res.json())
  .then(data => displaySomeData(data.data.tools))
};

loadData();


const displayBlogDetails = (id) => {
  console.log(id, "Blog details in console!")
}


const displaySomeData = (results) => {
  const arr = [...results];
  const filteredResultsArr = arr.filter(result => {
    return +result.id %2 != 0; 
  })
  filteredResultsArr.forEach(filteredResult => {
    const cardsDiv = document.createElement("div")
    cardsDiv.innerHTML = 
    `
    <div class="card">
      <div class="card-top">
        <img class="card-img" src=${filteredResult.image} alt="${filteredResult.name} image couldn't load">
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
    containerDiv.appendChild(cardsDiv);
  })
  
  seeMoreBtn.addEventListener('click', () => displayAllData(results));
}

// const sortDataOnClick = () => {
//   console.log("data");
// }

// sortDataOnClick();

const displayAllData = (dataArr) => {
  console.log("hi", dataArr);
  containerDiv.innerHTML = '';

  const newDataArr = [...dataArr]
  newDataArr.map(newData => {
    const cardsDiv = document.createElement("div");
    cardsDiv.innerHTML = 
    `
    <div class="card">
      <div class="card-top">
        <img class="card-img" src=${newData.image} alt="${newData.name}">
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
          <p class="card-publish-date"><i class="fa-regular fa-calendar"></i> ${newData.published_in}</p></div>
        <div onclick="displayBlogDetails(${newData.id})" class="right">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
      </div>
    `;
    containerDiv.appendChild(cardsDiv);
  })
  seeMoreBtn.style.display = "none";
}

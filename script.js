
const dataContainerDiv = document.getElementById("data-container");
const seeMoreBtn = document.getElementById("see-more-btn");
const loaderDiv = document.getElementById("loader");
const sortByDateBtn = document.getElementById("sort-by-date-btn");
const modalDiv = document.getElementsByClassName("modal")[0];

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

const loadBlogDetails = (id) => {
  loaderDiv.style.display = "block";

  let newId = +(id);
  if (newId < 10) {
    newId = "0" + newId;
  }

  fetch(`https://openapi.programming-hero.com/api/ai/tool/${newId}`)
  .then(res => res.json())
  .then(data => displayBlogDetails(data.data))
};

const displayBlogDetails = (data) => {
  loaderDiv.style.display = "none";
  console.log(data);

  modalDiv.style.display = "block";
  const modalContentDiv = document.getElementsByClassName("modal-content")[0];

  data.integrations.map(p => console.log(p));
  
  modalContentDiv.innerHTML =
    `<span class="close">&times;</span>
    <div class="content">
      <div class="left">
        <div class="content-description">
          <h3>${data.description}</h3>
        </div>
        <div class="content-subscription">
          <div class="sub1">${data.pricing[0].price} ${data.pricing[0].plan}</div>
          <div class="sub2">${data.pricing[1].price} ${data.pricing[1].plan}</div>
          <div class="sub3">${data.pricing[2].price} ${data.pricing[2].plan}</div>
        </div>
        <div class="features-and-integrations">
          <div class="features">
          <h3>Features</h3>
            <ul>
              <li>${data.features[1].feature_name}</li>
              <li>${data.features[2].feature_name}</li>
              <li>${data.features[3].feature_name}</li>
            </ul>
          </div>
          <div class="integration">
          <h3>Integrations</h3>
          <ul>
          <li>${data.integrations[0]}</li>
          <li>${data.integrations[1]}</li>
          <li>${data.integrations[2]}</li>
          </ul>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="top">
        <img src=${data.image_link[0]} alt="" />
        </div>
        <div class="bottom">
        <h4>${data.input_output_examples[0].input}</h4>
        <p>${data.input_output_examples[0].output}</p>
        </div>
      </div>
    </div>
  `;
  modalDiv.appendChild(modalContentDiv);
  const closeModalBtn = document.getElementsByClassName("close")[0];
  closeModalBtn.addEventListener("click", () => {
    modalDiv.style.display = "none";
  })
}


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
        <div onclick="loadBlogDetails(${filteredResult.id})" class="right">
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
  if (data) {
    data.sort((a, b) => a.published_in - b.published_in);
    data.isSorted = true;
  }
  if (data.isSorted) {
    displayAllData(data)
  } else {
    if (alert("already sorted!")) {
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
        <div onclick="loadBlogDetails(${newData.id})" class="right">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </div>
    `;
    dataContainerDiv.appendChild(cardsDiv);
  })
  seeMoreBtn.style.display = "none";
}

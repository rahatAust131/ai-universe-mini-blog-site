
const dataContainerDiv = document.getElementById("data-container");
const seeMoreBtn = document.getElementById("see-more-btn");
const loaderDiv = document.getElementById("loader");
const sortByDateBtn = document.getElementById("sort-by-date-btn");
const modalDiv = document.getElementsByClassName("modal")[0];
let displayDataState = '';

sortByDateBtn.style.display = "none";
seeMoreBtn.style.display = "none";
loaderDiv.style.display = "block";

const loadData = () => {
  loaderDiv.style.display = "block";
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res => res.json())
    .then(data => displaySomeData(data.data.tools))
};

loadData();
displayDataState = "some";

const displaySomeData = (results) => {
  loaderDiv.style.display = "none";

  const data = [...results];

  const filteredDataArr = []
  for (let i = 0; i < data.length / 2; i++) {
    filteredDataArr[i] = data[i];
  }

  filteredDataArr.forEach(newData => {
    const cardsDiv = document.createElement("div");
    cardsDiv.innerHTML =
      `<div class="card">
      <div class="card-top">
      <img class="card-img" src=${newData.id == "06" || newData.id == "11" ? "https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg" : newData.image} alt="${newData.name} image couldn't load">
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

  sortByDateBtn.style.display = "block";
  seeMoreBtn.style.display = "block";

  seeMoreBtn.addEventListener('click', () => {
    dataContainerDiv.innerHTML = '';
    displayAllData(data);
    displayDataState = "all";
  });

  sortByDateBtn.addEventListener('click', () => sortDataOnClick(data));

};


const loadBlogDetails = (id) => {
  let newId = +(id);
  if (newId < 10) {
    newId = "0" + newId;
  }
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${newId}`)
    .then(res => res.json())
    .then(data => displayBlogDetails(data.data))
};

const displayBlogDetails = (data) => {
  modalDiv.style.display = "block";
  const modalContentDiv = document.getElementsByClassName("modal-content")[0];

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
        <img class="card-img" src=${data.id == "06" || data.id == "11" ? "https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg" : data.image_link[0]} alt="${data.name} image couldn't load">
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
  });
};


const displayAllData = (dataArr) => {
  const newDataArr = [...dataArr];
  dataContainerDiv.innerHTML = '';
  newDataArr.forEach(newData => {
    const cardsDiv = document.createElement("div");
    cardsDiv.innerHTML =
      `<div class="card">
      <div class="card-top">
      <img class="card-img" src=${newData.id == "06" || newData.id == "11" ? "https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg" : newData.image} alt="${newData.name} image couldn't load">
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

  sortByDateBtn.addEventListener('click', () => sortDataOnClick(dataArr));
  displayDataState = "all";
};

const sortDataOnClick = (data) => {
  dataContainerDiv.innerHTML = "";
  const sortedData = [...data].sort(
    (objA, objB) => Number(new Date(objA.published_in)) - Number(new Date(objB.published_in))
  );

  displayDataState === "all" ? displayAllData(sortedData) : displaySomeData(sortedData);
};
const createElement = (arr) => {
    const htmlElements = arr.map((el) => `<span class = "btn">${el}</span>`);
    return (htmlElements.join("")); 
}

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }

    else {
        document.getElementById('word-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // return promise of response
        .then(res => res.json()) // Promise of json data
        .then(json => displayLesson(json.data));
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButtons);
    lessonButtons.forEach(btn => btn.classList.remove("active"));
    
}
    
const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive() // remove all active class
            const clickedBtn = document.getElementById(`lesson-btn-${id}`)
            // console.log(clickedBtn);
            clickedBtn.classList.add("active") // add active class 
            displayLevelWord(data.data)
        })

}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
    
}

/*
"data": {
"word": "Eager",
"meaning": "আগ্রহী",
"pronunciation": "ইগার",
"level": 1,
"sentence": "The kids were eager to open their gifts.",
"points": 1,
"partsOfSpeech": "adjective",
"synonyms": [
"enthusiastic",
"excited",
"keen"
],
"id": 5
*/
const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById('details-container')
    detailsBox.innerHTML = `
    <div>
        <h2 class="text-2xl font-bold ">${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})</h2>
      </div>
      <div>
        <h2 class="font-bold ">Meaning</h2>
        <p class="font-bangla">${word.meaning}</p>
      </div>
      <div>
        <h2 class="font-bold ">Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div>
        <h2 class="font-bold ">Synonym</h2>
        <div>${createElement(word.synonyms)} </div>
      </div>
    `
    document.getElementById('word_modal').showModal()
    
}

/**
 * "id": 15,
"level": 5,
"word": "Obstinate",
"meaning": "একগুঁয়ে",
"pronunciation": "অবস্টিনেট"
 */


const displayLevelWord = (words) => {
    const wordContaienr = document.getElementById('word-container');
    wordContaienr.innerHTML = "";

    if (words.length == 0) {
        wordContaienr.innerHTML = `
        <div class="text-center py-10 col-span-3">
        <span class= "text-gray-500 text-8xl pt-10"><i class="fa-solid fa-bug"></i></span>
        <p class="  font-bangla text-gray-500 pt-10 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>

    
          <h2 class="text-2xl  font-bangla text-gray-500 font-semibold ">নেক্সট Lesson এ যান</h2>
        </div>
        `
        manageSpinner(false)
        return;
    }

    words.forEach(word => {
        const card = document.createElement('div');
        card.innerHTML = `
         <div class="bg-white rounded-xl shadow-md text-center py-10 px-6 space-y-4">
          <h2 class="font-bold text-2xl">${word.word ? word.word : "Not Found"}</h2>
          <p class="font-semibold ">Meaning or proronoi</p>

         <div class="font-bangla text-2xl font-medium text-gray-600">"${word.meaning ? word.meaning : "Meaning not added Yet" } / ${word.pronunciation ? word.pronunciation: "pronunciation not found"}"</div>
         <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#e9f4ff10] hover:bg-[#e9f4ff]"><i class="fa-solid fa-circle-info text-gray-600"></i></button>
          <button class="btn bg-[#e9f4ff10] hover:bg-[#e9f4ff]"><i class="fa-solid fa-volume-low text-gray-600"></i></button>
         </div>
        </div>
        `
        wordContaienr.appendChild(card)

    })
    manageSpinner(false);
}



const displayLesson = (lessons) => {
    // 1 ge the container & empty
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    // 2 get into every lessons
    for (let lesson of lessons) {
        // 3 Create element 
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick= "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `;

        // 4 append into container
        levelContainer.append(btnDiv)


    }



}

loadLessons();

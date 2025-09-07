const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // return promise of response
        .then(res => res.json()) // Promise of json data
        .then(json => displayLesson(json.data));
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data))

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
        return;
    }

    words.forEach(word => {
        const card = document.createElement('div');
        card.innerHTML = `
         <div class="bg-white rounded-xl shadow-md text-center py-10 px-6 space-y-4">
          <h2 class="font-bold text-2xl">${word.word}</h2>
          <p class="font-semibold ">Meaning or proronoi</p>

         <div class="font-bangla text-2xl font-medium text-gray-600">"${word.meaning} / ${word.pronunciation}"</div>
         <div class="flex justify-between items-center">
          <button class="btn bg-[#e9f4ff10] hover:bg-[#e9f4ff]"><i class="fa-solid fa-circle-info text-gray-600"></i></button>
          <button class="btn bg-[#e9f4ff10] hover:bg-[#e9f4ff]"><i class="fa-solid fa-volume-low text-gray-600"></i></button>
         </div>
        </div>
        `
        wordContaienr.appendChild(card)

    })

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
        <button onclick= "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `;

        // 4 append into container
        levelContainer.append(btnDiv)


    }



}

loadLessons();

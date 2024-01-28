const search=document.querySelector('form.search')
const input = document.querySelector('input#input-box')
const image = document.querySelector('.ch-img');
const AnimeName=document.querySelector('.ch-name');
const genre = document.querySelector('.ch-genre');
const infolink = document.querySelector('a#link')
const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

// const preloader = document.querySelector(".preloader");


search.addEventListener('submit', (e) => {
    e.preventDefault();
    audio.play();

    const location = input.value;

    fetchData(location)
        .then(result => {
            console.log(result, "result");
            if(image.firstChild){
            image.removeChild(image.firstChild)

            }
            // genre.textContent = result.duration;
            // info.textContent = result.url;
            AnimeName.textContent=result.title
            AnimeName.setAttribute('title',result.title)
            infolink.setAttribute('href',result.url)
            // image.style.backgroundImage = `url(${result.images.jpg.image_url})`;
            const img = document.createElement('img');
            img.src = result.images.jpg.image_url;
            image.appendChild(img);
            genre.textContent = result.genres.map((anime) => anime.name).join(' ')
            
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});

console.log(search);

function fetchData(anime) {
    
    return fetch(`https://api.jikan.moe/v4/anime?q=${anime}&sfw`)
        .then(res => res.json())
        .then(res => res.data[0])
        .catch(error => {
            console.error("Error fetching data:", error);
            throw error; // Re-throw the error to handle it in the calling code
        });
}


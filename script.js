const APIURL = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const search_res = document.getElementById('search-res');
const total_records = document.getElementById('total-records');


async function getMovies(url){
    const response = await fetch(url);
    const resData = await response.json();

    console.log(resData)

    if(resData.results.length==0){
        search_res.innerHTML='No Results Found'
        total_records.innerHTML=''
    } else {
        total_records.innerHTML='Total Records '+resData.total_results;
    }

    showMovies(resData.results)
}

getMovies(APIURL);

function showMovies(movies){
    main.innerHTML='';
    movies.forEach((movie) => {
        const movieEl = document.createElement("div")
        movieEl.classList.add('movie')
        let posterPath;
        if(movie.poster_path!=null){
            posterPath =IMGPATH+movie.poster_path;
        } else {
            posterPath = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png'
        }
        
        movieEl.innerHTML=`<img src="${posterPath}" alt=""> 
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <span class='${getClassByRate(movie.vote_average)}'><i class="fa-solid fa-star"></i>${movie.vote_average}</span>
        </div>`
        main.appendChild(movieEl)
    });
}

function getClassByRate(vote){
    if(vote>=8){
        return "green"
    } else if(vote>=5){
        return "orange"
    } else{
        return "red";
    }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCHAPI+searchTerm)
        search.value=searchTerm;

        search_res.innerHTML = 'Search Results for '+searchTerm;

    }else{
        getMovies(APIURL);
    }
})
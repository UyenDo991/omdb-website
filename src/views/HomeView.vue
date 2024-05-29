<script setup>
import { onMounted, ref } from "vue";
import { getNowPlayling, getMovieUpcoming, getMovieGenres, getMoviePopular, getMovieTrendingList, getMovieGenresList, getCollectionFilmsList, getMovieVideos } from "@/api/api";
// import { useRouter } from "vue-router";
import { chunkArray } from "@/utils/index";
import { getPosterImage } from "@/utils/index";
import { formatNumber } from "@/utils/index";
// const router = useRouter();

const nowPlayingList = ref([]);
const movieUpcomingList = ref([]);
const moviePopularList = ref([]);
const movieList = ref([]);
const movieTrendingList = ref([]);
const collectionFilmsList = ref([]);
const trailerClip = ref({});


onMounted(async () => {
  const res = await getNowPlayling();
  console.log(res);
  if (res && res.results.length) {
    const chunk = chunkArray(res.results, 4);
    if (chunk.length) {
      nowPlayingList.value = [...chunk];
    }
  }
  //console.log('----------nowPlayingList-------------');
  //console.log(nowPlayingList.value);
  //movie upcoming
  const res_movies_upcoming = await getMovieUpcoming();
  if (res_movies_upcoming && res_movies_upcoming.results.length) {
    const chunk_movies_upcoming = chunkArray(res_movies_upcoming.results, 3);
    if (chunk_movies_upcoming.length) {
      movieUpcomingList.value = [...chunk_movies_upcoming];
    }
  }
  //console.log('----------movieUpcomingList-------------');
  //console.log(movieUpcomingList.value);
  //console.log(res_movies_upcoming.total_pages);
  //movie popular
  const res_movies_popular = await getMoviePopular();
  if (res_movies_popular && res_movies_popular.results.length) {
    const chunk_movies_popular = res_movies_popular.results;
    if (chunk_movies_popular.length) {
      moviePopularList.value = chunk_movies_popular;
    }
  }
  //console.log('----------moviePopularList-------------' + res_movies_popular.results.length);
  //console.log(moviePopularList.value);

  //Movie genres
  const res_movie = await getMovieGenres();

  //console.log('res_movie');
  //console.log(res_movie);
  if (res_movie && res_movie.genres.length) {
    const chunk_movie_genres = res_movie.genres.filter(x => [28, 35, 27, 10402].includes(x.id));
    if (chunk_movie_genres.length) {
      movieList.value = chunk_movie_genres;
      await fetchDataMovieList(movieList.value[0].id);
    }
  }
  //console.log('----------movieList-------------');
  console.log(movieList.value);
  //TV trending list
  const res_movie_trending = await getMovieTrendingList();
  //console.log(res_tv_trending);
  if (res_movie_trending && res_movie_trending.results.length) {
    const chunk_movie_trending = chunkArray(res_movie_trending.results, 5);
    if (chunk_movie_trending.length) {
      movieTrendingList.value = [...chunk_movie_trending];
    }
    //console.log("movieTrendingList : ");
    //console.log(movieTrendingList);
  }
  //console.log('----------movieTrendingList-------------');
  //console.log(movieTrendingList.value);

  //List collection films
  const collect_id = 1241;
  const res_collection = await getCollectionFilmsList(collect_id);
  // console.log(res_collection);
  if (res_collection && res_collection.parts.length) {
    const chunk_collection = chunkArray(res_collection.parts, 4);
    if (chunk_collection.length) {
      collectionFilmsList.value = [...chunk_collection];
    }
  }
  //End
})

//List films series 
const filmsMovieList = ref([]);
async function fetchDataMovieList(genres_id) {
  try {
    //console.log("genres_id : " + genres_id);
    const res_flimsMovieList = await getMovieGenresList(genres_id);
    // console.log("flimsTVList:", res_flimsMovieList);
    if (res_flimsMovieList && res_flimsMovieList.results.length) {
      const chunk_list_movie = chunkArray(res_flimsMovieList.results.slice(0, 4), 2);
      filmsMovieList.value = [...chunk_list_movie];
      //console.log('filmsMovieList.value');
      //console.log(filmsMovieList);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
//get data modal
// getDataModal(films.id);
async function getDataModal(id, name) {
  const title_name = name;
  console.log("films_id : " + id);
  const videoList = await getMovieVideos(id);
  const trailers = videoList.results.filter(x => x.type === "Trailer");
  trailerClip.value = trailers.length ? trailers[trailers.length - 1] : null;
  console.log('trailerClip');
  console.log(trailerClip.value);
}
//Goi hàm
</script>
<template>
  <section id="center" class="center_home">
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(movie, index) in moviePopularList" :key="index"
          :class="index === 0 ? 'carousel-item active' : 'carousel-item'">
          <!-- <img :src="getPosterImage(movie.poster_path)" class="d-block w-100" alt="..."
            style="object-fit: contain;height: 800px;"> -->
          <router-link :to="`/movies/${movie.id}`"><img :src="getPosterImage(movie.poster_path)" class="w-100"
              alt="...." style="height: 1000px;"></router-link>
          <div class="carousel-caption d-md-block">
            <h1 class="font_60">{{ movie.original_title }}</h1>
            <h6 class="mt-3">
              <span class="col_red me-3" v-for="index in Math.round(movie.vote_average / 2)" :key="index">
                <i class="fa fa-star"></i>
              </span>
              <span class="col_red me-3" v-for="index in Math.round(5 - (movie.vote_average / 2))" :key="index">
                <i class="fa fa-star-o"></i>
              </span>
              <p class="mt-3 text-truncate">{{ movie.release_date }}</p>
              <!-- <a class="bg_red p-2 pe-4 ps-4 ms-3 text-white d-inline-block" href="#">Action</a> -->
            </h6>
            <p class="mt-3" style="width: 30%;display: inline-block;">{{ movie.overview }}</p>
            <p class="mb-0">{{ formatNumber(movie.popularity) }} Views</p>
            <router-link :to="`/movies/${movie.id}`">
              <h6 class="mb-0"><a class="button" href="#"><i class="fa fa-play-circle align-middle me-1"></i> Watch
                  Trailer</a></h6>
            </router-link>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>

  <!-- Latest Movie -->
  <!-- <LatestMovies :items="nowPlayingList" /> -->
  <section id="latest" class="pt-4 pb-5">
    <div class="container">
      <div class="row latest_1">
        <div class="col-md-6 col-6">
          <div class="latest_1l">
            <h4 class="mb-0"><i class="fa fa-youtube-play align-middle col_red me-1"></i> Latest <span
                class="col_red">Movies</span></h4>
          </div>
        </div>
        <div class="col-md-6 col-6">
          <div class="latest_1r text-end">
            <router-link :to="`/movies/list/now_playing`">
              <h6 class="mb-0"><a class="button" href="#"> View All</a></h6>
            </router-link>
          </div>
        </div>
      </div>
      <div class="row latest_2 mt-4">
        <div id="carouselExampleCaptions1" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button v-for="(itemNowplaying, index) in nowPlayingList" :key="index" type="button"
              data-bs-target="#carouselExampleCaptions1" :data-bs-slide-to="index" :class="index === 0 ? 'active' : ''"
              :aria-label="`Slide ${index}`"></button>
          </div>
          <div class="carousel-inner">
            <div v-for="(itemNowplaying, index) in nowPlayingList" :key="index"
              :class="index === 0 ? 'carousel-item active' : 'carousel-item'">
              <div class="latest_2i row">
                <div v-for="movieNowplaying in itemNowplaying" :key="movieNowplaying.id" class="col-md-3 col-6">
                  <div class="latest_2im clearfix position-relative">
                    <div class="latest_2im1 clearfix">
                      <div class="grid">
                        <figure class="effect-jazz mb-0">
                          <router-link :to="`/movies/${movieNowplaying.id}`"><img
                              :src="getPosterImage(movieNowplaying.poster_path)" class="w-100" alt="...."></router-link>
                        </figure>
                      </div>
                    </div>
                  </div>
                  <div class="latest_2ilast bg_grey p-3 clearfix" style="height: 174px;">
                    <h5><a class="col_red" href="#">{{ movieNowplaying.original_title }}</a></h5>
                    <p class="mb-2 text-truncate">{{ movieNowplaying.overview }}</p>
                    <span class="col_red" v-for="index in Math.round(movieNowplaying.vote_average / 2)" :key="index">
                      <i class="fa fa-star"></i>
                    </span>
                    <p class="mb-0">{{ formatNumber(movieNowplaying.popularity) }} Views</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Latest Movie -->
  <!-- Films Upcoming -->
  <!-- <FilmsUpcoming :items="movieUpcomingList" /> -->
  <section id="upcome" class="pt-4 pb-5">
    <div class="container">
      <div class="row trend_1">
        <div class="col-md-6 col-6">
          <div class="trend_1l">
            <h4 class="mb-0"><i class="fa fa-youtube-play align-middle col_red me-1"></i> Films <span
                class="col_red">Upcoming</span></h4>
          </div>
        </div>
        <div class="col-md-6 col-6">
          <div class="trend_1r text-end">
            <router-link :to="`/movies/list/upcoming`">
              <h6 class="mb-0"><a class="button" href="#"> View All</a></h6>
            </router-link>
          </div>
        </div>
      </div>
      <div class="row trend_2 mt-4">
        <div id="carouselExampleCaptions2" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button v-for="(itemUpcoming, index) in movieUpcomingList" :key="index" type="button"
              data-bs-target="#carouselExampleCaptions2" :data-bs-slide-to="index" :class="index === 0 ? 'active' : ''"
              :aria-label="`Slide ${index}`"></button>
          </div>
          <div class="carousel-inner">
            <div v-for="(itemUpcoming, index) in movieUpcomingList" :key="index" class="carousel-item"
              :class="index === 0 ? 'active' : ''">
              <div class="trend_2i row">
                <div v-for="movieUpcoming in itemUpcoming" :key="movieUpcoming.id" class="col-md-4">
                  <div class="trend_2im clearfix position-relative">
                    <div class="trend_2im1 clearfix">
                      <div class="grid">
                        <figure class="effect-jazz mb-0">
                          <router-link :to="`/movies/${movieUpcoming.id}`"><img
                              :src="getPosterImage(movieUpcoming.poster_path)" class="w-100" alt="..."></router-link>
                        </figure>
                      </div>
                    </div>
                  </div>
                  <div class="trend_2ilast bg_grey p-3 clearfix">
                    <h5><a class="col_red" href="#">{{ movieUpcoming.original_title }}</a></h5>
                    <p class="mb-2 text-truncate">{{ movieUpcoming.overview }}</p>
                    <span class="col_red" v-for="index in Math.round(movieUpcoming.vote_average / 2)" :key="index">
                      <i class="fa fa-star"></i>
                    </span>
                    <p class="mb-0">{{ formatNumber(movieUpcoming.popularity) }} Views</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--End Films Upcoming -->
  <!--List Films Movie -->
  <section id="popular" class="pt-4 pb-5 bg_grey">
    <div class="container">
      <div class="row trend_1">
        <div class="col-md-12">
          <div class="trend_1l">
            <h4 class="mb-0"><i class="fa fa-youtube-play align-middle col_red me-1"></i> <span class="col_red">Films
                Categories</span></h4>
          </div>
        </div>
      </div>
      <div class="row popular_1 mt-4">
        <ul class="nav nav-tabs border-0 mb-0">
          <li class="nav-item" v-for="(itemmovieList, index) in movieList" :key="itemmovieList.id">
            <a href="#" data-bs-toggle="tab" aria-expanded="false" :id="itemmovieList.id"
              :class="index === 0 ? 'nav-link active' : 'nav-link'" @click="fetchDataMovieList(itemmovieList.id)">
              <span class="d-md-block">{{ itemmovieList.name }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="popular_2 row mt-4">
        <div class="tab-content">
          <div class="tab-pane active" v-for="(itemFlimsMovie, index) in filmsMovieList" :key="index">
            <div class="popular_2i row mt-4">
              <div class="col-md-6" v-for="films in itemFlimsMovie" :key="films.id">
                <div class="popular_2i1 row">
                  <div class="col-md-4 col-4">
                    <div class="popular_2i1lm position-relative clearfix">
                      <div class="popular_2i1lm1 clearfix">
                        <div class="grid">
                          <figure class="effect-jazz mb-0">
                            <router-link :to="`/movies/${films.id}`"><img :src="getPosterImage(films.poster_path)"
                                class="w-100" alt="..."></router-link>
                          </figure>
                        </div>
                      </div>
                      <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                        <ul>
                          <li class="d-inline-block" data-bs-toggle="modal" data-bs-target="#productModal"
                            @click="getDataModal(films.id, films.original_title)" replace><a href="#"><i
                                class="fa fa-play col_red"></i></a>
                          </li>
                          <li class="d-inline-block">
                            <router-link :to="`/movies/${films.id}`"><i class="fa fa-search col_red"></i></router-link>
                          </li>
                          <li class="d-inline-block"><a href="#"><i class="fa fa-heart-o col_red"></i></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8 col-8">
                    <div class="popular_2i1r">
                      <h5><a class="col_red" href="#">{{ films.original_title }}</a></h5>
                      <h6> Imdb {{ films.vote_average }} <span class="ms-2"><i
                            class="fa fa-star col_red me-1"></i></span> Year : {{ films.release_date }}
                        <!-- <span class="ms-2 ">Runtime: {{ films.release_date }}</span> -->
                      </h6>
                      <p class="ms-2 text-truncate-2">{{ films.overview }}</p>
                      <h6 class="mb-0">
                        <router-link :to="`/movies/${films.id}`" class="button">More Info - Trailer</router-link>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--End  List Films Movie-->
  <!-- TV Trending -->
  <!-- <movieTrendingList :items="movieTrendingList" /> -->
  <section id="trend" class="pb-10 pt-4">
    <div class="container">
      <div class="row trend_1">
        <div class="col-md-6 col-6">
          <div class="trend_1l">
            <h4 class="mb-0"><i class="fa fa-youtube-play align-middle col_red me-1"></i><span class="col_red">Movie
                Trending</span> List</h4>
          </div>
        </div>
        <div class="col-md-6 col-6">
          <div class="trend_1r text-end">
            <router-link :to="`/movies/list/trending`">
              <h6 class="mb-0"><a class="button" href="#"> View All</a></h6>
            </router-link>
          </div>
        </div>
      </div>
      <div class="row trend_2 mt-4">
        <div id="carouselExampleCaptions4" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button v-for="(itemTrending, index) in movieTrendingList" :key="index" type="button"
              data-bs-target="#carouselExampleCaptions4" :data-bs-slide-to="index" :class="index === 0 ? 'active' : ''"
              :aria-label="`Slide ${index}`"></button>
          </div>
          <div class="carousel-inner">
            <div v-for="(itemTrending, index) in movieTrendingList" :key="index"
              :class="index === 0 ? 'carousel-item active' : 'carousel-item'">
              <div class="trend_2i row">
                <div v-for="movieTrending in itemTrending" :key="movieTrending.id" class="col">
                  <div class="trend_2im clearfix position-relative">
                    <div class="trend_2im1 clearfix">
                      <div class="grid">
                        <figure class="effect-jazz mb-0">
                          <router-link :to="`/movies/${movieTrending.id}`"><img
                              :src="getPosterImage(movieTrending.poster_path)" class="w-100" alt="...."
                              style="height: 400px; object-fit: cover;"></router-link>
                          <!-- <a href="#"><img :src="getPosterImage(tvTrending.poster_path)" class="w-100" alt="..."
                              style="height: 400px; object-fit: cover;"></a> -->
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--End TV Trending -->
  <!-- List drama -->
  <section id="collection" class="pb-5 pt-4">
    <div class="container">
      <div class="row trend_1">
        <div class="col-md-6 col-6">
          <div class="trend_1l">
            <h4 class="mb-0"><i class="fa fa-youtube-play align-middle col_red me-1"></i> Movie <span
                class="col_red">Harry Potter Collection</span></h4>
          </div>
        </div>
        <!-- <div class="col-md-6 col-6">
          <div class="trend_1r text-end">
            <h6 class="mb-0"><a class="button" href="#"> View All</a></h6>
          </div>
        </div> -->
      </div>
      <div class="row trend_2 mt-4">
        <div id="carouselExampleCaptions5" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button v-for="(item, index) in collectionFilmsList" :key="index" type="button"
              data-bs-target="#carouselExampleCaptions5" :data-bs-slide-to="index" :class="index === 0 ? 'active' : ''"
              aria-label="`Slide ${index}`" aria-current="true"></button>
          </div>
          <div class="carousel-inner">
            <div v-for="(item, index) in collectionFilmsList" :key="index"
              :class="index === 0 ? 'carousel-item active' : 'carousel-item'">
              <div class="trend_2i row">
                <div v-for="movie in item" :key="movie.id" class="col-md-3 col-4">
                  <div class="trend_2im clearfix position-relative">
                    <div class="trend_2im1 clearfix">
                      <div class="grid">
                        <figure class="effect-jazz mb-0">
                          <router-link :to="`/movies/${movie.id}`"><img :src="getPosterImage(movie.poster_path)"
                              class="w-100" alt="...." style="height:350px; "></router-link>
                        </figure>
                      </div>
                    </div>
                    <div class="mt-5">
                      <h5><a class="col_red" href="#">{{ movie.original_title }}</a></h5>
                      <span class="col_red" v-for="index in Math.round(movie.vote_average / 2)" :key="index">
                        <i class="fa fa-star"></i>
                      </span>
                      <span class="col_red" v-for="index in Math.round(5 - (movie.vote_average / 2))" :key="index">
                        <i class="fa fa-star-o"></i>
                      </span>
                      <p class="mb-0">{{ formatNumber(movie.popularity) }} Views</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal">
    Launch demo modal
  </button>
  <!-- Modal -->
  <div class="modal fade bd-example-modal-lg" id="productModal" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" v-if="trailerClip">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="productModalLabel" style="color: black;">{{ trailerClip.name }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <v-card color="transparent">
            <iframe width="800" height="480" :src="`https://www.youtube.com/embed/${trailerClip.key}`" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
          </v-card>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

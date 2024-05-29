<script setup>
import { watch, ref } from "vue";
import { getNowPlayling, getMovieUpcoming, getMovieTrendingList, getMovieGenres, getMovieDetails, getMovieGenresList } from "@/api/api";
import { useRoute } from "vue-router";
import { getPosterImage } from "@/utils/index";
// import ListViewFilms from "@/components/ListViewFilms.vue";

const route = useRoute();
// const router = useRouter();
const res = ref({}); // Khai báo ref cho biến res
const listFilmsView = ref([]); // Khai báo ref cho biến listFilmsView
const listGenresView = ref([]); // Khai báo ref cho biến listGenresView
var title_type = "";

const getViewListType = async (film_type) => {
  console.log(film_type);
  if (film_type === "now_playing") {
    res.value = await getNowPlayling(); // Sử dụng res.value để gán giá trị mới
    title_type = "List Now Playing Flims";
  }
  else if (film_type === "upcoming") {
    res.value = await getMovieUpcoming(); // Sử dụng res.value để gán giá trị mới
    title_type = "List Upcoming Flims";
  }
  else if (film_type === "trending") {
    res.value = await getMovieTrendingList(); // Sử dụng res.value để gán giá trị mới
    title_type = "List Trending Flims";
  }
  //detailsList.push(title_type);
  if (res.value && res.value.results.length) {
    listFilmsView.value = res.value.results; // Gán danh sách các phim mới vào listFilmsView.value
    getGenres();
  }
  //List thể loại
  const res_genres = await getMovieGenres();
  if (res_genres && res_genres.genres.length) {
    listGenresView.value = res_genres.genres;
    //console.log(res_genres);
  }
  //console.log(detailInfo.value);
  // Kết thúc
}

//
const selectedGenres = [];

const onChange = (event) => {
  if (event.target.checked === true) {
    selectedGenres.push(event.target.value);
    //console.log(selectedGenres);
  } else {
    const index = selectedGenres.indexOf(event.target.value);
    if (index !== -1) {
      // Loại bỏ giá trị khỏi mảng nếu checkbox không được chọn
      selectedGenres.splice(index, 1);
    }
  }
  fetchDataMovieList(selectedGenres);
}
async function fetchDataMovieList(genres_id) {
  try {
    listFilmsView.value = [];
    //console.log("genres_id : " + genres_id);
    const res_flimsMovieList = await getMovieGenresList(genres_id);
    // console.log("flimsTVList:", res_flimsMovieList);
    if (res_flimsMovieList && res_flimsMovieList.results.length) {
      const chunk_list_movie = res_flimsMovieList;
      listFilmsView.value = chunk_list_movie.results;
      getGenres();
      //console.log('checkbox');
      //console.log(filmsMovieList.value);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
//funtion get push genres 
async function getGenres() {
  // Mảng để lưu trữ thông tin chi tiết của từng phim
  const detailsList = [];
  for (let i = 0; i < listFilmsView.value.length; i++) {
    const _id = listFilmsView.value[i].id;
    // Lấy thông tin chi tiết của phim với ID tương ứng
    const details = await getMovieDetails(_id);
    // Thêm thông tin chi tiết vào mảng detailsList
    detailsList.push(details);
  }
  // Gán mảng detailsList vào mỗi phim trong danh sách
  listFilmsView.value.forEach((film, index) => {
    film.details = detailsList[index];
  });
}
watch(() => route.params.film_type, async (film_type) => {
  // console.log('id:', val);
  await getViewListType(film_type);
}, { immediate: true })
//Goi hàm
</script>

<template>
  <section id="upcome" class="pt-4 pb-5">
    <div class="container">
      <div class="blog_1r">
        <div class="blog_1r1 p-4 mt-4">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <h4>Filter <span class="col_red">Genres</span></h4>
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <!-- button genres -->
                  <div v-for="itemGenre in listGenresView" :key="itemGenre.id" class="btn-group pt-5 pb-10" role="group"
                    aria-label="Basic checkbox toggle button group">
                    <input type="checkbox" class="btn-check" :id="'btncheck' + itemGenre.id" autocomplete="off"
                      :value="itemGenre.id" v-model="selectedGenres" @change="onChange">
                    <label class="btn btn-outline-danger" :for="'btncheck' + itemGenre.id">{{ itemGenre.name }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- button genres -->
      <div class="row trend_1">
        <div class="col-md-6 col-6">
          <div class="trend_1l">
            <h4 class="mb-0"><i class="fa fa-youtube-play align-middle col_red me-1"></i><span class="col_red">{{
              title_type
                }}</span></h4>
          </div>
        </div>
        <div class="col-md-6 col-6">
        </div>
      </div>
      <div class="row trend_2 mt-4">
        <div id="carouselExampleCaptions2" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="trend_2i row">
                <div v-for="item in listFilmsView" :key="item.id" class="col-md-3 col-6 mb-3">
                  <div class="trend_2im clearfix position-relative">
                    <div class="trend_2im1 clearfix">
                      <div class="grid">
                        <figure class="effect-jazz mb-0">
                          <router-link :to="`/movies/${item.id}`"><img :src="getPosterImage(item.poster_path)"
                              class="w-100" alt="..."></router-link>
                          <!-- <a href="#"><img :src="getPosterImage(item.poster_path)" class="w-100" -->
                          <!-- alt="img25"></a> -->
                        </figure>
                      </div>
                    </div>
                  </div>
                  <div class="trend_2ilast bg_grey p-3 clearfix" style="height: 250px">
                    <h5><a class="col_red" href="#">{{ item.original_title }}</a></h5>
                    <p class="mb-2 text-truncate">{{ item.overview }}</p>
                    <span class="col_red" v-for="index in Math.round(item.vote_average / 2)" :key="index">
                      <i class="fa fa-star"></i>
                    </span>
                    <ul>
                      <span>Genres :</span>
                      <li class="d-inline-block me-1">
                        <a href="#" v-for="(genre, index) in item.details.genres" :key="index">{{ genre.name }}{{ index
                          < item.details.genres.length - 1 ? ', ' : '' }}</a>
                      </li>
                    </ul>
                    <p class="mb-0">{{ item.popularity }} Views</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<!-- toRefs : cập nhật props  -->
<script setup>
import { getMovieGenresList } from "@/api/api";
import { ref, toRefs } from 'vue';
import { getPosterImage } from "@/utils/index";
const props = defineProps({
  items: Array,
  items_genres: Array,
  title: String,
});

const { items, items_genres, title } = toRefs(props);
const selectedGenres = [];
const filmsMovieList = ref([]);

getDataBasic();
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
  if (selectedGenres.length > 0) {
    //console.log(selectedGenres);
    fetchDataMovieList(selectedGenres);

  } else {
    getDataBasic();
  }
  console.log(selectedGenres);
}
async function fetchDataMovieList(genres_id) {
  try {
    //console.log("genres_id : " + genres_id);
    const res_flimsMovieList = await getMovieGenresList(genres_id);
    // console.log("flimsTVList:", res_flimsMovieList);
    if (res_flimsMovieList && res_flimsMovieList.results.length) {
      const chunk_list_movie = res_flimsMovieList;
      filmsMovieList.value = chunk_list_movie.results;
      console.log('checkbox');
      console.log(filmsMovieList.value);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
async function getDataBasic() {
  filmsMovieList.value = items.value;
  console.log('getDataBasic');
  console.log(filmsMovieList.value);
}
//fillter cate
</script>
<template>
  <section id="upcome" class="pt-4 pb-5">
    <div class="container">
      <!-- button genres -->
      <div v-for="itemGenre in items_genres" :key="itemGenre.id" class="btn-group pt-5 pb-10" role="group"
        aria-label="Basic checkbox toggle button group">
        <input type="checkbox" class="btn-check" :id="'btncheck' + itemGenre.id" autocomplete="off"
          :value="itemGenre.id" v-model="selectedGenres" @change="onChange">
        <label class="btn btn-outline-danger" :for="'btncheck' + itemGenre.id">{{ itemGenre.name }}</label>
      </div>
      <!-- button genres -->
      <div class="row trend_1">
        <div class="col-md-6 col-6">
          <div class="trend_1l">
            <h4 class="mb-0"><i class="fa fa-youtube-play align-middle col_red me-1"></i><span class="col_red">{{ title
                }}</span></h4>
          </div>
        </div>
        <div class="col-md-6 col-6">
          <!-- <div class="trend_1r text-end">
            <h6 class="mb-0"><a class="button" href="#"> View All</a></h6>
          </div> -->
        </div>
      </div>
      <div class="row trend_2 mt-4">
        <div id="carouselExampleCaptions2" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="trend_2i row">
                <div v-for="item in filmsMovieList" :key="item.id" class="col-md-3 col-6 mb-3">
                  <div class="trend_2im clearfix position-relative">{{ item }}
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
<!-- toRefs : cập nhật props  -->
<script setup>

import { toRefs } from 'vue';
import { getPosterImage } from "@/utils/index";
const props = defineProps({
  items: Array,
  items_genres: Array,
  title: String,
});
const selectedGenres = ([]);
const { items, items_genres, title } = toRefs(props);

const onChange = (event)=>{
  if (event.target.checked == true) {
      selectedGenres.push(event.target.value);
      console.log(selectedGenres);
  }
  else { // Nếu checkbox không được chọn, loại bỏ giá trị của nó khỏi mảng
    // selectedGenres = selectedGenres.filter(item => item !== event.target.value);
    //selectedGenres = selectedGenres.filter(item => item !== event.target.value);
  }
  console.log(selectedGenres);
  // Hiển thị trạng thái của checkbox (true/false)
}
//fillter cate
</script>
<template>
  <section id="upcome" class="pt-4 pb-5">
    <div class="container">
      <!-- button genres -->
      <div v-for="itemGenre in items_genres" :key="itemGenre.id" class="btn-group pt-5 pb-10" role="group"
        aria-label="Basic checkbox toggle button group">
        <input type="checkbox" class="btn-check" :id="'btncheck' + itemGenre.id" autocomplete="off" :value="itemGenre.id"
          v-model="selectedGenres" @change="onChange">
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
                <div v-for="item in items" :key="item.id" class="col-md-3 col-6 mb-3">
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
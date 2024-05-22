<!-- toRefs : cập nhật props  -->
<script setup>
import { toRefs } from 'vue';
import { getPosterImage } from "@/utils/index";
const props = defineProps({
  items: Array
});
const { items } = toRefs(props);
</script>
<template>
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
            <h6 class="mb-0"><a class="button" href="#"> View All</a></h6>
          </div>
        </div>
      </div>
      <div class="row latest_2 mt-4">
        <div id="carouselExampleCaptions1" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button v-for="(item, index) in items" :key="index" type="button" data-bs-target="#carouselExampleCaptions1"
              :data-bs-slide-to="index" :class="index === 0 ? 'active' : ''" :aria-label="`Slide ${index}`"></button>
          </div>
          <div class="carousel-inner">
            <div v-for="(item, index) in items" :key="index"
              :class="index === 0 ? 'carousel-item active' : 'carousel-item'">
              <div class="latest_2i row">
                <div v-for="movie in item" :key="movie.id" class="col-md-3 col-6">
                  <div class="latest_2im clearfix position-relative">
                    <div class="latest_2im1 clearfix">
                      <div class="grid">
                        <figure class="effect-jazz mb-0">
                          <router-link :to="`/movies/${movie.id}`"><img :src="getPosterImage(movie.poster_path)" class="w-100" alt="img25"></router-link>
                        </figure>
                      </div>
                    </div>
                  </div>
                  <div class="latest_2ilast bg_grey p-3 clearfix" style="height: 174px;">
                    <h5><a class="col_red" href="#">{{ movie.original_title }}</a></h5>
                    <p class="mb-2 text-truncate">{{ movie.overview }}</p>
                    <span class="col_red" v-for="index in Math.round(movie.vote_average / 2)" :key="index">
                      <i class="fa fa-star"></i>
                    </span>
                    <p class="mb-0">{{ movie.popularity }} Views</p>
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
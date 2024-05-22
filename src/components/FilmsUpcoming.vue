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
            <h6 class="mb-0"><a class="button" href="#"> View All</a></h6>
          </div>
        </div>
      </div>
      <div class="row trend_2 mt-4">
        <div id="carouselExampleCaptions2" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button v-for="(itemUpcoming, index) in items" :key="index" type="button"
              data-bs-target="#carouselExampleCaptions2" :data-bs-slide-to="index" :class="index === 0 ? 'active' : ''"
              :aria-label="`Slide ${index}`"></button>
          </div>
          <div class="carousel-inner">
            <div v-for="(itemUpcoming, index) in items" :key="index" class="carousel-item"
              :class="index === 0 ? 'active' : ''">
              <div class="trend_2i row">
                <div v-for="movieUpcoming in itemUpcoming" :key="movieUpcoming.id" class="col-md-4">
                  <div class="trend_2im clearfix position-relative">
                    <div class="trend_2im1 clearfix">
                      <div class="grid">
                        <figure class="effect-jazz mb-0">
                          <a href="#"><img :src="getPosterImage(movieUpcoming.poster_path)" class="w-100"
                              alt="img25"></a>
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
                    <p class="mb-0">{{ movieUpcoming.popularity }} Views</p>
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
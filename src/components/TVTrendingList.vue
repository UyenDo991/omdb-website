<!-- toRefs : cập nhật props  -->
<script setup>
import { toRefs, defineProps } from 'vue';
import { getPosterImage } from "@/utils/index";
const props = defineProps({
  items: Array
});
const { items } = toRefs(props);
</script>
<template>
  <section id="trend" class="pb-10 pt-4">
    <div class="container">
      <div class="row trend_1">
        <div class="col-md-6 col-6">
          <div class="trend_1l">
            <h4 class="mb-0"><i class="fa fa-youtube-play align-middle col_red me-1"></i><span class="col_red">TV
                Trending</span> List</h4>
          </div>
        </div>
        <div class="col-md-6 col-6">
          <div class="trend_1r text-end">
            <h6 class="mb-0"><a class="button" href="#"> View All</a></h6>
          </div>
        </div>
      </div>
      <div class="row trend_2 mt-4">
        <div id="carouselExampleCaptions4" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button v-for="(item, index) in items" :key="index" type="button" data-bs-target="#carouselExampleCaptions4"
              :data-bs-slide-to="index" :class="index === 0 ? 'active' : ''" :aria-label="`Slide ${index}`"></button>
          </div>
          <div class="carousel-inner">
            <div v-for="(item, index) in items" :key="index"
              :class="index === 0 ? 'carousel-item active' : 'carousel-item'">
              <div class="trend_2i row">
                <div v-for="movie in item" :key="movie.id" class="col">
                  <div class="trend_2im clearfix position-relative">
                    <div class="trend_2im1 clearfix">
                      <div class="grid">
                        <figure class="effect-jazz mb-0">
                          <a href="#"><img :src="getPosterImage(movie.poster_path)" class="w-100" alt="..."
                              style="height: 400px; object-fit: cover;"></a>
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
</template>
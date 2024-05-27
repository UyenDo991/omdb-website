<!-- toRefs : cập nhật props  -->
<script setup>
import { getSearchData, getMovieDetails } from "@/api/api";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getPosterDtl, formatNumber } from "@/utils/index";
const route = useRoute();

const movieList = ref([]);
const res = ref({}); // Khai báo ref cho biến res

const getDetails = async (value) => {
  //Info
  res.value = await getSearchData(value);
  if (res.value.results.length > 0) {
    movieList.value = res.value.results;
  }
  console.log(movieList.value);
}
watch(() => route.params.search, async (val) => {
  console.log('val :', val);
  if (val) {
    await getDetails(val);
  }
}, { immediate: true })
//fillter cate
</script>
<template>

  <section id="upcome" class="pt-4 pb-5">
    <div class="container">
      <div class="row trend_1">
        <div class="col-md-6 col-6">
          <div class="trend_1l">
            <h4 class="mb-0"><i class="fa fa-youtube-play align-middle col_red me-1"></i><span class="col_red">Search
                List</span></h4>
          </div>
        </div>
      </div>
      <div class="row trend_2 mt-4">
        <div id="carouselExampleCaptions2" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="trend_2i row">
                <div v-for="item in movieList" :key="item.id" class="col-md-3 col-6 mb-3">
                  <div class="trend_2im clearfix position-relative">
                    <div class="trend_2im1 clearfix">
                      <div class="grid">
                        <figure class="effect-jazz mb-0">
                          <router-link :to="`/movies/${item.id}`"><img :src="getPosterDtl(item.poster_path)"
                              class="w-100" alt="..."></router-link>
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
<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { formatNumber, getPosterImage } from '@/utils/index';
import { getFavoriteMovies } from '@/api/api';
const { _accountInfo } = storeToRefs(useAuthStore());
const movieFavoriteList = ref({});
  //Load more
  let page = 1;
  const count_row = 4;
  let perPage = 0;
  let total_count = 0;
onMounted(async() =>  {
  const snowCanvas = document.querySelector('.snow-canvas');
  const numSnowflakes = 50;

  for (let i = 0; i < numSnowflakes; i++) {
    const snow = document.createElement('div');
    snow.classList.add('snow');
    snow.textContent = '❄';

    snow.style.left = getRandomIntInclusive(0, 95) + '%';
    snow.style.fontSize = getRandomIntInclusive(5, 20) + 'px';
    snow.style.opacity = getRandomIntInclusive(5, 10) * 0.1;
    snow.style.filter = `blur(${getRandomIntInclusive(0, 3)}px)`;

    snow.style.animationDuration = `${getRandomIntInclusive(3, 10)}s, ${getRandomIntInclusive(1, 3)}s`;

    snowCanvas.appendChild(snow);
  }
  //load list
  const favMovieList = await getFavoriteMovies();
  movieFavoriteList.value = favMovieList.results;

  perPage = count_row;
  await getLoadMoreData(movieFavoriteList.value, perPage);
  //Goi Loadmore

})
const onLoadMore = async () => {
    page++;
    perPage = ((page - 1) * 4) + count_row;
    await getLoadMoreData(movieFavoriteList.value, perPage);
  }
async function getLoadMoreData(data, perPage) {
  if (data.length > 0) {
    total_count = data.length - perPage;
    movieFavoriteList.value = data.slice(0, perPage);
  }
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

</script>
<template>
  <section class="mt-50 bg-black">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="fb-profile-block">
            <div class="fb-profile-block-thumb cover-container">
              <div class="wrapper">
                <div class="snow-canvas"></div>
              </div>
            </div>
            <div class="background-img">
              <div class="box">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <!-- <div class="content">
                  <h2>My animated Border </h2>
                </div> -->
                <div class="profile_avt" v-if="_accountInfo?.avatar?.tmdb?.avatar_path">
                  <a href="#">
                    <img :src="getPosterImage(_accountInfo.avatar.tmdb.avatar_path)" alt="" title="" />
                  </a>
                </div>
                
              </div>
            </div>
            <!-- <div class="profile-img" v-if="_accountInfo?.avatar?.tmdb?.avatar_path">
              <a href="#">
                <img :src="getPosterImage(_accountInfo.avatar.tmdb.avatar_path)" alt="" title="" />
              </a>
            </div> -->
            <div class="profile-name" v-if="_accountInfo">
              <h2>{{ _accountInfo.name }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="search" class="pt-4 pb-5">
    <div class="container">
      <div class="row trend_1">
        <div class="col-md-6 col-6">
          <div class="trend_1l">
            <h4 class="mb-0"><i class="fa fa-youtube-play align-middle col_red me-1"></i><span class="col_red"> You have ({{ movieFavoriteList.length > 0 ? movieFavoriteList.length : 0 }}) favorite movies
              </span></h4>
          </div>
        </div>
      </div>
      <div class="row trend_2 mt-4">
        <div id="carouselExampleCaptions2" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="trend_2i row">
                <div v-for="item in movieFavoriteList" :key="item.id" class="col-md-3 col-6 mb-3">
                  <div class="trend_2im clearfix position-relative">
                    <div class="trend_2im1 clearfix">
                      <div class="grid">
                        <figure class="effect-jazz mb-0">
                          <router-link :to="`/movies/${item.id}`"><img :src="getPosterImage(item.poster_path)"
                              class="w-100" alt="..." style="height: 450px;"></router-link>
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
                    <p class="mb-0">{{ formatNumber(item.popularity) }} Views</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row trend_2 mt-4 text-center">
        <button class="btn btn-outline-danger" @click="onLoadMore()"
          :style="{ display: total_count <= 0 ? 'none' : 'block' }">Load more ({{ total_count }})</button>
      </div>
    </div>
  </section>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

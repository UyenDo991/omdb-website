<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { formatNumber, getPosterImage } from '@/utils/index';
import { delToFavorite, getFavoriteMovies } from '@/api/api';
const { _accountInfo } = storeToRefs(useAuthStore());
const movieFavoriteList = ref({});
//Load more
let page = 1;
const count_row = 4;
let perPage = 0;
let total_count = 0;
onMounted(async () => {
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
  getDataFav();
  //Goi Loadmore

})

const favMovieList = ref({}); // Khai báo ref cho biến res
async function getDataFav() {
  //load list
  favMovieList.value = await getFavoriteMovies();

  perPage = count_row;
  await getLoadMoreData(favMovieList.value.results, perPage);
}
const onLoadMore = async () => {
  page++;
  perPage = ((page - 1) * 4) + count_row;
  await getLoadMoreData(favMovieList.value.results, perPage);
}
async function getLoadMoreData(data, perPage) {
  console.log(data);
  if (data.length >= 0) {
    console.log(perPage);
    total_count = data.length - perPage;
    movieFavoriteList.value = data.slice(0, perPage);
  }
}
const result = ref({});
async function getDelFavorite(id) {
  if (id) {
    try {
      result.value = await delToFavorite(id);
      getDataFav();
      // console.log("delToFavorite-result:", result.value);
    } catch (error) {
      console.error("Error in getFavorite:", error);
    }
  } else {
    alert('No data found!')
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
              <div class="avt-box">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div class="profile_avt" v-if="_accountInfo?.avatar?.tmdb?.avatar_path">
                  <a href="#">
                    <img :src="getPosterImage(_accountInfo.avatar.tmdb.avatar_path)" alt="" title="" />
                  </a>
                </div>
              </div>
            </div>
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
            <h4 class="mb-0"><i class="fa fa-youtube-play align-middle col_red me-1"></i><span class="col_red"> You have
                ({{ movieFavoriteList.length > 0 ? movieFavoriteList.length : 0 }}) favorite movies
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
                  <div class="pr-img-fav-box">
                    <img :src="getPosterImage(item.poster_path)" class="pro-img" alt="...">
                    <div class="pr-img-fav-box-content">
                      <h5 class="pr-img-fav-box-title">{{ item.original_title }}</h5>
                      <ul class="icon">
                        <li><router-link :to="`/movies/${item.id}`"><a href="#"><i
                                class="fa fa-search"></i></a></router-link></li>
                        <li @click="getDelFavorite(item.id)">
                          <a href="#">
                            <i class="fa fa-heart col_red"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
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

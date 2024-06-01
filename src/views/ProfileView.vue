<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { getPosterImage } from '@/utils/index';
const { _accountInfo } = storeToRefs(useAuthStore());

onMounted(() => {
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
})

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
            <div class="profile-img" v-if="_accountInfo?.avatar?.tmdb?.avatar_path">
              <a href="#">
                <img :src="getPosterImage(_accountInfo.avatar.tmdb.avatar_path)" alt="" title="" />
              </a>
            </div>
            <div class="profile-name" v-if="_accountInfo">
              <h2>{{ _accountInfo.name }}</h2>
            </div>
          </div>
        </div>
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

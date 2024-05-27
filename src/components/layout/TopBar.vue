<script setup>
import { ref } from "vue";
// import axios from 'axios';
// const inputSearch = ref("");
const inputSearch = ref({
  title: "",
})
// const onSearch = async () => {
//   try {
//     // const res = await axios.get(`search/movie?query=${inputSearch.value.title}&year=${inputSearch.value.year}`);
//     const res = getSearchData(inputSearch.title);
//     console.log("res:", res);
//   } catch (error) {
//     console.log("onSearch-catch exception:", error.message);
//   }
// }
</script>

<template>
  <section id="top">
    <div class="container">
      <div class="row top_1">
        <div class="col-md-3">
          <div class="top_1l pt-1">
            <h3 class="mb-0"><router-link class="text-white" to="/"><i
                  class="fa fa-video-camera col_red me-1"></i>Planet</router-link></h3>
          </div>
        </div>
        <div class="col-md-5">
          <div class="top_1m">
            <div class="input-group">
              <input type="text" class="form-control bg-black" v-model="inputSearch.title" placeholder="Search Site...">
              <span class="input-group-btn">
                <router-link :to="`/search/movie/${inputSearch.title}`">
                  <button class="btn btn text-white bg_red rounded-0 border-0" type="button"
                    @click="onSearch">Search</button></router-link>
              </span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="top_1r text-end">
            <ul class="social-network social-circle mb-0">
              <li><a href="#" class="icoRss" title="Rss"><i class="fa fa-instagram"></i></a></li>
              <li><a href="#" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a></li>
              <li><a href="#" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a></li>
              <li><a href="#" class="icoGoogle" title="Google +"><i class="fa fa-youtube"></i></a></li>
              <li><a href="#" class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
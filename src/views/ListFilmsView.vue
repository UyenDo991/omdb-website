<script setup>
import { watch, ref } from "vue";
import { getNowPlayling, getMovieUpcoming, getTvGenres, getMoviePopular, getTVTrendingList, getTVGenresList, getCollectionFilmsList } from "@/api/api";
import { useRoute } from "vue-router";
import { chunkArray } from "@/utils/index";
import { getPosterImage } from "@/utils/index";
import ListViewFilms from "@/components/ListViewFilms.vue";
const route = useRoute();


// const router = useRouter();
const res = ref({}); // Khai báo ref cho biến res
const listFilmsView = ref([]); // Khai báo ref cho biến listFilmsView

const getViewListType = async (film_type) => {
  console.log(film_type);
  if (film_type === "now_playing") {
    res.value = await getNowPlayling(); // Sử dụng res.value để gán giá trị mới
  }
  if (res.value && res.value.results.length) {
    listFilmsView.value = res.value.results; // Sử dụng listFilmsView.value để gán giá trị mới
    console.log('listFilmsView');
    console.log(listFilmsView.value);
  }
  // Kết thúc
}
// getViewListType(async (val) => {
//   const res = await getNowPlayling();
//     console.log(res);
//   if (res && res.results.length) {
//     listFilmsView.value = res.results;
//     console.log('listFilmsView');
//     console.log(listFilmsView);
//   }
//   //End
// })
watch(() => route.params.film_type, async (film_type) => {
  // console.log('id:', val);
  await getViewListType(film_type);
}, { immediate: true })
//Goi hàm
</script>

<template>
  <!-- Latest Movie -->
  <ListViewFilms :items="listFilmsView" />
  <!--End Latest Movie -->
</template>

<script setup>
import { watch, ref } from "vue";
import { getNowPlayling, getMovieUpcoming, getMovieTrendingList, getMovieGenres, getMovieDetails } from "@/api/api";
import { useRoute } from "vue-router";
import ListViewFilms from "@/components/ListViewFilms.vue";

const route = useRoute();
// const router = useRouter();
const res = ref({}); // Khai báo ref cho biến res
const listFilmsView = ref([]); // Khai báo ref cho biến listFilmsView
const listGenresView = ref([]); // Khai báo ref cho biến listGenresView

const getViewListType = async (film_type) => {
  console.log(film_type);
  if (film_type === "now_playing") {
    res.value = await getNowPlayling(); // Sử dụng res.value để gán giá trị mới
  }
  else if (film_type === "upcomning") {
    res.value = await getMovieUpcoming(); // Sử dụng res.value để gán giá trị mới
  }
  else if (film_type === "trending") {
    res.value = await getMovieTrendingList(); // Sử dụng res.value để gán giá trị mới
  }
  if (res.value && res.value.results.length) {
      listFilmsView.value = res.value.results; // Gán danh sách các phim mới vào listFilmsView.value
      // Mảng để lưu trữ thông tin chi tiết của từng phim
      const detailsList = [];
      for (let i = 0; i < listFilmsView.value.length; i++) {
          const _id = listFilmsView.value[i].id;
          // Lấy thông tin chi tiết của phim với ID tương ứng
          const details = await getMovieDetails(_id);
          // Thêm thông tin chi tiết vào mảng detailsList
          detailsList.push(details);
      }
      // Gán mảng detailsList vào mỗi phim trong danh sách
      listFilmsView.value.forEach((film, index) => {
          film.details = detailsList[index];
      });
  }
  //console.log('listFilmsView');
  //console.log(listFilmsView);
  //List thể loại
  const res_genres = await getMovieGenres();
  //console.log('res');
  //console.log(res);
  if (res_genres && res_genres.genres.length) {
    listGenresView.value = res_genres.genres;
    //console.log(res_genres);
  }
  //console.log(detailInfo.value);
  // Kết thúc
}

watch(() => route.params.film_type, async (film_type) => {
  // console.log('id:', val);
  await getViewListType(film_type);
}, { immediate: true })
//Goi hàm
</script>

<template>
  <!-- Latest Movie -->
  <ListViewFilms :items="listFilmsView" :items_genres="listGenresView"/>
  <!--End Latest Movie -->
</template>

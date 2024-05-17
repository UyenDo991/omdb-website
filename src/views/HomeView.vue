<script setup>
import { onMounted, ref } from "vue";
import { getNowPlayling, getMovieGenres, getTvGenres } from "@/api/api";
import { useRouter } from "vue-router";

const router = useRouter();

const nowPlayingList = ref([]);

const viewDetail = async (movie_id) => {
  router.push(`/movies/${movie_id}`);
}

onMounted(async () => {
  /* const movieGenresList = await getMovieGenres();
  const tvGenresList = await getTvGenres();
  console.log("movieGenresList:", movieGenresList)
  console.log("tvGenresList:", tvGenresList) */  
  const res = await getNowPlayling();
  if(res) {
    nowPlayingList.value = [...res.results]
  }
  console.log(nowPlayingList.value);
})
</script>

<template>
  <v-container fluid>
    <v-row dense align="center" justify="space-between">
      <v-col cols="4" v-for="movie in nowPlayingList" :key="movie.id">
        <!-- <v-card outlined :height="250">
          <v-img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" height="50%"></v-img>
          <v-card-title>{{movie.title}}</v-card-title>
          <v-card-text>{{movie.overview}}</v-card-text>
        </v-card> -->
        <v-card color="#1F7087" class="mx-2">          
          <div class="d-flex flex-no-wrap justify-space-between" @click="viewDetail(movie.id)">
            <v-sheet color="transparent" width="50%">
              <v-card-title class="text-h5">
                {{ movie.title }}
              </v-card-title>
              <v-card-subtitle>{{ movie.overview }}</v-card-subtitle>
              <v-card-actions>
                <v-btn class="ms-2" size="small" text="View" variant="outlined"></v-btn>
              </v-card-actions>
            </v-sheet>
            <v-avatar class="ma-3" rounded="0" size="125">
              <v-img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

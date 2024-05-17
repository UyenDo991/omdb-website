<script setup>
import { getMovieDetails, getMovieVideos } from "@/api/api";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const detailInfo = ref({})
const trailerClip = ref({})

const getDetails = async (movie_id) => {
  detailInfo.value = await getMovieDetails(movie_id);
  // console.log("detailInfo:", detailInfo);
  const videoList = await getMovieVideos(movie_id);
  // console.log("videoList:", videoList.results);
  if(videoList.results.length) {
    trailerClip.value = videoList.results.pop();
    // console.log(trailerClip.value); //
  }
}


watch(() => route.params.id, async(val) => {
  // console.log('id:', val);
  await getDetails(val);  
}, {immediate: true})
</script>

<template>
  <v-container fluid>
    <v-row dense align="center" justify="space-between">
      <v-col cols="12">
        <v-card color="transparent" v-if="detailInfo && trailerClip">
          <iframe 
            width="560" height="315" 
            :src="`https://www.youtube.com/embed/${trailerClip.key}`" 
            :title="detailInfo.title" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
          </iframe>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
    
</template>
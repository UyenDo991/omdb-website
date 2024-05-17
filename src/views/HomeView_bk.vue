<script setup>
import { ref } from 'vue';
// import TheWelcome from '../components/TheWelcome.vue'
import axios from 'axios';
const inputSearch = ref({
  title: "",
  year: "",
  category: ""
})
const a = ref({})
const dataList = ref([]);
const dataListAction = ref({});
const getData = async () => {
  /* const res = await fetch('http://www.omdbapi.com/?s=blade&y=2017&apikey=183e6416');
  const data = await res.json()
  dataList.value = [...data.Search] */
  const res = await axios.get(`now_playing`);
  console.log("res:", res);
  dataList.value = [...res.results]
}

// async function fetchData() {
//   try {
//     const res_type = await axios.get(`http://www.omdbapi.com/?t=Harry&type=movie`);
//     console.log("res_type:", res_type);
//     dataListAction.value = [...res_type.Search]
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }
// //Goi hàm
// fetchData();

</script>

<template>
  <!-- <TheWelcome /> -->
  <v-container fluid>
    <v-row dense align="center" justify="space-between">
      <v-col cols="6">
        <input v-model="message" placeholder="Nhập thông điệp">
        <!-- <v-text-field hide-details="" variant="outlined" label="Title" v-model="inputSearch.title"></v-text-field> -->
      </v-col>
      <v-col cols="6">
        <v-btn color="primary" @click="getData">Search</v-btn>
      </v-col>
      <v-col cols="12" lg="4" v-for="item in dataList" :key="item.imdbID" v-if="dataList">
        <!-- <v-card outlined :height="250">
          <v-img height="65%" :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"></v-img>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text>{{ item.release_date }}</v-card-text>
        </v-card> -->

        <!-- của anh Bảo -->
        <!-- <v-card color="#1F7087" class="mx-2">
          
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-sheet color="transparent" width="50%">
              <v-card-title class="text-h5">
                {{ item.title }}
              </v-card-title>
              <v-card-subtitle>{{ item.release_date }}</v-card-subtitle>
              <v-card-actions>
                <v-btn class="ms-2" size="small" text="View" variant="outlined"></v-btn>
              </v-card-actions>
            </v-sheet>
            <v-avatar class="ma-3" rounded="0" size="125">
              <v-img :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"></v-img>
            </v-avatar>
          </div>
        </v-card> -->
        <!-- của anh Bảo -->

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
// import TheWelcome from '../components/TheWelcome.vue'
import axios from 'axios';
const inputSearch = ref({
  title: "",
  year: "",
  category: ""
})
const dataList = ref([]);
const getData = async () => {
  /* const res = await fetch('http://www.omdbapi.com/?s=blade&y=2017&apikey=183e6416');
  const data = await res.json()
  dataList.value = [...data.Search] */
  const res = await axios.get(`?s=${inputSearch.value.title}&y=${inputSearch.value.year}`);
  console.log("res:", res);
  dataList.value = [...res.Search]
}
</script>

<template>
  <!-- <TheWelcome /> -->
  <v-container fluid>
    <v-row dense align="center" justify="space-between">
      <v-col cols="6">
        <v-text-field hide-details="" variant="outlined" label="Title" v-model="inputSearch.title"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-btn color="primary" @click="getData">Search</v-btn>
      </v-col>
      <v-col cols="12" lg="4" v-for="item in dataList" :key="item.imdbID" v-if="dataList">
        <!-- <v-card outlined :height="250">
          <v-img :src="item.Poster"></v-img>
          <v-card-title>{{ item.Title }}</v-card-title>
          <v-card-text>{{ item.Year }}</v-card-text>
        </v-card>  -->
        <v-card color="#1F7087" class="mx-2">
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-sheet color="transparent" width="50%">
              <v-card-title class="text-h5">
                {{ item.Title }}
              </v-card-title>

              <v-card-subtitle>{{ item.Year }}</v-card-subtitle>

              <v-card-actions>
                <v-btn class="ms-2" size="small" text="View" variant="outlined"></v-btn>
              </v-card-actions>
            </v-sheet>

            <v-avatar class="ma-3" rounded="0" size="125">
              <v-img :src="item.Poster"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { addToFavorite, getFavoriteMovies } from "@/api/api";

const router = useRouter();
const apiKey = "d4be06001b5bcf74a11f39b3995179c8";

const { createRequest, authenticate, saveAccountInfo } = useAuthStore();
const { _requestToken } = storeToRefs(useAuthStore());


const request = async () => {
  await createRequest();
}

const logIn = async () => {
  try {
    const { success, session_id, account_info } = await authenticate();
    if(success) {
      saveAccountInfo(session_id, account_info);
      /* console.log("_sessionID:", _sessionID.value)
      console.log("_accountInfo:", _accountInfo.value) */
      // router.push("/");
      
      /* Test thử các api sau khi có session_id */
      const result = await addToFavorite();
      console.log("addToFavorite-result:", result);
      if(result.success) {
        // show message add success ra (tích hợp vs thư viện sau);
        console.log(result.status_message);
        const favMovieList = await getFavoriteMovies();
        console.log("favMovieList:", favMovieList)
      }
    }
  } catch (error) {
    console.log("logIn-catch exception:", error.message);
  }
}
</script>

<template>
  <section id="upcome" class="pt-4 pb-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="input-group">
            <input disabled type="text" class="form-control bg-black" v-model="apiKey">
            <span class="input-group-btn">
              <button class="btn btn text-white bg_red rounded-0 border-0" type="button" @click="request" v-if="!_requestToken">Create Request</button>
              <button class="btn btn text-white bg_red rounded-0 border-0" type="button" @click="logIn" v-else>Log In</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, nextTick, watch, computed, onBeforeMount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

const { _accountInfo } = storeToRefs(useAuthStore());
const { createRequest, clearSavedInfo, authenticate, saveAccountInfo } = useAuthStore();

const inputSearch = ref({
  title: ""
})
const router = useRouter();
const route = useRoute();

const resLink = ref("");

const onSearch = async () => {
  if (!inputSearch.value.title) {
    alert('Mời nhập !');
    return;
  }
  // Lấy giá trị từ trường nhập
  const inputTitle = inputSearch.value.title.trim().toLowerCase();
  // Chuẩn hóa tiêu đề
  const normalizedTitle = inputTitle.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd');
  // Format tiêu đề
  const formattedTitle = normalizedTitle.replace(/[\s-]+/g, '-');
  // Tạo đường dẫn đến trang tìm kiếm
  resLink.value = `/movie/search/${formattedTitle}`;
  // Chờ cho các thao tác giao diện kết thúc trước khi điều hướng đến trang kết quả tìm kiếm
  await nextTick();
  // Sử dụng router để điều hướng 
  await router.push(resLink.value);
  // Chờ một lần nữa sau khi điều hướng
  await nextTick();
  // Sử dụng router để điều hướng đến trang kết quả tìm kiếm
  await router.push(resLink.value);
}

const requestLogIn = async () => {
  try {
    await createRequest();
  } catch (error) {
    console.log("requestLogIn-catch exception:", error.message);
  }
}

const logIn = async (requestToken) => {
  try {
    const { success, session_id, account_info } = await authenticate(requestToken);
    if (success) {
      saveAccountInfo(session_id, account_info);
      localStorage.setItem("sessionID", session_id);
      localStorage.setItem("accountInfo", JSON.stringify(account_info));
      localStorage.removeItem("requestToken");
      router.push("/");
    }
  } catch (error) {
    console.log("logIn-catch exception:", error.message);
  }
}

const logOut = async () => {
  try {
    clearSavedInfo();
  } catch (error) {
    console.log("logOut-catch exception:", error.message);
  }
}

onBeforeMount(async () => {
  const requestToken = localStorage.getItem("requestToken");
  const sessionID = localStorage.getItem("sessionID");
  const accountInfo = JSON.parse(localStorage.getItem("accountInfo"));
  // console.log("onBeforeMount-requestToken-from Local Storage:", requestToken, sessionID, accountInfo);
  if(requestToken) {
    await logIn(requestToken);
  }
  if(sessionID && accountInfo) {
    saveAccountInfo(sessionID, accountInfo)
  }
})
</script>

<template>
  <section id="top">
    <div class="container">
      <div class="row top_1">
        <div class="col-md-3">
          <div class="top_1l pt-1">
            <h3 class="mb-0"><router-link class="text-white" to="/"><i
                  class="fa fa-video-camera col_red me-1"></i><span class="groupname">Nhóm 9</span></router-link></h3>
          </div>
        </div>
        <div class="col-md-5">
          <div class="top_1m">
            <div class="input-group">
              <input type="text" class="form-control bg-black" v-model="inputSearch.title" placeholder="Search...">
              <span class="input-group-btn">
                <!-- <router-link :to="resLink">
                  <button class="btn btn text-white bg_red rounded-0 border-0" type="button"
                    @click="onSearch">Search</button></router-link> -->
                <router-link :to="resLink">
                  <button class="btn btn text-white bg_red rounded-0 border-0" type="button"
                    @click="onSearch">Search</button>
                </router-link>
              </span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="top_1r text-end">
            <ul class="social-network social-circle mb-0">
              <button class="btn btn text-white bg_red rounded-0 border-0" type="button" @click="requestLogIn" v-if="!_accountInfo">Log In</button>
              <button class="btn btn text-white bg_red rounded-0 border-0" type="button" @click="logOut" v-else>Log Out</button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
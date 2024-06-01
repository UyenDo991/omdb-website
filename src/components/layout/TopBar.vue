<script setup>
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from '@/stores/auth';
// import axios from 'axios';
// const inputSearch = ref("");
const inputSearch = ref({
  title: "",
})
const router = useRouter();
console.log(router);
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
  const res_link = `/movie/search/${formattedTitle}`;
  // Chờ cho các thao tác giao diện kết thúc trước khi điều hướng đến trang kết quả tìm kiếm
  await nextTick();
  // Sử dụng router để điều hướng 
  await router.push(res_link);
  // Chờ một lần nữa sau khi điều hướng
  await nextTick();
  // Sử dụng router để điều hướng đến trang kết quả tìm kiếm
  await router.push(res_link);
}
//Check Auth

const authInfo = ref([]);
const check_id = ref([]);
authInfo.value = useAuthStore();
check_id.value = authInfo.value.accountInfo;

console.log("authInfo11111");
console.log(authInfo.value.accountInfo);

console.log("check_id ssss");
console.log(check_id);
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
                <router-link :to="{ res_link }">
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
              <h6 class="mb-0" v-if="check_id === null"><a class="button" href="#"> <router-link class="ilogin-item" to="/login">Log In</router-link></a></h6>
              <h6 class="mb-0" v-else><a class="button" href="#">Log Out</a></h6>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
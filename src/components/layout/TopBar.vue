<script setup>
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
// import axios from 'axios';
// const inputSearch = ref("");
const inputSearch = ref({
  title: "",
})
const router = useRouter();
console.log(router);
const onSearch = async () => {
  if(!inputSearch.value.title){
    alert('Xin chào ' +  '!');
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
</script>

<template>
  <section id="top">
    <div class="container">
      <div class="row top_1">
        <div class="col-md-3">
          <div class="top_1l pt-1">
            <h3 class="mb-0"><router-link class="text-white" to="/"><i
                  class="fa fa-video-camera col_red me-1"></i>Nhom9</router-link></h3>
          </div>
        </div>
        <div class="col-md-5">
          <div class="top_1m">
            <div class="input-group">
              <input type="text" class="form-control bg-black" v-model="inputSearch.title" placeholder="Search Site...">
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
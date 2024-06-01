<script setup>
import { getMovieDetails, getMovieVideos, getMoviePerson, getCollectionFilmsList } from "@/api/api";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getPosterDtl, formatNumber } from "@/utils/index";
const route = useRoute();

const detailInfo = ref({});
const trailerClip = ref({});
const personInfo = ref({});
const collectionFilmsList = ref([]);

const getDetails = async (movie_id) => {
  //detailInfo
  detailInfo.value = await getMovieDetails(movie_id);
  console.log('detailInfo');
  console.log(detailInfo);
  //videoList
  const videoList = await getMovieVideos(movie_id);
  const trailers = videoList.results.filter(x => x.type === "Trailer");
  trailerClip.value = trailers.length ? trailers[trailers.length - 1] : null;
  //console.log("videoList:", videoList.results);

  //personInfo
  personInfo.value = await getMoviePerson(movie_id);
  //console.log("videoList:", videoList.results);
  //console.log("personInfo:", personInfo);

  //Related Films
  if (detailInfo.value.belongs_to_collection === null) {
    collectionFilmsList.value = [];
  }
  else {
    //console.log("detailInfo:", detailInfo);
    // console.log("detailInfo_collection:", detailInfo.value.belongs_to_collection.id);
    const collect_id = detailInfo.value.belongs_to_collection.id;
    const res_collection = await getCollectionFilmsList(collect_id);
    // console.log(res_collection);
    if (res_collection && res_collection.parts.length) {
      const chunk_collection = res_collection.parts.slice(0, 4);
      if (chunk_collection.length) {
        collectionFilmsList.value = chunk_collection;
      }
    }
  }
  console.log("collectionFilmsList:", collectionFilmsList);

}

const reloadPage = async (val) => {
  await getDetails(val);
  window.location.reload();
}
watch(() => route.params.id, async (val) => {
  console.log('id:', val);
  await getDetails(val);
}, { immediate: true })
</script>

<template>
  <section id="center" class="center_o pt-2 pb-2">
    <div class="container-xl" v-if="detailInfo && detailInfo.id != null">
      <div class="row center_o1">
        <div class="col-md-9">
          <div class="center_o1l">
            <h2 class="mt-3"><a class="col_red" href="#">{{ detailInfo.original_title }}</a></h2>
            <p>{{ detailInfo.belongs_to_collection == null ? '' : detailInfo.belongs_to_collection.name }}</p>
            <p>Release date : {{ detailInfo.release_date }}</p>
            <p>Run time : {{ detailInfo.runtime }} minutes</p>
            <p>Language : {{ detailInfo.original_language }} </p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="center_o1r ">
            <h2 class="mt-15"><a class="col_red" href="#"></a></h2>
            <p>Imdb Rating : {{ Math.round(detailInfo.vote_average * 100) / 100 }} / 10 (Vote : {{ detailInfo.vote_count
              }})</p>
            <p>Popularity: {{ formatNumber(detailInfo.popularity) }} View</p>
            <p>Rrevenue : ${{ formatNumber(detailInfo.revenue) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="spinner">
        <div class="blob blob-0"></div>
    </div>
  </section>
  <section id="blog" class="pt-4 pb-4 bg_grey">
    <div class="container-xl">
      <div class="row blog_1">
        <div class="col-md-8">
          <div class="blog_1l">
            <div class="blog_1l1">
              <div class="popular_2i1lm position-relative clearfix">
                <div class="popular_2i1lm1 clearfix">
                  <div class="grid">
                    <iframe width="800" height="480" :src="`https://www.youtube.com/embed/${trailerClip.key}`"
                      :title="detailInfo.title" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                    </iframe>
                  </div>
                </div>
              </div>
              <div class="blog_1l1i mt-3">
                <h5><i class="fa fa-folder-open col_red me-1"></i> Movie News</h5>
                <h2 class="mt-3"><a class="col_red" href="#">{{ detailInfo.original_title }}</a></h2>
                <h6 class="fw-normal mt-3 col_light">
                  <span><i class="fa fa-clock-o me-1 align-middle col_red"></i>{{ detailInfo.release_date }} </span>
                </h6>
              </div>
            </div>
            <div class="blog_1l2">
              <ul>
                <span>Product Company : </span>
                <li v-for="(productioncompanies, index) in detailInfo.production_companies"
                  :key="productioncompanies.id" class="d-inline-block me-1">
                  {{ productioncompanies.name }} <span
                    v-if="index !== detailInfo.production_companies.length - 1">,</span>
                </li>
              </ul>
              <ul>
                <span>Director : </span>
                <template v-for="crew_list in personInfo.crew">
                  <li v-if="crew_list.job === 'Director'" :key="crew_list.credit_id" class="d-inline-block me-1">
                    <a :href="`#${crew_list.name}`">{{ crew_list.name }}</a>
                  </li>
                </template>
              </ul>
              <ul>
                <span>Cast : </span>
                <li v-for="(cast_list, index) in personInfo.cast" :key="cast_list.id" class="d-inline-block me-1">
                  <a href="#">{{ index < 5 ? cast_list.name : '' }}</a>{{ index < 5 ? ',' : (index === 5 ? ',...' : '')
                        }} </li>
              </ul>
            </div>
            <div class="blog_1l2">
              <ul>
                <li v-for="genres_list in detailInfo.genres" :key="genres_list.id" class="d-inline-block me-3"><a
                    href="#"><i class="fa fa-tag me-1 col_red"></i> {{ genres_list.name }}</a></li>
              </ul>
              <p>{{ detailInfo.overview }}</p>
            </div>
            <div class="blog_1l3 mt-4">
              <h3>Related Films</h3>
            </div>
            <div class="blog_1l4 mt-3">
              <div class="popular_2i1 mt-3 row" v-for="(collect_movie, index) in collectionFilmsList" :key="index">
                <div class="col-md-4 col-4">
                  <div class="popular_2i1lm position-relative clearfix">
                    <div class="popular_2i1lm1 clearfix">
                      <div class="grid">
                        <figure class="effect-jazz mb-0">
                          <router-link :to="`/movies/${collect_movie.id}`" @click="reloadPage(collect_movie.id)"
                            replace><img :src="getPosterDtl(collect_movie.poster_path)" class="w-100"
                              alt="img25"></router-link>
                        </figure>
                      </div>
                    </div>
                    <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                      <ul>
                        <li class="d-inline-block"><a href="#"><i class="fa fa-link col_red"></i></a></li>
                        <li class="d-inline-block"><a href="#"><i class="fa fa-search col_red"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-8 col-8">
                  <div class="popular_2i1r">
                    <h5><a class="col_red" href="#">{{ collect_movie.original_title }}</a></h5>
                    <h6><i class="fa fa-clock-o me-1 align-middle col_red"></i>{{ collect_movie.release_date }}</h6>
                    <h6> {{ Math.round(collect_movie.vote_average * 100) / 100 }} / 10 (Vote : {{
                      collect_movie.vote_count }})
                      <!-- <span class="ms-2">Runtime: {{ collect_movie.runtime }} minutes</span> -->
                    </h6>
                    <p>{{ collect_movie.overview }}</p>
                    <h6 class="mb-0">
                      <router-link class="button" :to="`/movies/${collect_movie.id}`"
                        @click="reloadPage(collect_movie.id)" replace>More Info - Trailer</router-link>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="blog_1l3 mt-4">
              <h3>Leave a Comment</h3>
            </div>
            <div class="blog_1l6 mt-3">
              <div class="blog_1dt5 row mt-3">
                <div class="col-md-6">
                  <div class="blog_1dt5l">
                    <textarea placeholder="Comment" class="form-control form_text"></textarea>
                    <div class="form-check mt-3">
                      <input type="checkbox" class="form-check-input" id="customCheck1">
                      <label class="form-check-label" for="customCheck1">Save my name and email in this browser for the
                        next time I comment.</label>
                    </div>
                    <h6 class="mt-3 mb-0"><a class="button" href="#"> Comment</a></h6>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="blog_1dt5l">
                    <input class="form-control" placeholder="Name" type="text">
                    <input class="form-control mt-3" placeholder="Email" type="text">
                    <input class="form-control mt-3" placeholder="Website" type="text">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="blog_1r">
            <div class="blog_1r1">
              <figure class="effect-jazz mb-0">
                <a href="#"><img :src="getPosterDtl(detailInfo.poster_path)" height="480" class="w-100" alt="img25"></a>
              </figure>
            </div>
            <div class="blog_1r1 p-4 mt-4">
              <h4>Sidebar <span class="col_red">News</span></h4>
              <hr class="line mb-4">
              <div class="blog_1r1i row">
                <div class="col-md-4 col-4">
                  <div class="blog_1r1il">
                    <div class="grid clearfix">
                      <figure class="effect-jazz mb-0">
                        <a href="blog_detail.html"><img src="@/assets/images/4.jpg" class="w-100" alt="abc"></a>
                      </figure>
                    </div>
                  </div>
                </div>
                <div class="col-md-8 ps-0 col-8">
                  <div class="blog_1r1ir">
                    <h6 class="mb-1"><a class="col_red" href="blog_detail.html">Company Foundation Provides</a></h6>
                    <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                  </div>
                </div>
              </div>
              <hr>
              <div class="blog_1r1i row">
                <div class="col-md-4 col-4">
                  <div class="blog_1r1il">
                    <div class="grid clearfix">
                      <figure class="effect-jazz mb-0">
                        <a href="blog_detail.html"><img src="@/assets/images/5.jpg" class="w-100" alt="abc"></a>
                      </figure>
                    </div>
                  </div>
                </div>
                <div class="col-md-8 ps-0 col-8">
                  <div class="blog_1r1ir">
                    <h6 class="mb-1"><a class="col_red" href="blog_detail.html">Company Foundation Provides</a></h6>
                    <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                  </div>
                </div>
              </div>
              <hr>
              <div class="blog_1r1i row">
                <div class="col-md-4 col-4">
                  <div class="blog_1r1il">
                    <div class="grid clearfix">
                      <figure class="effect-jazz mb-0">
                        <a href="blog_detail.html"><img src="@/assets/images/6.jpg" class="w-100" alt="abc"></a>
                      </figure>
                    </div>
                  </div>
                </div>
                <div class="col-md-8 ps-0 col-8">
                  <div class="blog_1r1ir">
                    <h6 class="mb-1"><a class="col_red" href="blog_detail.html">Company Foundation Provides</a></h6>
                    <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                  </div>
                </div>
              </div>
              <hr>
              <div class="blog_1r1i row">
                <div class="col-md-4 col-4">
                  <div class="blog_1r1il">
                    <div class="grid clearfix">
                      <figure class="effect-jazz mb-0">
                        <a href="blog_detail.html"><img src="@/assets/images/7.jpg" class="w-100" alt="abc"></a>
                      </figure>
                    </div>
                  </div>
                </div>
                <div class="col-md-8 ps-0 col-8">
                  <div class="blog_1r1ir">
                    <h6 class="mb-1"><a class="col_red" href="blog_detail.html">Company Foundation Provides</a></h6>
                    <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="blog_1r1 p-4 mt-4">
              <h4>Login <span class="col_red">Form</span></h4>
              <hr class="line mb-4">
              <div class="input-group input-group-merge">
                <div class="input-group-text bg-transparent text-white border-right-0" data-password="false">
                  <span class="fa fa-user"></span>
                </div>
                <input type="username" id="username" class="form-control bg-transparent" placeholder="Username">

              </div>
              <div class="input-group input-group-merge mt-3">
                <div class="input-group-text bg-transparent text-white border-right-0" data-password="false">
                  <span class="fa fa-user"></span>
                </div>
                <input type="password" id="username" class="form-control bg-transparent" placeholder="password">

              </div>
              <div class="form-check mt-3">
                <input type="checkbox" class="form-check-input" id="checkmeout0">
                <label class="form-check-label" for="checkmeout0">Remember Me</label>
              </div>
              <h6 class="mt-3"><a class="button" href="blog_detail.html"><i
                    class="fa fa-long-arrow-right align-middle me-1"></i> Login</a></h6>
              <h6 class="mt-3"><a class="col_red" href="blog_detail.html">Create an account <i
                    class="fa fa-long-arrow-right ms-1"></i></a></h6>
              <h6 class="mt-3"><a class="col_red" href="blog_detail.html">Forgot your username? </a></h6>
              <h6 class="mt-3 mb-0"><a class="col_red" href="blog_detail.html">Forgot your password? </a></h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
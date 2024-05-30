<script setup>

</script>
<template>
  <section id="header">
    <nav class="navbar navbar-expand-md navbar-light" id="navbar_sticky">
      <div class="container">
        <router-link class="navbar-brand text-white fw-bold" to="/"><i
            class="fa fa-video-camera col_red me-1"></i>Nhom9</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mb-0">
            <li class="nav-item">
              <!-- <router-link class="nav-link active" aria-current="page" to="/">Home</router-link> -->
              <router-link :class="{ 'nav-link': true, 'active': $route.name === 'home' }" aria-current="page"
                to="/">Home</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" :class="{ 'active': $route.name === 'ListFilmsView' }"
                id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Topic Movie Films
              </a>
              <ul class="dropdown-menu drop_1" :class="{ 'active': $route.name === 'ListFilmsView' }"
                aria-labelledby="navbarDropdown">
                <li><router-link class="dropdown-item" to="/movies/list/now_playing">Latest Flims</router-link></li>
                <li><router-link class="dropdown-item" to="/movies/list/upcoming">Upcoming Flims</router-link></li>
                <li><router-link class="dropdown-item" to="/movies/list/trending">Trending Flims</router-link></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link">Team</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Pages
              </a>
              <ul class="dropdown-menu drop_1" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item">About Us</a></li>
                <li><a class="dropdown-item">Services</a></li>
                <li><a class="dropdown-item">Team</a></li>
                <li><a class="dropdown-item border-0">Contact</a></li>
              </ul>
            </li>

            <li class="nav-item">
              <a class="nav-link">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </section>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <div class="row flex-lg-nowrap">
      <div class="col">
        <div class="e-tabs mb-3 px-3">
          <ul class="nav nav-tabs">
            <li class="nav-item"><RouterLink class="nav-link" to="/" active-class="active">Главная</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/persons" active-class="active">Кленты</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/statuses" active-class="active">Статусы</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/cars" active-class="active">Машины</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/slots" active-class="active">Парковочные места</RouterLink></li>
          </ul>
        </div>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script setup>

import ItemCard from '@/components/ItemCard.vue'
import { usePokemonStore } from '@/stores/pokemon'
import { onMounted, computed } from 'vue';


const pokemonStore = usePokemonStore();
let allPokemonData = computed(() => pokemonStore.allPokemonData);

onMounted(async () => {
  await pokemonStore.getAllPokemonData()

})
const getCardsOnDropdownChange = async (event) => {
  if (event.target.value) {
    await pokemonStore.getAllPokemonData(event.target.value)
  }
}
const getCards = (type) => {
  pokemonStore.getNewCards(type)
}
</script>


<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <span>cards per page: </span>
        <select name="" id="" @change="getCardsOnDropdownChange($event)">
          <option selected="selected" value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div class="col offset-md-4">
        <nav aria-label="...">
          <ul class="pagination">
            <li class="page-item">
              <span class="page-link" @click="getCards('previous')">Previous</span>
            </li>
            <li class="page-item">
              <span class="page-link" @click="getCards('next')">Next</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row gy-4">
      <div class="col-3" v-for="(item, index) in allPokemonData" :key="index">
        <ItemCard :item="item" />
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col offset-md-4">
        <nav aria-label="...">
          <ul class="pagination">
            <li class="page-item">
              <span class="page-link" @click="getCards('previous')">Previous</span>
            </li>
            <li class="page-item">
              <span class="page-link" @click="getCards('next')">Next</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>

</template>

<script setup>

import ItemCard from '@/components/ItemCard.vue'
import { usePokemonStore } from '@/stores/pokemon'
import { onMounted, computed, ref } from 'vue';


const pokemonStore = usePokemonStore();
let allPokemonData = computed(() => pokemonStore.allPokemonData);
let searchedData = ref('')

onMounted(async () => {
  await pokemonStore.getAllPokemonData()

  // console.log('new-data',pokemonStore.newPokiData)

})
const getCardsOnDropdownChange = async (event) => {
  if (event.target.value) {
    // searchedData.value = ''
    // pokemonStore.updateSearchedData('');
    await pokemonStore.getAllPokemonData(event.target.value)
  }
}
const getCards = async (type) => {
  // pokemonStore.updateSearchedData('');
  // searchedData.value = ''
  await pokemonStore.getNewCards(type);


}

// const sortByDropdownChange = (event)=>{

// }
// watch(searchedData, (newVal) => {

//   pokemonStore.updateSearchedData(newVal);
// })
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
      <div class="col">
        <span>sort by</span>
        <select name="" id="" @change="sortByDropdownChange($event)">
          <option selected="selected" value="name">Name</option>
          <option value="Height">Height</option>
          <option value="weight">Weight</option>
        </select>
      </div>
      <div class="col offset-md-4">
        <nav aria-label="...">
          <ul class="pagination">
            <li class="page-item">
              <span class="page-link" :class="{ 'disabled': !pokemonStore.prevApiUrl }"
                @click="getCards('previous')">Previous</span>
            </li>
            <li class="page-item">
              <span class="page-link" @click="getCards('next')">Next</span>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col">
        <input v-model="searchedData" class="form-control" type="search" placeholder="Search" aria-label="Search">
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

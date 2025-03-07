<script setup>

import ItemCard from '@/components/ItemCard.vue'
import { usePokemonStore } from '@/stores/pokemon'
import { onMounted, computed, ref, watch } from 'vue';


const pokemonStore = usePokemonStore();
let allPokemonData = computed(() => pokemonStore.allPokemonData);
let searchedData = ref('');
let allPokemonLocalData = ref([]);

onMounted(async () => {
  await pokemonStore.getAllPokemonData()
  allPokemonLocalData.value = pokemonStore.allPokemonData
})
const getCardsOnDropdownChange = async (event) => {
  if (event.target.value) {
    searchedData.value = ''
    await pokemonStore.getAllPokemonData(event.target.value)
  }
}
const getCards = async (type) => {
  searchedData.value = ''
  await pokemonStore.getNewCards(type);
}


const searchByname = (event) => {
  searchedData.value = event.target.value;
  let data;
  if (searchedData.value.length > 0 && searchedData.value != '') {
    data = allPokemonData.value.filter((item) => {
      if (item.name.includes(searchedData.value)) {
        return item
      }
    })
    allPokemonLocalData.value = data
  } else {
    allPokemonLocalData.value = allPokemonData.value
  }

}

// const sortByDropdownChange = (event)=>{

// }

watch(allPokemonData, (newVal) => {
  if (newVal) {
    allPokemonLocalData.value = pokemonStore.allPokemonData
  }

})
</script>


<template>
  <div class="container">
    <div class="row">
      <div class="col">as{{ allPokemonLocalData.value }}
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
      <div class="col">
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
        <input class="form-control" v-model="searchedData" type="search" placeholder="Search" aria-label="Search"
          @input="searchByname($event)">
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row gy-4">
      <div class="col-3" v-for="(item, index) in allPokemonLocalData" :key="index">
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

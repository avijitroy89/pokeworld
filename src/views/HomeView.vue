<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <span>cards per page: </span>
        <select name="" id="" @change="getCardsOnDropdownChange($event)">
          <option value="10">10</option>
          <option selected="selected" value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div class="col">
        <span>sort by</span>
        <select name="sort" id="" @change="sortByDropdownChange($event)">
          <option selected="selected" value="name">Select</option>
          <option value="name">Name</option>
          <option value="Height">Height</option>
          <option value="weight">Weight</option>
        </select>
      </div>
      <div class="col">
        <nav aria-label="...">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" :class="{ 'disabled': prevApiUrl === null }" @click="getCards('previous')"
                href="#">Previous</a>
            </li>
            <li class="page-item">
              <a class="page-link" @click="getCards('next')" href="#">Next</a>
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
      <div class="d-flex justify-content-center" v-if="!allPokemonLocalData.length && !showErrorMgs">
        <div class="spinner-border" role="status">
        </div>
      </div>

      <div class="alert alert-danger" role="alert" v-if="showErrorMgs">
        Seems there is a technical issue. Please refresh or try after some time.
      </div>
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

<script setup>

import ItemCard from '@/components/ItemCard.vue'
import { usePokemonStore } from '@/stores/pokemon'
import { onMounted, computed, ref, watch } from 'vue';


const pokemonStore = usePokemonStore();
let allPokemonData = computed(() => pokemonStore.allPokemonData);
let prevApiUrl = computed(() => pokemonStore.prevApiUrl)
let showErrorMgs = computed(() => pokemonStore.showErrorMgs)
let searchedData = ref('');
let allPokemonLocalData = ref([]);
let sortData = ref('')

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

const sortByDropdownChange = (event) => {
  if (event.target.value) {
    sortData.value = event.target.value;
    allPokemonLocalData.value.sort((a, b) => {
      return b.name - a.name
    })
  }
}

watch(allPokemonData, (newVal) => {
  if (newVal) {
    console.log('in');
    allPokemonLocalData.value = pokemonStore.allPokemonData
  }

})
</script>

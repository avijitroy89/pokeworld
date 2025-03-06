<script setup>

import ItemCard from '@/components/ItemCard.vue'
import { usePokemonStore } from '@/stores/pokemon'
import { onMounted, ref, computed } from 'vue';


let offsetItems = ref(0)
const itemLimit = ref(10)
const pokemonStore = usePokemonStore();
let allPokemonData = computed(() => pokemonStore.allPokemonData);
onMounted(async () => {
  await pokemonStore.getAllPokemonData(offsetItems.value, itemLimit.value)

})

const getCards = (type) => {
  pokemonStore.getNewCards(type)
}
</script>


<template>
  <div class="container">
    <div class="row gy-4">
      <div class="col-3" v-for="(item, index) in allPokemonData" :key="index">
        <ItemCard :item="item" />
      </div>
    </div>
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

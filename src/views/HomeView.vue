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

</script>


<template>
  <div class="container">
    <div class="row gy-4">
      <div class="col-3" v-for="(item, index) in allPokemonData" :key="index">
        <ItemCard :item="item" />
      </div>
    </div>
    <div class="row">

    </div>
  </div>
</template>

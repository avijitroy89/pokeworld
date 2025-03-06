<script setup>

import ItemCard from '@/components/ItemCard.vue'
import { usePokemonStore } from '@/stores/pokemon'
import { onMounted, ref } from 'vue';


let offsetItems = ref(0)
const itemLimit = ref(10)
const pokemonStore = usePokemonStore();
onMounted(async () => {
  await pokemonStore.getAllPokemonData(offsetItems.value, itemLimit.value)

})

</script>


<template>
  <div class="container">
    <div class="row gy-4">
      <div class="col-3">
        <ItemCard />
      </div>
      <div class="col-3">
        <ItemCard />
      </div>
      <div class="col-3">
        <ItemCard />
      </div>
      <div class="col-3">
        <ItemCard />
      </div>
      <div class="col-3">
        <ItemCard />
      </div>
    </div>
    <div class="row">

    </div>
  </div>
</template>

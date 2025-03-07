<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script setup>

import { usePokemonStore } from '@/stores/pokemon'
import { onMounted } from 'vue';


const pokemonStore = usePokemonStore();

onMounted(async () => {
  await pokemonStore.getAllPokemonData()

})

</script>

<style></style>

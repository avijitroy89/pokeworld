<script setup>

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
  <div></div>
</template>

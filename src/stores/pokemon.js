import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePokemonStore = defineStore('polemon', () => {
  let allPokemonData = ref([])

  async function getAllPokemonData(offsetItems, limitItems) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offsetItems}&limit=${limitItems}`,
    )

    allPokemonData.value = (await response.json()).results
  }

  return { getAllPokemonData, allPokemonData }
})

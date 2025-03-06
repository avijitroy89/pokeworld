import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePokemonStore = defineStore('polemon', () => {
  let allPokemonData = ref([])
  let nextApiUrl = ref('')
  let prevApiUrl = ref('')

  async function getAllPokemonData(offsetItems, limitItems) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offsetItems}&limit=${limitItems}`,
      )
      console.log(response)
      if (response.status === 200) {
        const data = await response.json()
        nextApiUrl.value = data.next
        prevApiUrl.value = data.previous
        allPokemonData.value = data.results
      }
    } catch (err) {
      console.log(err)
    }
  }
  async function getSinglePokemonData(name) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)

      if (response.status === 200) {
        return await response.json()
      }
    } catch (err) {
      alert(err)
    }
  }

  async function getNewCards(type) {
    if (type === 'next') {
      const response = await fetch(nextApiUrl.value)
      if (response.status === 200) {
        const data = await response.json()
        nextApiUrl.value = data.next
        prevApiUrl.value = data.previous
        allPokemonData.value = data.results
      }
    } else {
      const response = await fetch(prevApiUrl.value)
      if (response.status === 200) {
        const data = await response.json()
        nextApiUrl.value = data.next
        prevApiUrl.value = data.previous
        allPokemonData.value = data.results
      }
    }
  }
  return {
    getAllPokemonData,
    allPokemonData,
    getSinglePokemonData,
    nextApiUrl,
    prevApiUrl,
    getNewCards,
  }
})

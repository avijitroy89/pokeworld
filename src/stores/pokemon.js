import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePokemonStore = defineStore('pokemon', () => {
  let allPokemonData = ref([])
  let nextApiUrl = ref('')
  let prevApiUrl = ref('')

  async function getAllPokemonData(itemLimit = 2) {
    allPokemonData.value = []
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${itemLimit}`)
      if (response.status === 200) {
        const data = await response.json()
        nextApiUrl.value = data.next
        prevApiUrl.value = data.previous
        data.results.forEach(async (element) => {
          const res = await getSinglePokemonData(element.name)
          const pokeUpdatedData = {
            name: res.name,
            height: res.height,
            weight: res.weight,
            abilities: res.abilities,
            sprites: res.sprites.other['official-artwork'],
          }
          allPokemonData.value.push(pokeUpdatedData)
        })
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
    allPokemonData.value = []
    if (type === 'next') {
      const response = await fetch(nextApiUrl.value)

      if (response.status === 200 && !allPokemonData.value.length) {
        const data = await response.json()
        nextApiUrl.value = data.next
        prevApiUrl.value = data.previous

        data.results.forEach(async (element) => {
          const res = await getSinglePokemonData(element.name)
          const pokeUpdatedData = {
            name: res.name,
            height: res.height,
            weight: res.weight,
            abilities: res.abilities,
            sprites: res.sprites.other['official-artwork'],
          }
          allPokemonData.value.push(pokeUpdatedData)
        })
      }
    } else {
      const response = await fetch(prevApiUrl.value)
      if (response.status === 200) {
        const data = await response.json()
        nextApiUrl.value = data.next
        prevApiUrl.value = data.previous

        data.results.forEach(async (element) => {
          const res = await getSinglePokemonData(element.name)
          const pokeUpdatedData = {
            name: res.name,
            height: res.height,
            weight: res.weight,
            abilities: res.abilities,
            sprites: res.sprites.other['official-artwork'],
          }
          allPokemonData.value.push(pokeUpdatedData)
        })
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

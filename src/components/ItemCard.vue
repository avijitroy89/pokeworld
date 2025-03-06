<script setup>
import { usePokemonStore } from '@/stores/pokemon'
import { onMounted, computed, ref, watch } from 'vue';

const pokemonStore = usePokemonStore();

const props = defineProps({
    item: {
        type: Object
    }
});

const itemDetails = ref([]);
const abilities = computed(() => {
    return itemDetails?.value.abilities;
})
const pokeImage = computed(() => {
    return itemDetails.value?.sprites?.other["official-artwork"];
})
const searchedData = computed(() => {
    return pokemonStore.searchedData;
})
let matchFound = ref(true)
onMounted(async () => {
    const data = await pokemonStore.getSinglePokemonData(props.item.name);
    itemDetails.value = data;
})
const searchByname = () => {
    // console.log(abilities.value[0].ability.name)
    if (searchedData.value.length > 0 && searchedData.value != '') {

        if (itemDetails.value.name.includes(searchedData.value)) {
            matchFound.value = true
        } else if (abilities.value) {
            abilities.value.forEach(element => {
                // console.log(element.ability.name, searchedData.value)
                if (element.ability.name.includes(searchedData.value)) {
                    matchFound.value = true
                } else {
                    matchFound.value = false
                }
            });
        }
        else {
            matchFound.value = false
        }
    } else {
        matchFound.value = true
    }
}
watch(props, async (newVal) => {
    if (newVal) {
        const data = await pokemonStore.getSinglePokemonData(props.item.name);
        itemDetails.value = data;

    }
});
watch(searchedData, (newVal) => {
    
  console.log('search-watch', newVal == '')
    if (newVal) {
        searchByname()
    }else{
        matchFound.value = true
    }
});

</script>

<template>
    <div class="card" v-if="matchFound">
        <img v-if="pokeImage" :src="pokeImage.front_shiny" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">{{ itemDetails.name }}</h5>
            <p class="card-text" v-if="itemDetails">height: <span>{{ itemDetails.height }}</span></p>
            <p class="card-text" v-if="itemDetails">weight: <span> {{ itemDetails.weight }}</span></p>
        </div>
        <div class="card-header">
            List of Abilities
        </div>
        <ul class="list-group list-group-flush" v-if="itemDetails">
            <li class="list-group-item" v-for="(item, index) in abilities" :key="index">{{ item.ability.name }}</li>
        </ul>
    </div>

</template>

<style></style>
<script setup>
import { onMounted } from 'vue';


const props = defineProps({
    item: {
        type: Object
    }
});

onMounted(async () => {
    // const data = await pokemonStore.getSinglePokemonData(props.item.name);
    // itemDetails.value = data;
})
</script>

<template>
    <div class="card">
        <img v-if="props.item" :src="props.item.sprites.front_shiny" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">{{ props.item.name }}</h5>
            <p class="card-text" v-if="props.item">height: <span>{{ props.item.height }}</span></p>
            <p class="card-text" v-if="props.item">weight: <span> {{ props.item.weight }}</span></p>
        </div>
        <div class="card-header">
            List of Abilities
        </div>
        <ul class="list-group list-group-flush" v-if="props.item">
            <li class="list-group-item" v-for="(data, index) in props.item.abilities" :key="index">{{ data.ability.name
                }}</li>
        </ul>
    </div>

</template>

<style></style>
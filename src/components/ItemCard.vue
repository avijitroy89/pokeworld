<script setup>
import { onMounted } from 'vue';


const props = defineProps({
    item: {
        type: Object
    }
})
onMounted(async () => {
})

</script>

<template>
    <div class="card">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png"
            class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ props.item.name }}</h5>
            <p class="card-text">height: <span>23</span></p>
            <p class="card-text">weight: <span>30</span></p>
        </div>
        <div class="card-header">
            List of Abilities
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ability 1</li>
            <li class="list-group-item">ability 2</li>
        </ul>
    </div>

</template>

<style></style>
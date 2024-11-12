<script setup>
    defineProps({
        target: {
            type: Number,
            required: true
        }
    })
</script>

<template>
    <div class="btn-group align-top">
        <button class="btn btn-sm btn-outline-secondary badge" type="button" data-bs-toggle="modal" :data-bs-target="'#' + target">Редактировать</button>
        <button class="btn btn-sm btn-outline-secondary badge" type="button" data-bs-toggle="modal" :data-bs-target="'#' + target + '-delete'">🗑️</button>
    </div>
</template>
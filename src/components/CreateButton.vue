<script setup>
    defineProps({
        target: {
            type: String,
            required: true
        }
    })
</script>

<template>
    <div class="col-12 col-lg-3 mb-3">
        <div class="card">
            <div class="card-body">
                <div class="text-center px-xl-3">
                    <button class="btn btn-success btn-block" type="button" data-bs-toggle="modal" :data-bs-target="'#' + target"><slot>Новый клиент</slot></button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
  import CustomHeader from '@/components/CustomHeader.vue';
  import CarTable from '@/components/cars/CarTable.vue';
  import CreateButton from '@/components/CreateButton.vue';
</script>
<template>
    <CustomHeader><h6 class="mr-2"><span>Список автомобилей</span></h6></CustomHeader>
    <CarTable></CarTable>
    <CreateButton target="car-create-modal">Новая машина</CreateButton>
</template>
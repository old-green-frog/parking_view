<script setup>
  import CustomHeader from '@/components/CustomHeader.vue';
  import SlotTable from '@/components/slots/SlotTable.vue';
  import CreateButton from '@/components/CreateButton.vue';
</script>
<template>
    <CustomHeader><h6 class="mr-2"><span>Список парковочных мест</span></h6></CustomHeader>
    <SlotTable></SlotTable>
    <CreateButton target="slot-create-modal">Новый слот</CreateButton>
</template>
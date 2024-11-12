<script setup>
  import CustomHeader from '@/components/CustomHeader.vue';
  import PersonTable from '@/components/person/PersonTable.vue';
  import CreateButton from '@/components/CreateButton.vue';
</script>
<template>
    <CustomHeader><h6 class="mr-2"><span>Список клиентов</span></h6></CustomHeader>
    <PersonTable></PersonTable>
    <CreateButton target="person-create-modal"></CreateButton>
</template>
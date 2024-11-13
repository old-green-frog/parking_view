<script setup>
  import CustomHeader from '@/components/CustomHeader.vue';
  import StatusTable from '@/components/status/StatusTable.vue';
  import CreateButton from '@/components/CreateButton.vue';
</script>
<template>
    <CustomHeader><h6 class="mr-2"><span>Список возможных статусов парковочного места</span></h6></CustomHeader>
    <StatusTable></StatusTable>
    <CreateButton target="status-create-modal">Новый статус</CreateButton>
</template>
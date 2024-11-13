<script setup>
    import UDButtons from '../UDButtons.vue';
    import axios from 'axios';
    import { ref, onMounted } from 'vue';
    import CreateForm from './CreateForm.vue';
    import DeleteForm from './DeleteForm.vue';
    import UpdateForm from './UpdateForm.vue';

    const statuses_ref = ref([]);
    const fetching = ref(false);

    async function fetchInitialStatuses() {
        fetching.value = true;
        const statuses = await axios.get("statuses/");
        statuses_ref.value.push(...(statuses.data || []))

        fetching.value = false;
    }

    function deleteStatus(id) {
        fetching.value = true;
        statuses_ref.value = statuses_ref.value.filter((status) => status.id != id);
        fetching.value = false;
    }

    function createStatus(status) {
        fetching.value = true;
        statuses_ref.value.push(status);
        fetching.value = false;
    }

    function updateStatus(status) {
        fetching.value = true;
        var foundIndex = statuses_ref.value.findIndex(x => x.id == status.id);
        statuses_ref.value[foundIndex] = status;
        fetching.value = false;
    }

    onMounted(async () => {
        await fetchInitialStatuses()
    })
</script>

<template>
    <div class="e-table">
        <div class="table-responsive table-lg mt-3">
            <table class="table table-bordered" v-if="!fetching">
                <thead>
                <tr>
                    <th scope="col" class="text-nowrap align-middle text-center">Порядковый номер</th>
                    <th scope="col" class="text-nowrap align-middle text-center">Английское наименование</th>
                    <th scope="col" class="text-nowrap align-middle text-center">Русское наименование</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr class="align-middle text-center" v-for="(status, index) in statuses_ref" :key="status.id">
                    <td class="text-nowrap align-left">{{ index + 1 }}</td>
                    <td>{{ status.status_string }}</td>
                    <td>{{ status.status_string_rus }}</td>
                    <td class="text-center align-middle"><UDButtons :target="status.id"></UDButtons>
                        <DeleteForm :target="status.id" @delete="(id) => deleteStatus(id)"></DeleteForm>
                        <UpdateForm :status="status" @update="(status) => updateStatus(status)"></UpdateForm>
                    </td>
                </tr>
                </tbody>
            </table>
            <div v-else>Загрузка...</div>
        </div>
    </div>
    <CreateForm @create="(status) => createStatus(status)"></CreateForm>
</template>
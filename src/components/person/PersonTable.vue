<script setup>
    import UDButtons from '../UDButtons.vue';
    import axios from 'axios';
    import { ref, onMounted } from 'vue';
    import CreateForm from './CreateForm.vue';
    import DeleteForm from './DeleteForm.vue';

    const persons_ref = ref([]);
    const fetching = ref(false);

    async function fetchInitialPersons() {
        fetching.value = true;
        const persons = await axios.get("persons/");
        persons_ref.value.push(...(persons.data || []))

        fetching.value = false;
    }

    function deletePerson(id) {
        fetching.value = true;
        persons_ref.value = persons_ref.value.filter((person) => person.id != id);
        fetching.value = false;
    }

    onMounted(async () => {
        await fetchInitialPersons()
    })
</script>

<template>
    <div class="e-table">
        <div class="table-responsive table-lg mt-3">
            <table class="table table-bordered" v-if="!fetching">
                <thead>
                <tr>
                    <th scope="col" class="text-nowrap align-middle text-center">Порядковый номер</th>
                    <th scope="col" class="align-middle text-center">ФИО</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr class="align-middle text-center" v-for="(person, index) in persons_ref" :key="person.id">
                    <td class="text-nowrap align-left">{{ index + 1 }}</td>
                    <td>{{ person.surname }} {{ person.name }} {{ person.middlename }}</td>
                    <td class="text-center align-middle"><UDButtons :target="person.id"></UDButtons>
                        <DeleteForm :target="person.id" @delete="(id) => deletePerson(id)"></DeleteForm></td>
                </tr>
                </tbody>
            </table>
            <div v-else>Загрузка...</div>
        </div>
    </div>
    <CreateForm></CreateForm>
</template>
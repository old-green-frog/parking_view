<script setup>
    import UDButtons from '../UDButtons.vue';
    import axios from 'axios';
    import { ref, onMounted } from 'vue';
    import CreateForm from './CreateForm.vue';
    import DeleteForm from './DeleteForm.vue';
    import UpdateForm from './UpdateForm.vue';

    const slots_ref = ref([]);
    const cars_ref = ref([]);
    const statuses_ref = ref([]);
    const persons_ref = ref([]);
    const fetching = ref(false);

    async function fetchInitialSlots() {
        fetching.value = true;
        const [slots, cars, statuses, persons] = await Promise.all([axios.get("slots/"), axios.get("cars/"), axios.get("statuses/"), axios.get("persons/")]);

        slots_ref.value.push(...(slots.data || []))
        cars_ref.value.push(...(cars.data || []))
        statuses_ref.value.push(...(statuses.data || []))
        persons_ref.value.push(...(persons.data || []))

        fetching.value = false;
    }

    function deleteSlot(id) {
        fetching.value = true;
        slots_ref.value = slots_ref.value.filter((slot) => slot.id != id);
        fetching.value = false;
    }

    function createSlot(slot) {
        fetching.value = true;
        slots_ref.value.push(slot);
        fetching.value = false;
    }

    function updateSlot(slot) {
        fetching.value = true;
        var foundIndex = slots_ref.value.findIndex(x => x.id == slot.id);
        slots_ref.value[foundIndex] = slot;
        fetching.value = false;
    }

    function getSlotStatus(status_id) {
        return statuses_ref.value.find((status) => status.id == status_id).status_string_rus
    }

    function getCarNumber(car_id) {
        return cars_ref.value.find((car) => car.id == car_id).number
    }

    function getCars() {
        return cars_ref.value;
    }

    function getStatuses() {
        return statuses_ref.value;
    }

    function getPersons() {
        return persons_ref.value;
    }

    onMounted(async () => {
        await fetchInitialSlots()
    })
</script>

<template>
    <div class="e-table">
        <div class="table-responsive table-lg mt-3">
            <table class="table table-bordered" v-if="!fetching">
                <thead>
                <tr>
                    <th scope="col" class="text-nowrap align-middle text-center">Порядковый номер</th>
                    <th scope="col" class="align-middle text-center">Номер парковочного места</th>
                    <th scope="col" class="text-nowrap align-middle text-center">Стоимость резерва</th>
                    <th scope="col" class="text-nowrap align-middle text-center">Статус слота</th>
                    <th scope="col" class="text-nowrap align-middle text-center">Регистрационный номер машины</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr class="align-middle text-center" v-for="(slot, index) in slots_ref" :key="slot.id">
                    <td class="text-nowrap align-left">{{ index + 1 }}</td>
                    <td>{{ slot.number }}</td>
                    <td>{{ slot.cost }}</td>
                    <td>{{ getSlotStatus(slot.status_id) }}</td>
                    <td>{{ getCarNumber(slot.car_id) }}</td>
                    <td class="text-center align-middle"><UDButtons :target="slot.id"></UDButtons>
                        <DeleteForm :target="slot.id" @delete="(id) => deleteSlot(id)"></DeleteForm>
                        <UpdateForm :parking_slot="slot" :cars="getCars()" :statuses="getStatuses()" :persons="getPersons()" @update="(slot) => updateSlot(slot)"></UpdateForm>
                    </td>
                </tr>
                </tbody>
            </table>
            <div v-else>Загрузка...</div>
        </div>
    </div>
    <CreateForm :cars="getCars()" :statuses="getStatuses()" :persons="getPersons()" @create="(slot) => createSlot(slot)"></CreateForm>
</template>
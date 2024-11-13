<script setup>
    import UDButtons from '../UDButtons.vue';
    import axios from 'axios';
    import { ref, onMounted } from 'vue';
    import CreateForm from './CreateForm.vue';
    import DeleteForm from './DeleteForm.vue';
    import UpdateForm from './UpdateForm.vue';

    const cars_ref = ref([]);
    const persons_ref = ref([]);
    const fetching = ref(false);

    async function fetchInitialCars() {
        fetching.value = true;
        const [cars, persons] = await Promise.all([axios.get("cars/"), axios.get("persons/")]);

        cars_ref.value.push(...(cars.data || []))
        persons_ref.value.push(...(persons.data || []))

        fetching.value = false;
    }

    function deleteCar(id) {
        fetching.value = true;
        cars_ref.value = cars_ref.value.filter((car) => car.id != id);
        fetching.value = false;
    }

    function createCar(car) {
        fetching.value = true;
        cars_ref.value.push(car);
        fetching.value = false;
    }

    function updateCar(car) {
        fetching.value = true;
        var foundIndex = cars_ref.value.findIndex(x => x.id == car.id);
        cars_ref.value[foundIndex] = car;
        fetching.value = false;
    }

    function getCarOwner(person_id) {
        const owner = persons_ref.value.find((person) => person.id == person_id);
        return owner.surname + ' ' + owner.name + ' ' + owner.middlename;
    }

    function getPersons() {
        return persons_ref.value;
    }

    onMounted(async () => {
        await fetchInitialCars()
    })
</script>

<template>
    <div class="e-table">
        <div class="table-responsive table-lg mt-3">
            <table class="table table-bordered" v-if="!fetching">
                <thead>
                <tr>
                    <th scope="col" class="text-nowrap align-middle text-center">Порядковый номер</th>
                    <th scope="col" class="align-middle text-center">Регистрационный знак</th>
                    <th scope="col" class="text-nowrap align-middle text-center">ФИО владельца</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr class="align-middle text-center" v-for="(car, index) in cars_ref" :key="car.id">
                    <td class="text-nowrap align-left">{{ index + 1 }}</td>
                    <td>{{ car.number }}</td>
                    <td>{{ getCarOwner(car.person_id) }}</td>
                    <td class="text-center align-middle"><UDButtons :target="car.id"></UDButtons>
                        <DeleteForm :target="car.id" @delete="(id) => deleteCar(id)"></DeleteForm>
                        <UpdateForm :car="car" :persons="getPersons()" @update="(car) => updateCar(car)"></UpdateForm>
                    </td>
                </tr>
                </tbody>
            </table>
            <div v-else>Загрузка...</div>
        </div>
    </div>
    <CreateForm :persons="getPersons()" @create="(car) => createCar(car)"></CreateForm>
</template>
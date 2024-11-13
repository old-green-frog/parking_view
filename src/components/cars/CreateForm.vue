<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    import * as bootstrap from 'bootstrap';

    defineProps({
        persons: {
            type: Array,
            required: true
        }
    })
    
    const number = ref('');
    const person_id = ref('');

    const emit = defineEmits(['create']);

    function createCar() {
        const modalInstance = bootstrap.Modal.getOrCreateInstance('#car-create-modal');
        modalInstance.hide();
        const car_data = {
            number: number.value,
            person_id: person_id.value,
        };

        number.value = '';
        person_id.value = '';

        axios.post('cars/create/', car_data)
        .then((response) => {
            emit('create', response.data);
        })
        .catch((error) => {
            alert(`Возникла непридвиденная ошибка: ${error.message}`);
        })
    }
</script>
<template>
    <div class="modal fade" role="dialog" tabindex="-1" id="car-create-modal">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Создать машину</h5>
                    <button type="button" class="close" data-bs-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="py-1">
                        <form class="form" action="#" @submit.prevent="createCar">
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="fio">ФИО владельца</label>
                                                <select id="fio" v-model="person_id" required>
                                                    <option v-for="person in persons" :key="person.id" :value="person.id">
                                                        {{  person.surname }} {{  person.name }} {{ person.middlename }}
                                                    </option>
                                                </select>

                                                <label for="name">Регистрационный знак</label>
                                                <input class="form-control" id="name" v-model="number" type="text" name="name" placeholder="ч345оо161" required>
                                            </div>
                                        </div>
                                </div>
                                <div class="col d-flex justify-content-end">
                                    <button class="btn btn-primary" type="submit">Сохранить</button>
                                </div>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
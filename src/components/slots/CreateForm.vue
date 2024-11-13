<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    import * as bootstrap from 'bootstrap';

    defineProps({
        cars: {
            type: Array,
            required: true
        },
        statuses: {
            type: Array,
            required: true
        },
        persons: {
            type: Array,
            required: true
        }
    })
    
    const number = ref('');
    const cost = ref('');
    const status_id = ref('');
    const car_id = ref('');

    const emit = defineEmits(['create']);

    function createSlot() {
        const modalInstance = bootstrap.Modal.getOrCreateInstance('#slot-create-modal');
        modalInstance.hide();
        const slot_data = {
            number: number.value,
            cost: cost.value,
            status_id: status_id.value,
            car_id: car_id.value
        };

        number.value = '';
        cost.value = '';
        status_id.value = '';
        car_id.value = '';

        axios.post('slots/create/', slot_data)
        .then((response) => {
            emit('create', response.data);
        })
        .catch((error) => {
            alert(`Возникла непридвиденная ошибка: ${error.message}`);
        })
    }
</script>
<template>
    <div class="modal fade" role="dialog" tabindex="-1" id="slot-create-modal">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Создать слот</h5>
                    <button type="button" class="close" data-bs-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="py-1">
                        <form class="form" action="#" @submit.prevent="createSlot">
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label class="text-left align-left" for="number_create">Номер парковочного места</label>
                                                <input class="form-control" id="number_create" v-model="number" type="text" name="number" placeholder="36" required>
                                                <label class="text-left align-left" for="cost_create">Стоимость резерва</label>
                                                <input class="form-control" id="cost_create" v-model="cost" type="text" name="number" placeholder="2600" required>

                                                <label class="text-left align-left" for="status_create">Статус слота</label>
                                                <select id="status_create" v-model="status_id" required>
                                                    <option v-for="status in statuses" :key="status.id" :value="status.id">
                                                        {{ status.status_string_rus }}
                                                    </option>
                                                </select>
                                                <label class="text-left align-left" for="car_create">Регистрационный номер машины</label>
                                                <select id="car_create" v-model="car_id" required>
                                                    <option v-for="car in cars" :key="car.id" :value="car.id">
                                                        {{ car.number }} ({{ persons.find((person) => person.id == car.person_id).surname }})
                                                    </option>
                                                </select><br>
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
<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    import * as bootstrap from 'bootstrap';

    const number = ref('');
    const person_id = ref('');

    const emit = defineEmits(['update'])

    defineProps({
        car: {
            type: Object,
            required: true
        },
        persons: {
            type: Array,
            required: true
        }
    })

    function submitUpdate(old_car) {
        const modalInstance = bootstrap.Modal.getOrCreateInstance(`#${old_car.id}`);
        modalInstance.hide();
        axios.put(`cars/${old_car.id}/`, {
            number: number.value ? number.value : old_car.number,
            person_id: person_id.value ? person_id.value : old_car.person_id,
        })
            .then((response) => {
                emit('update', response.data);
            })
            .catch((error) => {
                alert(`Возникла непридвиденная ошибка: ${error.message}`);
            });
        
        number.value = '';
        person_id.value = '';
    }
</script>
<template>
    <div class="modal fade" role="dialog" tabindex="-1" :id="car.id">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Обновить данные машины [{{ car.id }}]</h5>
                    <button type="button" class="close" data-bs-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="py-1">
                        <form class="form" novalidate="false" @submit.prevent="submitUpdate(car)">
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group text-left align-left">
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
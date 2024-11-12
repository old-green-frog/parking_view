<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    import * as bootstrap from 'bootstrap';
    
    const surname = ref('');
    const name = ref('');
    const middlename = ref('');

    const emit = defineEmits(['create']);

    function createPerson() {
        const modalInstance = bootstrap.Modal.getOrCreateInstance('#person-create-modal');
        modalInstance.hide();
        const person_data = {
            name: name.value,
            surname: surname.value,
            middlename: middlename.value
        };

        name.value = '';
        surname.value = '';
        surname.value = '';

        axios.post('persons/create/', person_data)
        .then((response) => {
            emit('create', response.data);
        })
        .catch((error) => {
            alert(`Возникла непридвиденная ошибка: ${error.message}`);
        })
    }
</script>
<template>
    <div class="modal fade" role="dialog" tabindex="-1" id="person-create-modal">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Создать клиента</h5>
                    <button type="button" class="close" data-bs-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="py-1">
                        <form class="form" action="#" @submit.prevent="createPerson">
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="fio">Фамилия</label>
                                                <input class="form-control" id="fio" v-model="surname" type="text" name="name" placeholder="Сергеев" required>

                                                <label for="name">Имя</label>
                                                <input class="form-control" id="name" v-model="name" type="text" name="name" placeholder="Сергей" required>

                                                <label for="middle">Отчество</label>
                                                <input class="form-control" id="middle" v-model="middlename" type="text" name="name" placeholder="Сергеевич" required>
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
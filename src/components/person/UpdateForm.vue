<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    import * as bootstrap from 'bootstrap';

    const surname = ref('');
    const name = ref('');
    const middlename = ref('');

    const emit = defineEmits(['update'])

    defineProps({
        person: {
            type: Object,
            required: true
        }
    })

    function submitUpdate(old_person) {
        const modalInstance = bootstrap.Modal.getOrCreateInstance(`#${old_person.id}`);
        modalInstance.hide();
        axios.put(`persons/${old_person.id}/`, {
            name: name.value ? name.value : old_person.name,
            surname: surname.value ? surname.value : old_person.surname,
            middlename: middlename.value ? middlename.value : old_person.middlename
        })
            .then((response) => {
                emit('update', response.data);
            })
            .catch((error) => {
                alert(`Возникла непридвиденная ошибка: ${error.message}`);
            });
        
        name.value = '';
        surname.value = '';
        surname.value = '';
    }
</script>
<template>
    <div class="modal fade" role="dialog" tabindex="-1" :id="person.id">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Обновить данные клиента [{{ person.id }}]</h5>
                    <button type="button" class="close" data-bs-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="py-1">
                        <form class="form" novalidate="false" @submit.prevent="submitUpdate(person)">
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group text-left align-left">
                                                <label class="text-left align-left" for="fio_update">Фамилия</label>
                                                <input class="form-control" id="fio_update" v-model="surname" type="text" name="name" placeholder="Сергеев">

                                                <label class="text-left align-left" for="name_update">Имя</label>
                                                <input class="form-control" id="name_update" v-model="name" type="text" name="name" placeholder="Сергей">

                                                <label class="text-left align-left" for="middle_update">Отчество</label>
                                                <input class="form-control" id="middle_update" v-model="middlename" type="text" name="name" placeholder="Сергеевич">
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
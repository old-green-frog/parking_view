<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    import * as bootstrap from 'bootstrap';

    const status_string = ref('');
    const status_string_rus = ref('');

    const emit = defineEmits(['update'])

    defineProps({
        status: {
            type: Object,
            required: true
        }
    })

    function submitUpdate(old_status) {
        const modalInstance = bootstrap.Modal.getOrCreateInstance(`#${old_status.id}`);
        modalInstance.hide();
        axios.put(`statuses/${old_status.id}/`, {
            status_string: status_string.value ? status_string.value : old_status.status_string,
            status_string_rus: status_string_rus.value ? status_string_rus.value : old_status.status_string_rus,
        })
            .then((response) => {
                emit('update', response.data);
            })
            .catch((error) => {
                alert(`Возникла непридвиденная ошибка: ${error.message}`);
            });
        
        status_string.value = '';
        status_string_rus.value = '';
    }
</script>
<template>
    <div class="modal fade" role="dialog" tabindex="-1" :id="status.id">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Обновить данные статуса [{{ status.id }}]</h5>
                    <button type="button" class="close" data-bs-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="py-1">
                        <form class="form" novalidate="false" @submit.prevent="submitUpdate(status)">
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group text-left align-left">
                                                <label for="fio">Английское наименование</label>
                                                <input class="form-control" id="fio" v-model="status_string" type="text" name="name" placeholder="qwerty">

                                                <label for="name">Русское наименование</label>
                                                <input class="form-control" id="name" v-model="status_string_rus" type="text" name="name" placeholder="Занято">
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
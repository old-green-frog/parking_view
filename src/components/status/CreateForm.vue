<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    import * as bootstrap from 'bootstrap';
    
    const status_string = ref('');
    const status_string_rus = ref('');

    const emit = defineEmits(['create']);

    function createStatus() {
        const modalInstance = bootstrap.Modal.getOrCreateInstance('#status-create-modal');
        modalInstance.hide();
        const status_data = {
            status_string: status_string.value,
            status_string_rus: status_string_rus.value,
        };

        status_string.value = '';
        status_string_rus.value = '';

        axios.post('statuses/create/', status_data)
        .then((response) => {
            emit('create', response.data);
        })
        .catch((error) => {
            alert(`Возникла непридвиденная ошибка: ${error.message}`);
        })
    }
</script>
<template>
    <div class="modal fade" role="dialog" tabindex="-1" id="status-create-modal">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Создать статус</h5>
                    <button type="button" class="close" data-bs-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="py-1">
                        <form class="form" action="#" @submit.prevent="createStatus">
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="fio">Английское наименование</label>
                                                <input class="form-control" id="fio" v-model="status_string" type="text" name="name" placeholder="qwerty" required>

                                                <label for="name">Русское наименование</label>
                                                <input class="form-control" id="name" v-model="status_string_rus" type="text" name="name" placeholder="Занято" required>
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
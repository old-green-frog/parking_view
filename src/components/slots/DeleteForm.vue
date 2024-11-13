<script setup>
    import axios from 'axios';
    import * as bootstrap from 'bootstrap';

    const emit = defineEmits(['delete'])

    defineProps({
        target: {
            type: Number,
            required: true
        }
    })

    function submitDelete(id) {
        const modalInstance = bootstrap.Modal.getOrCreateInstance(`#${id}-delete`);
        modalInstance.hide();
        axios.delete(`slots/${id}/`)
            .then(() => {
                emit('delete', id);
            })
            .catch((error) => {
                alert(`Возникла непридвиденная ошибка: ${error.message}`);
            });
    }
</script>
<template>
    <div class="modal fade" role="dialog" tabindex="-1" :id="target + '-delete'">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Вы действительно хотите удалить слот [{{ target }}]?</h5>
                    <button type="button" class="close" data-bs-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="py-1">
                        <form class="form" novalidate="false" @submit.prevent="submitDelete(target)">
                            <div class="row">
                                <div class="col">
                                    <div class="col d-flex justify-content-end">
                                        <button class="btn btn-primary" type="submit" style="margin-right:25px;">Да</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Отмена</button>
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
<template>
    <a-button class="text-black my-3" type="primary" @click="showDrawer(), onAdd(), resetFields()">
        <template #icon>
            <PlusOutlined />
        </template>
        New account
    </a-button>
    <div>
        <a-table :columns="columns" :data-source="dataSource" :scroll="{ x: 1500, y: 600 }" bordered>
            <template #bodyCell="{ column, text, record }">
                <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">
                    <div>
                        <a-input v-if="editableData[record.id]"
                            v-model:value="editableData[record.id][column.dataIndex]" style="margin: -5px 0" />
                        <template v-else>
                            {{ text }}
                        </template>
                    </div>
                </template>
                <template v-else-if="column.dataIndex === 'operation'">
                    <div class="flex items-center justify-center">
                        <div class="editable-row-operations text-center mr-2">
                            <span class=" text-center">
                                <button @click="updateAccount(record.id)" ref="update" class="hidden">Save</button>
                                <a-button @click="edit(record), showDrawer(), onEdit()" type="primary" ghost>Edit
                                </a-button>
                            </span>
                        </div>
                        <span v-if="dataSource.length" @click="onDeleteAccount(record.id)">
                            <a-button type=" primary" danger ghost>Delete</a-button>
                        </span>
                    </div>
                </template>
            </template>
        </a-table>
    </div>
    <a-drawer title="Create a new account" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }"
        :footer-style="{ textAlign: 'right' }" @close="onClose">
        <a-form :model="form" :rules="rules" layout="vertical">
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="Name" name="name" v-bind="validateInfos.name">
                        <a-input v-model:value="form.name" placeholder="Please enter user name" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Address" name="address" v-bind="validateInfos.address">
                        <a-input v-model:value="form.address" placeholder="Please enter user address" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="Number" name="number" v-bind="validateInfos.number">
                        <a-input v-model:value="form.number" placeholder="Please enter user Number" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Phone" name="phone" v-bind="validateInfos.phone">
                        <a-input v-model:value="form.phone" placeholder="Please enter user phone" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="Create At" name="createAt" v-bind="validateInfos.createAt">
                        <a-date-picker v-model:value="form.createAt" style="width: 100%"
                            :get-popup-container="trigger => trigger.parentElement" />
                        <!-- <input v-model:value="form.createAt" type="date" /> -->
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <template #extra>
            <a-space>
                <a-button @click="resetFields">Reset</a-button>
                <a-button v-if="actionVisible" class="text-black" type="submit" @click="addAccount">Submit</a-button>
                <a-button v-else-if="!actionVisible" class="text-black" @click="update?.click()">Update
                </a-button>
            </a-space>
        </template>
    </a-drawer>
</template>
<script lang="ts">
import type { TableColumnsType } from 'ant-design-vue';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { message, Modal } from 'ant-design-vue';
// import Api from '@/axios/axios';
import { defineComponent, ref, reactive, computed, createVNode, ComponentPublicInstance } from 'vue';
import store from '@/store'
import { Rule, useForm } from 'ant-design-vue/es/form';
import { cloneDeep } from 'lodash-es';
import type { UnwrapRef } from 'vue';
import EditAccount from '@/views/AccountView/EditAccount.vue'
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment'

interface DataItem {
    id: string;
    name: string;
    phone: number;
    address: string;
    number: number;
    createAt: Date
}

export default defineComponent({
    components: {
        PlusOutlined,
        EditAccount
    },
    setup() {
        const actionVisible = ref<Boolean>()

        const onAdd = () => {
            actionVisible.value = true
        }

        const onEdit = () => {
            actionVisible.value = false
        }

        const modalVisible = ref<boolean>(false);

        const showModal = () => {
            modalVisible.value = true;
        };

        const handleOk = (e: MouseEvent) => {
            console.log(e);
            modalVisible.value = false;
        };

        let data: DataItem[] = []

        const getAllUser = async () => {
            await store.dispatch('getAllAccount')
            dataSource.value = await store.state.accounts
        }
        getAllUser();

        const columns: TableColumnsType = [
            {
                title: 'Name',
                dataIndex: 'name',
                width: '15%',
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                width: '15%',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                width: '30%',
            },
            {
                title: 'Number',
                dataIndex: 'number',
                width: '15%',
            },
            {
                title: 'Create At',
                dataIndex: 'createAt',
                width: '15%',
            },
            {
                title: 'operation',
                dataIndex: 'operation',
            },
        ];

        const dataSource = ref(data);

        const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

        const m = moment();

        const edit = (obj: { name: string; address: string; number: string; phone: string; createAt: any; id: any; }) => {
            console.log(m.format('DD-MM-YYYY'));
            form.name = obj.name;
            form.address = obj.address;
            form.number = obj.number;
            form.phone = obj.phone;
            // form.createAt = moment().format('MMMM Do YYYY, h:mm:ss a')
            console.log(obj.createAt);
        };

        const update = ref<HTMLDivElement>()



        const cancel = (key: string) => {
            delete editableData[key];
        };

        const dateFormat = 'YYYY-MM-DD';
        let form = reactive({
            name: '',
            address: '',
            number: '',
            phone: '',
            createAt: '',
        });

        const rules: Record<string, Rule[]> = {
            name: [{ required: true, message: 'Please enter user name' }],
            address: [{ required: true, message: 'Please enter address' }],
            number: [{ required: true, message: 'Please enter an number' }],
            phone: [{ required: true, message: 'Please enter the phone' }],
            createAt: [{ required: true, message: 'Please choose the dateTime', type: 'object' }],
        };

        const { validateInfos, validate, resetFields } = useForm(form, rules)

        const visible = ref<boolean>(false);

        const showDrawer = () => {
            visible.value = true;
        };

        const onClose = () => {
            visible.value = false;
        };

        const addAccount = () => {
            validate().then(async () => {
                let createdAccount = await store.dispatch('addAccount', form)
                if (createdAccount.error) {
                    console.log(createdAccount.error);
                    message.error('Error: ' + createdAccount.error);
                } else {
                    console.log(createdAccount.error);
                    message.success('Added an account!');
                    getAllUser();
                    // resetFields();
                }
            }).catch(err => {
                console.log(err);
            })
        }

        const updateAccount = (key) => {
            console.log(key);
            Modal.confirm({
                title: 'Do you want to save?',
                okText: 'Yes',
                okType: 'primary',
                icon: createVNode(ExclamationCircleOutlined),
                async onOk() {
                    let updateAccount = await store.dispatch('updateAccount', { form, key })
                    if (updateAccount.error) {
                        message.error('Error: ' + updateAccount.error)
                        console.log(updateAccount.error);
                    } else {
                        getAllUser();
                        console.log(updateAccount.error);
                        message.success('Updated an account with id: ' + key)
                        resetFields();

                    }
                },
                onCancel() { },
            })
        };

        const onDeleteAccount = (key: string) => {
            Modal.confirm({
                title: 'Do you want to delete these items?',
                okText: 'Yes',
                okType: 'danger',
                icon: createVNode(ExclamationCircleOutlined),
                async onOk() {
                    console.log(key);
                    let deleteAccount = await store.dispatch('deleteAccount', key)
                    if (deleteAccount.error) {
                        message.error('Error: ' + deleteAccount.error)
                        console.log(deleteAccount.error);
                    } else {
                        getAllUser();
                        console.log(deleteAccount.error);
                        message.success('Deleted an account with id: ' + key)
                    }
                },
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onCancel() { },
            })
        };

        return {
            data,
            columns,
            form,
            rules,
            visible,
            showDrawer,
            onClose,
            addAccount,
            validateInfos,
            validate,
            resetFields,
            edit,
            updateAccount,
            cancel,
            dataSource,
            editableData,
            onDeleteAccount,
            showModal,
            handleOk,
            modalVisible,
            // editing,
            actionVisible,
            onAdd,
            onEdit,
            update
        };
    }
});
</script>


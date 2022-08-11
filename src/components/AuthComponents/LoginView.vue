<template>
    <!-- <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish" @finishFailed="onFinishFailed" @submit.prevent="onSubmit">
        <a-form-item label="Username" name="identifier"
            :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.identifier">
                <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                </template>
            </a-input>
        </a-form-item>

        <a-form-item label="Password" name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-password v-model:value="formState.password">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
        </a-form-item>

        <div class="login-form-wrap">
            <a-form-item name="remember" no-style>
                <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
            </a-form-item>
            <a class="login-form-forgot" href="">Forgot password</a>
        </div>

        <a-form-item>
            <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                Log in
            </a-button>
            Or
            <a href="">register now!</a>
        </a-form-item>
    </a-form> -->
    <div class="bg-white dark:bg-gray-900">
        <div class="flex justify-center h-screen">
            <div class="hidden bg-cover lg:block lg:w-2/3"
                style="background-image: url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)">
                <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
                        <h2 class="text-4xl font-bold text-white">Brand</h2>

                        <p class="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam
                            temporibus molestiae</p>
                    </div>
                </div>
            </div>

            <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <div class="flex-1">
                    <div class="text-center">
                        <h2 class="text-4xl font-bold text-center text-gray-700 dark:text-white">Brand</h2>

                        <p class="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
                    </div>

                    <div class="mt-8">
                        <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
                            @finishFailed="onFinishFailed" @submit.prevent="loginUser">
                            <a-form-item label="Username" name="identifier"
                                :rules="[{ required: true, message: 'Please input your username!' }]">
                                <a-input v-model:value="formState.identifier">
                                    <template #prefix>
                                        <UserOutlined class="site-form-item-icon" />
                                    </template>
                                </a-input>
                            </a-form-item>

                            <a-form-item label="Password" name="password"
                                :rules="[{ required: true, message: 'Please input your password!' }]">
                                <a-input-password v-model:value="formState.password">
                                    <template #prefix>
                                        <LockOutlined class="site-form-item-icon" />
                                    </template>
                                </a-input-password>
                            </a-form-item>

                            <div class="login-form-wrap">
                                <a-form-item name="remember" no-style>
                                    <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                                </a-form-item>
                                <a class="login-form-forgot" href="">Forgot password</a>
                            </div>

                            <a-form-item>
                                <a-button :disabled="disabled" type="primary" html-type="submit"
                                    class="login-form-button">
                                    Log in
                                </a-button>
                                Or
                                <a href="">register now!</a>
                            </a-form-item>
                        </a-form>

                        <p class="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="#"
                                class="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
// import axios from 'axios';
import Api from '@/axios/axios'
import store from '@/store';
interface FormState {
    identifier: string;
    password: string;
    remember: boolean;
}
export default defineComponent({
    components: {
        UserOutlined,
        LockOutlined,
    },
    setup() {
        const router = useRouter();

        const formState = reactive<FormState>({
            identifier: '',
            password: '',
            remember: true,
        });
        const onFinish = (values: any) => {
            console.log('Success:', values);
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };
        const disabled = computed(() => {
            return !(formState.identifier && formState.password);
        });

        const loginUser = async () => {
            let user = await store.dispatch('loginUser', formState)
            if (user.error) {
                alert(user.error)
            } else {
                alert('login' + user)
                router.push({ name: 'home', params: {} })
            }
        }

        return {
            formState,
            onFinish,
            onFinishFailed,
            disabled,
            loginUser
        };
    },
});
</script>
<style>
#components-form-demo-normal-login .login-form {
    max-width: 300px;
}

#components-form-demo-normal-login .login-form-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

#components-form-demo-normal-login .login-form-forgot {
    margin-bottom: 24px;
}

#components-form-demo-normal-login .login-form-button {
    width: 100%;
}
</style>

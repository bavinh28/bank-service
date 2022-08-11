<template>
  <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish" @finishFailed="onFinishFailed" @submit.prevent="onSubmit">
    <a-form-item label="Username" name="identifier" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="formState.identifier">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
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
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import axios from 'axios'
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


    const onSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:1337/api/auth/local', formState)
        console.log(response);
        console.log(response.data.jwt);
        localStorage.setItem('token', response.data.jwt);
        // router.push({ name: 'home', params: {} })
      } catch (error) {
        console.log('error');
      }
    }
    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
      onSubmit
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

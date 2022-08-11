<template>
    <div class="flex flex-wrap-reverse mt-4 gap-4 h-full mr-5">
        <a-space direction="vertical">
            <a-input-search v-model:value="value" placeholder="input search text" style="width: 200px"
                @search="onSearch" />
        </a-space>
        <a-dropdown-button>
            {{ store.state.currentUser.username }}
            <template #overlay>
                <a-menu @click="handleMenuClick">
                    <a-menu-item key="1">
                        <UserOutlined />
                        <router-link to="/home/profile">Profile</router-link>
                    </a-menu-item>
                    <a-menu-item key="2">
                        <UserOutlined />
                        2nd menu item
                    </a-menu-item>
                    <a-menu-item key="3" @click="onLogout">
                        <UserOutlined />
                        Log out
                    </a-menu-item>
                </a-menu>
            </template>
            <template #icon>
                <UserOutlined />
            </template>
        </a-dropdown-button>
    </div>
</template>
<script lang="ts">
import {
    UserOutlined, PicRightOutlined, MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { computed, defineComponent, ref } from 'vue';
import type { MenuProps } from 'ant-design-vue';
import { mapState, useStore } from 'vuex';
import Api from '@/axios/axios';
import { useRouter } from 'vue-router'
export default defineComponent({
    components: {
        UserOutlined,
        PicRightOutlined,
        MenuUnfoldOutlined,
        MenuFoldOutlined
    },
    setup() {
        const value = ref<string>('');

        const router = useRouter();

        const store = useStore();
        // console.log(store.state.currentUser.name);


        const onSearch = (searchValue: string) => {
            console.log('use value', searchValue);
            console.log('or use this.value', value.value);
        };

        const handleMenuClick: MenuProps['onClick'] = e => {
            console.log('click', e);
        };

        const currentUser = computed(() => {
            return mapState(['currentUser'])
        })
        
        const logoutUser = () => {
            store.dispatch('logoutUser')
            router.push({ name: 'auth', params: {} })
        }

        const onLogout = () => {
            const answer = window.confirm('Do you want to logout')
            if (answer) {
                logoutUser()
            } else {
                return false
            }
        }

        return {
            value,
            onSearch,
            handleMenuClick,
            collapsed: ref<boolean>(false),
            currentUser,
            store,
            onLogout
        }
    }
});
</script>

<style>
</style>


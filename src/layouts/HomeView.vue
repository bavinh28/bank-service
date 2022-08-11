<template>
    <a-layout class="h-screen" has-sider>
        <a-layout-sider v-model:collapsed="collapsed" collapsible :style="{ overflow: 'auto' }">
            <sidebar-view class="fixed"></sidebar-view>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="trigger" style="background: #fff; padding: 0">
                <div class="flex justify-between">
                    <div class="ml-5">
                        <menu-unfold-outlined v-if="collapsed" class="trigger"
                            @click="() => (collapsed = !collapsed)" />
                        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
                    </div>
                    <header-view></header-view>
                </div>
            </a-layout-header>
            <bread-crumb></bread-crumb>
            <a-layout-content :style="{ margin: '5px 10px', padding: '16px', background: '#F0F2F5' }">
                <div class="h-full">
                    <router-view />
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import SidebarView from '@/components/HomeComponent/SidebarView.vue';
import HeaderView from '../components/HomeComponent/HeaderView.vue';
import BreadCrumb from '@/components/HomeComponent/BreadCrumb.vue';
import Api from '@/axios/axios';
import store from '@/store';
export default defineComponent({
    components: {
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        SidebarView,
        HeaderView,
        BreadCrumb
    },
    setup() {
        return {
            selectedKeys: ref<string[]>(['1']),
            collapsed: ref<boolean>(false),
        };
    },
});
</script>

<style>
</style>
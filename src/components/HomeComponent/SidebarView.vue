<template>
  <div class="logo"><img class="mx-auto my-8" src="https://via.placeholder.com/150x150/" alt=""></div>
  <!-- <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span><router-link to="/home/account"></router-link>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu> -->
  <a-menu class="" v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <a-menu-item key="1">
      <pie-chart-outlined />
      <span>
        <router-link to="/home/account"></router-link>Accounts
      </span>
    </a-menu-item>
    <a-menu-item key="2">
      <desktop-outlined />
      <span>
        <router-link to="/home/bill"></router-link>Bills
      </span>
    </a-menu-item>
    <a-sub-menu key="sub1">
      <template #title>
        <span>
          <user-outlined />
          <span>User</span>
        </span>
      </template>
      <a-menu-item key="3">Tom</a-menu-item>
      <a-menu-item key="4">Bill</a-menu-item>
      <a-menu-item key="5">Alex</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <template #title>
        <span>
          <team-outlined />
          <span>Team</span>
        </span>
      </template>
      <a-menu-item key="6">Team 1</a-menu-item>
      <a-menu-item key="8">Team 2</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="9">
      <file-outlined />
      <span>File</span>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
  FileOutlined,
  PieChartOutlined,
  DesktopOutlined
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
    FileOutlined,
    PieChartOutlined,
    DesktopOutlined
  },
  setup() {
    return {
      selectedKeys: ref<string[]>(['4']),
      collapsed: ref<boolean>(false)
    };
  },
});
</script>


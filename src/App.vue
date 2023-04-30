<template>
    <v-app>
        <v-app-bar
                app
                color="primary"
                dark
        >
            <h3>欢迎使用Python实验命令生成器</h3>
            <v-spacer></v-spacer>
            <h5>该工具可以帮助您快速生成适用于Linux系统的实验命令，还可以记录每次实验的内容</h5>
        </v-app-bar>

        <v-main style="margin: 60px 0">
            <router-view/>
        </v-main>

    </v-app>
</template>

<script>

export default {
    name: 'App',

    data: () => ({
        //
    }),
};
</script>

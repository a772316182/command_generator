<template>
    <v-container>
        <v-row>
            <v-col cols="4">
                <v-btn block color="primary" elevation="0" @click="$router.push('NewExperiment')">从argparse代码新建
                </v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn block color="warning" elevation="0">从备份文件导入</v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn block color="error" elevation="0">导出到备份文件</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-btn block color="error" elevation="0" @click="$router.push('ExperimentHistory')">实验历史</v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn block color="primary" elevation="0">查看使用例子</v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn block color="warning" elevation="0">服务器仪表板</v-btn>
            </v-col>
        </v-row>
        <br>
        <br>
        <v-row>
            <v-col v-for="item in experiments" cols="4">
                <v-card>
                    <v-parallax
                            height="100"
                            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
                    ></v-parallax>
                    <v-card-title>实验：{{ item.name }}</v-card-title>
                    <v-card-text>
                        创建时间：{{ item.create_time }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="deleteExperiment(item)">删除</v-btn>
                        <v-btn color="primary" elevation="0" @click="executeExperiment(item)">使用</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import {deleteExistingExperiment, getAllExperiments, isHaveAnyExperiment} from "@/utils/localStorageManager";

export default {
    name: 'Home',
    components: {},
    data: () => ({
        experiments: []
    }),
    methods: {
        executeExperiment(experiment) {
            this.$router.push({
                name: 'ExecuteExperiment',
                params: {
                    experiment
                }
            })
        },
        deleteExperiment(experiment) {
            deleteExistingExperiment(experiment)
            this.experiments = getAllExperiments()
        }
    },
    mounted() {
        if (isHaveAnyExperiment()) {
            this.experiments = getAllExperiments()
        }
    }
}
</script>

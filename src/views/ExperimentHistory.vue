<template>
    <v-container>
        <template v-if="experimentHistory.length>0">
            <v-row v-for="item in experimentHistory">
                <v-col cols="12">
                    <v-card>
                        <v-card-title class="indigo" style="color: white">
                            在{{ item.execTime }}编辑的实验{{ item.name }}
                        </v-card-title>
                        <v-card-text>
                            <v-container style="margin: 30px 0 -30px 0">
                                <v-row>
                                    <v-textarea background-color="grey lighten-2" :value="item.command" filled
                                                auto-grow></v-textarea>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-row>
                                <v-col cols="7">
                                    <v-btn block color="error" elevation="0" @click="executeExperiment(item)">
                                        从该命令继续编辑
                                    </v-btn>
                                </v-col>
                                <v-col cols="5">
                                    <v-btn block color="warning" elevation="0" @click="deleteThisHistory(item)">
                                        从历史记录中删除此命令
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </template>
        <template v-else>
            <v-alert type="error">没有发现历史记录</v-alert>
        </template>
    </v-container>
</template>

<script>
import {deleteExistingHistory, getAllHistory} from "@/utils/localStorageManager";

export default {
    name: "ExperimentHistory",
    data: () => ({
        experimentHistory: []
    }),
    methods: {
        executeExperiment(history) {
            this.$router.push({
                name: 'ExecuteExperiment',
                params: {
                    experiment: history
                }
            })
        },
        deleteThisHistory(history) {
            deleteExistingHistory(history)
            this.experimentHistory = getAllHistory()
            this.experimentHistory.reverse()
        }
    },
    mounted() {
        this.experimentHistory = getAllHistory()
        this.experimentHistory.reverse()
    }
}
</script>

<style scoped>

</style>
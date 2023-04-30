<template>
    <v-container>
        <template v-if="experimentHistory.length>0">
            <v-row v-for="item in experimentHistory">
                <v-col cols="12">
                    <v-card>
                        <v-card-title class="indigo" style="color: white">在{{item.execTime}}编辑的实验{{item.name}}</v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-textarea background-color="grey lighten-2" :value="item.command" filled auto-grow></v-textarea>
                                <v-btn block color="primary" elevation="0" @click="executeExperiment(item)">从该命令继续编辑</v-btn>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </template>
        <template v-else>

        </template>
    </v-container>
</template>

<script>
import {getAllHistory} from "@/utils/localStorageManager";

export default {
    name: "ExperimentHistory",
    data: () => ({
        experimentHistory: []
    }),
    methods:{
        executeExperiment(experiment) {
            this.$router.push({
                name: 'ExecuteExperiment',
                params: {
                    experiment
                }
            })
        },
    },
    mounted() {
        console.log(getAllHistory());
        this.experimentHistory = getAllHistory()
        this.experimentHistory.reverse()
    }
}
</script>

<style scoped>

</style>
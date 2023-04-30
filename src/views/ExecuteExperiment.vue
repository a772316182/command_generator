<template>
    <v-container>
        <v-alert type="info">实验：{{ experiment_name }}</v-alert>
        <v-row>
            <command-dashboard :param="params_classified" @updateValue="updateValue"
                               :justShowDefaultValue="false"></command-dashboard>
        </v-row>
        <v-row>
            <command-show ref="show" :params_order="params_order" :params_array="params_array"
                          :main_entrance="main_entrance" :execute_experiment_mode="true"></command-show>
        </v-row>
        <v-row>
            <v-tooltip v-model="showTip" top color="success">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn block color="error" elevation="10" @click="confirmCommand">确认并复制到剪切板</v-btn>
                </template>
                <span>{{ tip }}</span>
            </v-tooltip>
        </v-row>
    </v-container>
</template>

<script>
import CommandDashboard from "@/components/CommandDashboard.vue";
import CommandShow from "@/components/CommandShow.vue";
import {addANewHistory} from "@/utils/localStorageManager";

export default {
    name: "ExecuteExperiment",
    components: {CommandShow, CommandDashboard},
    data: () => ({
        params_order: [],
        params_classified: {},
        params_array: [],
        main_entrance: '',
        showTip: false,
        tip: '复制成功',
        experiment_name: ''
    }),
    methods: {
        updateValue(newValue) {
            let params = [...newValue.number_params, ...newValue.str_params, ...newValue.action_params];
            params.forEach(item => {
                let paramName = item.name;
                this.params_order.forEach(item_order => {
                    let order_name = item_order.name;
                    if (order_name === paramName) {
                        item_order.value = item.value
                    }
                })
                this.params_array.forEach(item_array => {
                    let order_name = item_array.name;
                    if (order_name === paramName) {
                        item_array.value = item.value
                    }
                })

                this.params_order.forEach(item_array => {
                    let order_name = item_array.name;
                    if (order_name === paramName) {
                        item_array.value = item.value
                    }
                })
            })
        },
        confirmCommand() {
            const command = this.$refs.show.demo_command
            addANewHistory({
                name: this.experiment_name,
                params_order: this.params_order,
                params_classified: this.params_classified,
                params_array: this.params_array,
                main_entrance: this.main_entrance,
                command: command,
                execTime: new Date().toLocaleString()
            })
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(command).then(() => {
                    this.tip = '复制成功'
                    this.showTip = true
                    setTimeout(() => {
                        this.showTip = false
                    }, 3000)
                }, () => {
                    this.tip = '复制失败'
                    this.showTip = true
                    setTimeout(() => {
                        this.showTip = false
                    }, 3000)
                })
            }
        },
    },
    mounted() {
        let experiment = this.$route.params.experiment;
        this.params_order = experiment.params_order
        this.params_classified = experiment.params_classified
        this.params_array = experiment.params_array
        this.main_entrance = experiment.main_entrance
        this.experiment_name = experiment.name

        this.params_order.forEach(item => {
            let value = this.params_array.find(array_item => item.name === array_item.name).value;
            if (value.length > 0) {
                item.value = value
            } else {
                item.value = ''
            }
        })
    }
}
</script>

<style scoped>

</style>
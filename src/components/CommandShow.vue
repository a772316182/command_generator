<template>
    <v-container>
        <v-row>
            <v-switch style="padding-right: 20px" label="后台运行" v-model="runInBack"
                      @change="generateCommand"></v-switch>
            <v-switch label="日志文件中体现参数名称" v-model="showParamName" @change="generateCommand"></v-switch>
        </v-row>
        {{ params_order }}
        <v-row>
            <v-textarea
                    :value="generateCommand(this.runInBack, this.showParamName, this.main_entrance, this.params_order, this.params_array)"
                    filled auto-grow label="Demo命令展示区域"></v-textarea>
        </v-row>
    </v-container>
</template>

<script>
import {generateDemoCommand, generateExecCommand} from "@/utils/command_formater";

export default {
    name: "CommandShow",
    props: {
        params_array: Array,
        params_order: Array,
        main_entrance: String,
        execute_experiment_mode: false,
    },
    data: () => ({
        runInBack: true,
        showParamName: true,
        demo_command: ''
    }),
    methods: {
        generateCommand(runInBack, showParamName, mainEntrance, paramsOrder, paramsArray) {
            let command
            if (this.execute_experiment_mode) {
                command = generateExecCommand(mainEntrance, paramsArray, paramsOrder, runInBack, showParamName)
            } else {
                command = generateDemoCommand(mainEntrance, paramsArray, paramsOrder, runInBack, showParamName)
            }
            this.demo_command = command
            return command
        },
    },
}
</script>

<style scoped>

</style>
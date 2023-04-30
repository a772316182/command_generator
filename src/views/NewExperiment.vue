<template>
    <v-container>
        <v-row>
            <v-text-field filled label="主入口文件" v-model="entrance"></v-text-field>
        </v-row>
        <v-row>
            <v-textarea filled label="将argparse代码复制到此处" v-model="code"></v-textarea>
        </v-row>
        <template v-if="analysis_status_show">
            <v-alert color="primary" outlined>
                识别完毕，全部参数{{
                params_classified.total_params_num
                }}个，其中，int/float类型参数{{
                params_classified.number_params.length
                }}个，str类型参数{{
                params_classified.str_params.length
                }}个，action类型参数{{
                params_classified.action_params.length
                }}个，可能识别有误的参数{{ params_classified.unknown_type_params.length }}个
            </v-alert>
        </template>
        <v-stepper v-model="step">
            <v-stepper-header>
                <v-stepper-step
                        :complete="step > 1"
                        step="1"
                >
                    调整参数内容
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                        :complete="step > 2"
                        step="2"
                >
                    预览命令生成面板
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">
                    调整日志文件名称
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-container>
                        <v-row>
                            <template v-for="(item,index) in params_array">
                                <v-col cols="3">
                                    <v-card color="deep-purple darken-1" dark>
                                        <v-card-title>{{ item.name }}</v-card-title>
                                        <v-card-text>
                                            Type：{{ item.type }} <br>
                                            Default Value：{{ item.default_value }} <br>
                                            Action：{{ item.action }}
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="teal darken-1" @click="openEditParam(index)">修改</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </template>
                            <v-col cols="3">
                                <v-btn
                                        style="margin: 0; height: 100%"
                                        dark
                                        block
                                        color="indigo"
                                        @click="openAddParam"
                                >
                                    识别有漏？<br>
                                    可以点此手动添加新参数
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="primary"
                                    @click="step = 2"
                            >
                                下一步
                            </v-btn>
                        </v-row>
                    </v-container>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-container>
                        <v-row>
                            <command-dashboard :param="params_classified"
                                               :justShowDefaultValue="true"></command-dashboard>
                        </v-row>
                        <v-row>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="primary"
                                    @click="step = 3"
                            >
                                下一步
                            </v-btn>

                            <v-btn text @click="step = 1">
                                上一步
                            </v-btn>
                        </v-row>
                    </v-container>

                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-container>
                        <v-row>
                            <config-log-file-name ref="FileNameConfiger" :params_array="params_array"
                                                  :classified_param="params_classified"></config-log-file-name>
                        </v-row>
                        <v-row>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="primary"
                                    @click="finish"
                            >
                                完成
                            </v-btn>
                            <v-btn text @click="step = 2">
                                上一步
                            </v-btn>
                        </v-row>
                    </v-container>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
        <v-dialog v-model="edit_dialog_show"
                  persistent>
            <v-card>
                <v-card-title>修改参数：{{ editingParam.name }}</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field v-model="editingParam.name" filled label="参数名"></v-text-field>
                        <v-text-field v-model="editingParam.type" filled label="参数类型"></v-text-field>
                        <v-text-field v-model="editingParam.default_value" filled label="参数默认值"></v-text-field>
                        <v-text-field v-model="editingParam.action" filled
                                      label="参数Action（当参数类型为中有action='store_true'且没有type时才会生效）"
                                      :disabled="editingParam.type!==''"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark large color="indigo" @click="saveEdit">保存更改</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="add_dialog_show"
                  persistent>
            <v-card>
                <v-card-title>修改参数：{{ addingParam.name }}</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field v-model="addingParam.name" filled label="参数名"></v-text-field>
                        <v-text-field v-model="addingParam.type" filled label="参数类型"></v-text-field>
                        <v-text-field v-model="addingParam.default_value" filled label="参数默认值"></v-text-field>
                        <v-text-field v-model="addingParam.action" filled
                                      label="参数Action（当参数类型为中有action='store_true'且没有type时才会生效）"
                                      :disabled="addingParam.type!==''"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark large color="indigo" @click="saveAdd">保存更改</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="experiment_name_set_dialog"
                  persistent>
            <v-card>
                <v-card-title>设置完成！为了便于区分，请为当前实验取个名字</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field v-model="experimentName" filled label="实验名"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark large color="indigo" @click="final_finish">保存更改</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import {codeExtract} from "@/utils/codeExtracter";
import CommandDashboard from "@/components/CommandDashboard.vue";
import ConfigLogFileName from "@/components/ConfigLogFileName.vue";
import {addNewExperiment, isHaveAnyExperiment} from "@/utils/localStorageManager";
import {uuid} from "@/utils/uuid";

export default {
    name: "NewExperiment",
    components: {CommandDashboard, ConfigLogFileName},
    data: () => ({
        step: 1,
        entrance: 'main.py',
        code: '',
        params_classified: {},
        params_array: [],
        analysis_status_show: false,
        edit_dialog_show: false,
        add_dialog_show: false,
        editingParam: {},
        addingParam: {},
        experiment_name_set_dialog: false,
        experimentName: ''
    }),
    watch: {
        code(newCode, oldCode) {
            this.params_classified = {}
            this.params_array = []
            this.params_classified = codeExtract(newCode)
            let total_params_num = 0
            for (let value in this.params_classified) {
                total_params_num += this.params_classified[value].length
                this.params_array = this.params_array.concat(this.params_classified[value])
            }
            this.params_classified.total_params_num = total_params_num
            this.analysis_status_show = true
        }
    },
    methods: {
        openEditParam(param_index) {
            this.editingParam = this.params_array[param_index]
            this.edit_dialog_show = true
        },
        openAddParam() {
            this.addingParam = {
                name: '',
                type: '',
                default_value: '',
                action: ''
            }
            this.add_dialog_show = true
        },
        saveEdit() {
            this.edit_dialog_show = false
        },
        saveAdd() {
            if (this.addingParam.name.length > 0) {
                this.add_dialog_show = false
                this.params_array.push(this.addingParam)
                let param = this.addingParam
                if (param.type === 'int' || param.type === 'float') {
                    this.params_classified.number_params.push(param)
                } else if (param.type === 'str') {
                    this.params_classified.str_params.push(param)
                } else if (param.action === 'store_true') {
                    this.params_classified.action_params.push(param)
                } else if (param.type === '') {
                    this.params_classified.unknown_type_params.push(param)
                }
            } else this.add_dialog_show = false
        },
        finish() {
            this.experiment_name_set_dialog = true
        },
        final_finish() {
            const date = new Date()
            let thisExperiment = {
                name: this.experimentName,
                create_time: new Date().toLocaleString(),
                params_order: this.$refs.FileNameConfiger.params_order,
                params_classified: this.params_classified,
                params_array: this.params_array,
                main_entrance: this.entrance,
                UUID: uuid()
            }
            if (isHaveAnyExperiment()) {
                addNewExperiment(thisExperiment)
            } else {
                let experiments = []
                experiments.push(thisExperiment)
                localStorage.setItem('experiments', JSON.stringify(experiments))
            }
            this.$router.push('/')
        }
    },
    mounted() {
        this.code = 'parser = argparse.ArgumentParser()\n' +
            '# federated arguments (Notation for the arguments followed from paper)\n' +
            'parser.add_argument(\'--epochs\', type=int, default=400,\n' +
            '                    help="number of rounds of training")\n' +
            'parser.add_argument(\'--score\', type=float, default=1,\n' +
            '                    help="number of rounds of training")\n' +
            'parser.add_argument(\'--lr\', type=float, default=0.01,\n' +
            '                    help=\'learning rate\')\n' +
            'parser.add_argument(\'--momentum\', type=float, default=0.9,\n' +
            '                    help=\'SGD momentum (default: 0.5)\')\n' +
            '# other arguments\n' +
            'parser.add_argument(\'--dataset\', type=str, default=\'cifar10\', help="name \\\n' +
            '                    of dataset")\n' +
            '# Data Free\n' +
            '\n' +
            'parser.add_argument(\'--save_dir\', default=\'run/cifar10_test3\', type=str)\n' +
            '\n' +
            '# Basic\n' +
            'parser.add_argument(\'--lr_g\', default=1e-3, type=float,\n' +
            '                    help=\'initial learning rate for generation\')\n' +
            'parser.add_argument(\'--g_steps\', default=5, type=int, metavar=\'N\',\n' +
            '                    help=\'number of iterations for generation\')\n' +
            'parser.add_argument(\'--batch_size\', default=256, type=int, metavar=\'N\',\n' +
            '                    help=\'number of total iterations in each epoch\')\n' +
            'parser.add_argument(\'--nz\', default=256, type=int, metavar=\'N\',\n' +
            '                    help=\'number of total iterations in each epoch\')\n' +
            'parser.add_argument(\'--synthesis_batch_size\', default=256, type=int)\n' +
            '# Misc\n' +
            'parser.add_argument(\'--seed\', default=2023, type=int,\n' +
            '                    help=\'seed for initializing training.\')\n' +
            'parser.add_argument(\'--type\', default="score", type=str,\n' +
            '                    help=\'score or label\')\n' +
            'parser.add_argument(\'--model\', default="", type=str,\n' +
            '                    help=\'seed for initializing training.\')\n' +
            'parser.add_argument(\'--other\', default="", type=str,\n' +
            '                    help=\'seed for initializing training.\')\n' +
            'parser.add_argument(\'--target_model\', default="res", type=str,\n' +
            '                    help=\'seed for initializing training.\')\n' +
            'parser.add_argument(\'--device\', default="cuda:0", type=str)\n' +
            'parser.add_argument(\'--use_best_config\', action=\'store_true\', help=\'will load utils.best_config\')\n' +
            'parser.add_argument(\'--load_from_pretrained\', action=\'store_true\', help=\'load model from the checkpoint\')'
    }
}
</script>

<style scoped>

</style>
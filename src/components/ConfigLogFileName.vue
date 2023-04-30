<template>
    <v-container>
        <v-row>
            <v-alert outlined color="warning" type="info" style="width: 100%">
                提示：拖拽排序你想要在日志文件名中出现的参数，点击叉号使此参数不作为日志文件名称出现。在您修改排序后，我们将为您同步展示Demo命令
            </v-alert>
        </v-row>
        <v-row>
            <v-col cols="12">
                <draggable
                        class="list-group"
                        tag="ul"
                        v-model="params_order"
                        @change="onOrderChange"
                        v-bind="dragOptions"
                >
                    <transition-group type="transition" name="flip-list">
                        <span v-for="item in params_order" :key="item.order">
                            <v-chip class="list-group-item" close label @click:close="onDeleteParamOrder(item.name)">
                                <i :class="item.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                                   @click="item.fixed = !item.fixed" aria-hidden="true">
                                </i>
                                {{ item.order }}：{{ item.name }}
                            </v-chip>
                        </span>
                    </transition-group>
                </draggable>
            </v-col>
        </v-row>

        <command-show :params_order="params_order" :params_array="params_array"
                      :main_entrance="main_entrance"></command-show>

    </v-container>
</template>

<script>
import draggable from "vuedraggable";
import CommandShow from "@/components/CommandShow.vue";

export default {
    name: "transition-example",
    display: "Transition",
    order: 6,
    components: {
        CommandShow,
        draggable
    },
    data: () => ({
        params_order: [],
        demo_command: '',
        runInBack: true,
        showParamName: true,
        splitLabel: '__'
    }),
    props: {
        params_array: Array,
        main_entrance: String,
    },
    methods: {
        onDeleteParamOrder(paramName) {
            let new_order = this.params_order.filter(item => {
                return item.name !== paramName
            })
            for (let i = 0; i < new_order.length; i++) {
                new_order[i].order = i + 1
            }
            this.params_order = new_order
        },
        onOrderChange() {
            let new_order = this.params_order
            for (let i = 0; i < new_order.length; i++) {
                new_order[i].order = i + 1
            }
            this.params_order = new_order
        }
    },
    watch: {
        params_array(newValue, oldValue) {
            this.message = newValue.map(item => item.name)
            this.params_order = this.message.map((name, index) => {
                return {name, order: index + 1};
            })
        },
    },
    computed: {
        dragOptions() {
            return {
                animation: 0,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        }
    }
};
</script>

<style>
.button {
    margin-top: 35px;
}

.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.list-group {
    min-height: 20px;
}

.list-group-item {
    cursor: move;
    margin-right: 10px;
    margin-bottom: 10px;
}

.list-group-item i {
    cursor: pointer;
}
</style>
<template>
    <v-container>
        <div v-if="justShowDefaultValue">
            <v-row>
                <v-col cols="6" v-for="item in local_param.number_params">
                    <v-text-field filled type="number" :label="item.name" :value="item.default_value"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" v-for="item in local_param.str_params">
                    <v-text-field filled :label="item.name" :value="item.default_value"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="3" v-for="item in local_param.action_params">
                    <v-switch :label="item.name"></v-switch>
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <v-row>
                <v-col cols="6" v-for="item in local_param.number_params">
                    <v-text-field filled type="number" :label="item.name" v-model="item.value"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="6" v-for="item in local_param.str_params">
                    <v-text-field filled :label="item.name" v-model="item.value"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="3" v-for="item in local_param.action_params">
                    <v-switch :label="item.name" v-model="item.value"></v-switch>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
export default {
    name: "CommandDashboard",
    props: {
        param: Object,
        justShowDefaultValue: Boolean
    },
    computed: {
        local_param() {
            return this.param
        }
    },
    updated() {
        this.$emit('updateValue', this.local_param)
    }
}
</script>

<style scoped>

</style>
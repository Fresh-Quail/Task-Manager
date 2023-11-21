<template>
    <td class="text-center">{{ item.title }}</td>
    <td class="text-center">{{ item.description }}</td>
    <td class="text-center">{{ item.deadline }}</td>
    <td class="text-center">{{ item.priority }}</td>
    <td>
        <v-checkbox color="blue" v-on:click="isComplete = !isComplete"></v-checkbox>
    </td>
    <td class="text-left">
    <v-container>
        <Task v-if="isComplete">
        <i class="fa fa-edit"></i> Update
        </Task>
        <v-btn class="bg-red" v-bind="props"><i class="fa fa-times-circle"></i>Delete</v-btn>
    </v-container>
    </td>
</template>

<script>
export default {
    name: 'Entry'
}
</script>
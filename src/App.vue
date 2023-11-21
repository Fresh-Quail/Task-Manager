<template>
  <v-card>
    <v-banner class="bg-primary">
      <v-row>
        <v-col>
        <v-banner-text>
          <i class="fa fa-bars"></i>&nbspFrameworks
          <Task v-bind:getEntry="add" v-bind:showTitle="true">
              <i class="fa fa-plus-circle"></i> Add
          </Task>
        </v-banner-text>
      </v-col>
    </v-row>
    </v-banner>
    <v-container>
        <v-table>
          <thead>
            <tr>
              <th class="text-center">Title</th>
              <th class="text-center">Description</th>
              <th class="text-center">Deadline</th>
              <th class="text-center">Priority</th>
              <th class="text-center">Is Complete</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td class="text-center">{{ item.title }}</td>
              <td class="text-center">{{ item.description }}</td>
              <td class="text-center">{{ item.deadline }}</td>
              <td class="text-center">{{ item.priority }}</td>
              <td>
                <v-checkbox color="blue" @click="item.check = !item.check;"></v-checkbox>
              </td>
              <td>
                <v-btn-group v-model="column" class="d-flex">
                  <Task v-if="item.check" v-bind:getEntry="update" v-bind:showTitle="false">
                    <i class="fa fa-edit"></i> Update
                  </Task>
                  <v-btn class="bg-red" v-bind="props" @click="remove()"><i class="fa fa-times-circle"></i>Delete</v-btn>
                </v-btn-group>
              </td>
            </tr>
          </tbody>
        </v-table>
    </v-container>
  </v-card>
</template>

<script>
import Entry from './components/Entry.vue'
import Task from './components/Task.vue'
import { ref } from 'vue'



export default {
  name: 'App',
  components: {
    Entry,
    Task
  },
  data() {
    return {
      // items: [
      // {
      //   title: 'Title',
      //   description: 'Desc',
      //   deadline: 'Dead',
      //   priority: 'Prio'
      // },
  //     {
  //       title: 'Title',
  //       description: 'Desc',
  //       deadline: 'Dead',
  //       priority: 'Prio'
  //     }
    // ]
    };
  },
  setup() {
    const added = ref(false)
    const items = ref([{check: false}])
    return {
      added,
      items
    }
  },
  methods: {
    add(item) {
      this.items.push(item);
    },
    remove(i) {
      this.items.splice(i, 1);
    },
    update(item, i) {
      this.items[i] = item; 
    }
  }
}
</script>

<style>
</style>

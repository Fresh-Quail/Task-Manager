<template>
  <v-banner density="compact" bgColor="blue-darken-3" lines="one">
    <template v-slot:default>
      <v-container class="text-center" style="font-size: 24px; margin-left: 15%;">  
        <i class="fa fa-bars">&nbspFRAMEWORKS</i>
      </v-container>
    </template>
    <template v-slot:actions>
    <v-container>
      <Task v-bind:getEntry="add" v-bind:showTitle="true" v-bind:uniqueTitle="uniqueTitle"
      :title="String()" :description="String()" :deadline="String()" :priority="String()"
      >
          <i class="fa fa-plus-circle"></i> Add
      </Task>
    </v-container>
    </template>
  </v-banner>
  <v-card class="bg-secondary">
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
            <tr v-for="(item, index) in items">
              <td width="16%" class="text-center">{{ item.title }}</td>
              <td width="16%" class="text-center">{{ item.description }}</td>
              <td width="16%" class="text-center">{{ item.deadline }}</td>
              <td width="17%" class="text-center">{{ item.priority }}</td>
              <td width="17%">
                  <v-checkbox-btn class="d-flex align-center" color="blue" @change="item.checked = !item.checked;"></v-checkbox-btn>
              </td>
              <td width="16%">
                <v-container class="d-flex align-center flex-column">
                    <Task v-if="!item.checked" :getEntry="update" :showTitle="false" :item_number="index" :uniqueTitle="uniqueTitle"
                      :title="item.title" :description="item.description" :deadline="item.deadline" :priority="item.priority"
                    >
                      <i class="fa fa-edit"></i> Update 
                    </Task>
                    <v-btn max-width="120" size="large" class="bg-red mt-0" v-bind="props" @click="remove(index)">
                      <i class="fa fa-times-circle"></i> Delete
                    </v-btn>
                </v-container>
              </td>
            </tr>
          </tbody>
        </v-table>

  </v-card>
</template>

<script>
import Task from './components/Task.vue'

export default {
  name: 'App',
  components: {
    Task
  },
  data() {
    return {
      items: [
    ]
    };
  },
  setup() {
    // const items = ref([])
    return {
      
    }
  },
  methods: {
    add(item) {
      this.items.push(item);
      this.$toast.success('Task was added successfully!');
    },
    remove(i) {
      this.items.splice(i, 1);
      this.$toast.success('Task was deleted successfully');
    },
    update(item, i) {
      this.items[i] = item; 
      this.$toast.success('Task was updated successfully!');
    },
    uniqueTitle(title){
      for (let i = 0; i < this.items.length; i++) {
        if(title == this.items[i].title)
          return false;
      }
      return true;
    }
  }
}
</script>

<style>
</style>

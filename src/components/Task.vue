<template>
    <v-dialog width="350">
        <template v-slot:activator="{ props }" >
            <v-btn v-bind="props" class="bg-blue">
                <slot></slot>
            </v-btn>
        </template>

        <template v-slot:default="{ isActive }" v-bind:adding="func">
          <v-card>
            <v-card-title class="bg-primary">
                <slot></slot> Task
            </v-card-title>
            <v-form>
                <v-container>
                    <v-text-field :active="true" :text="title" v-model="title" @input="" v-if="showTitle" type="input" label="Title"></v-text-field>
                    
                    <v-text-field v-model="description" type="input" label="Description"></v-text-field>

                    <v-menu
                        :close-on-content-click="true"
                        max-width="190px"
                        min-width="10px"
                    >
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-text-field
                                :model-value="deadline"
                                label="MM/DD/YYYY"
                                readonly    
                                v-bind="activatorProps"
                            >
                                <template v-slot:append-inner>
                                    <i class="fa fa-calendar-o"></i>
                                </template>
                            </v-text-field>

                        </template>
                    <v-date-picker v-bind:deadline="parseDate(date)" v-model="date"></v-date-picker>
                    </v-menu>

                    <v-radio-group v-model="priority" inline>
                        <v-radio label="Low" value="low"></v-radio>
                        <v-radio label="Med" value="med"></v-radio>
                        <v-radio label="High" value="high"></v-radio>
                    </v-radio-group>
                
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn class="bg-blue" @click="checkValidate(title, description, deadline, priority, item); isActive.value=false">
                        <slot></slot>
                    </v-btn>
                    <v-btn class="bg-red" @click="isActive.value = false">
                        <i class="fa fa-ban"></i> Cancel
                    </v-btn>
                </v-card-actions>
            </v-form>
          </v-card>
        </template>
      </v-dialog>
</template>
<script>
    export default {
        name: 'Task',
        props: {
            getEntry: Function,
            showTitle: Boolean
    },
    data() {
        return {
            item: {
                title: 'null',
                description: 'null',
                deadline: 'null',
                priority: 'null'
            }
        };
    },
    methods: {
        checkValidate(title, description, deadline, priority, item){
            if(this.showTitle && this.title != "" || this.description != "")
                this.item.title = title;
                this.item.description = description;
                this.item.deadline = deadline;
                this.item.priority = priority;
                this.getEntry(item);
        },
        parseDate(date){
            return moment(date).format('MM/DD/YYYY');
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  
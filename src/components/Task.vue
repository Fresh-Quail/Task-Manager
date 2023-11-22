<template>
    <v-dialog :width="350" :persistent="true">
        <template v-slot:activator="{ props }">
            <v-btn max-width="120" size="large" v-bind="props" class="bg-blue mb-0">
                <slot></slot>
            </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card>
            <v-card-title class="bg-primary">
                <slot name="def" v-if="showTitle">
                    <i class="fa fa-plus-circle"></i> Add
                </slot>
                <slot name="def2" v-if="!showTitle">
                    <i class="fa fa-edit"></i> Edit 
                </slot> Task
            </v-card-title>
            <v-form>
                <v-container>
                    <v-menu>
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-text-field v-if="showTitle" v-model="inputTitle" @update:model-value="title=inputTitle" type="input" 
                                label="Title" variant="outlined"
                                :model-value="title"
                                :error-messages="errState[0]"
                                ></v-text-field>
                            <v-text-field type="input" v-model="inputDescription" @update:model-value="description=inputDescription" 
                                :model-value="description" 
                                :error-messages="errState[1]"
                                label="Description" variant="outlined"
                                ></v-text-field>
                            <v-text-field
                                :model-value="deadline"
                                label="Deadline"
                                readonly
                                v-bind="activatorProps"
                                variant="outlined"
                                :error-messages="errState[2]"
                            >
                                <template v-slot:append-inner>
                                    <i class="fa fa-calendar-o"></i>
                                </template>
                            </v-text-field>
                        </template>
                    <v-date-picker v-model="date" @update:model-value="deadline=parseDate(date)"></v-date-picker>
                    </v-menu>

                    <v-radio-group label="Priority" v-model="inputPriority" @update:model-value="priority=inputPriority" 
                        :model-value="priority" 
                        :error-messages="errState[3]"
                        inline>
                        <v-radio label="Low" value="low" ></v-radio>
                        <v-radio label="Med" value="med"></v-radio>
                        <v-radio label="High" value="high"></v-radio>
                    </v-radio-group>
                </v-container>
            </v-form>
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <v-btn class="bg-blue" @click="if(checkValidate(title, description, deadline, priority, item_number, errState)){isActive.value=false;}">
                    <slot></slot>
                </v-btn>
                <v-btn class="bg-red ml-0 mr-3" @click="isActive.value = false">
                    <i class="fa fa-ban"></i> Cancel
                </v-btn>
            </template>
        </v-card>
        </template>
      </v-dialog>
</template>
<script>
import { ref } from 'vue'

    export default {
        name: 'Task',
        props: {
            getEntry: Function,
            uniqueTitle: Function,
            showTitle: Boolean,
            item_number: Number,
            title: String,
            description: String,
            deadline: String,
            priority: String
    },
    data() {
        return {
        };
    },
    setup() {
        const inputTitle = ref('')
        const inputDescription = ref('')
        const inputDeadline = ref('')
        const inputPriority = ref('')
        const errState = ref([false, false, false, false])
    return {
        // inputTitle, inputDescription, inputDeadline, inputPriority
        errState
    }
  },
    methods: {
        checkValidate(title, description, deadline, priority, item_number, errState){
            if((!this.showTitle || title) && description && (deadline != "Invalid date" && deadline) && priority && (!this.showTitle || this.uniqueTitle(title))){
                if(this.showTitle)
                    this.getEntry({title, description, deadline, priority});
                else
                    this.getEntry({title, description, deadline, priority}, item_number);
                for(let i = 0; i < errState.length; i++){
                    errState[i] = false;
            }
                return true;
            }
            else{
                if(!title)
                    errState[0] = "Title is Required!";
                else if(!this.uniqueTitle(title))
                    errState[0] = "Title is not Unique!"
                else
                    errState[0] = false;

                if(!description)
                    errState[1] = "Description is Required!";
                else 
                    errState[1] = false;
                
                if(!deadline)
                    errState[2] = "Deadline is Required!";
                else 
                    errState[2] = false;

                if(!priority)
                    errState[3] = "Priority is Required!";
                else 
                    errState[3] = false;
                return false;
            }
        },
        parseDate(date){
            return moment(date).format('MM/DD/YYYY');
        },
        reset(){return;}
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  
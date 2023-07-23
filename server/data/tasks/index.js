const Tasks = require('./json/getTask.json');

module.exports = {
    getTasks: Tasks,
    addTasks: (task) => {
        if(Tasks.data.length > 0) {
            task.id =  Math.max(...Tasks.data.map(object => object.id)) + 1;
        } else {
            task.id = 0;
        }
        Tasks.data.push(task);
        return task;
    },
    updateTask: (task) => {
        const index = Tasks.data.findIndex(element => element.id === task.id);
        if(index != -1) {
            Tasks.data[index] = task;
        } else {
            if(Tasks.data.length > 0) {
                task.id =  Math.max(...Tasks.data.map(object => object.id)) + 1;
            } else {
                task.id = 0;
            }
            Tasks.data.push(task);
        }
        return task;
    },
    deleteTask: (id) => {
        const index = Tasks.data.findIndex(element => element.id === +id);
        if(index != -1) {
            Tasks.data.splice(index, 1);
        }
    }
}
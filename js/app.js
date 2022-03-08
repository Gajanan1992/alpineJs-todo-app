window.taskStore = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  },
};

window.todoApp = () => {
  return {
    ...taskStore,
    // tasks: [],
    newTask: "",
    filter: "all",
    editable: Date.now,
    editTask: null,
    get activeTasks() {
      return this.tasks.filter((task) => !task.completed);
    },
    get completedTasks() {
      return this.tasks.filter((task) => task.completed);
    },
    get filteredTaks() {
      return {
        all: this.tasks,
        active: this.activeTasks,
        complete: this.completedTasks,
      }[this.filter];
    },
    get allComplete() {
      return this.tasks.length === this.completedTasks.length;
    },
    addTask() {
      this.tasks.push({
        id: Date.now(),
        body: this.newTask,
        completed: false,
      });
      this.save();
      this.newTask = "";
    },
    completeTask(task) {
      task.completed = !task.completed;
      this.save();
    },
    setEditable(task) {
      task.cachedBody = task.body;
      this.editTask = task;
      this.editable = task.id;
    },
    updateTask(task) {
      this.editable = Date.now();
      this.save();
    },
    cancelTaskEdit(task) {
      task.body = task.cachedBody;
      this.editTask = null;
      delete task.cachedBody;
      this.editable = Date.now();
      this.save();
    },
    deleteTask(task) {
      let position = this.tasks.indexOf(task);
      this.tasks.splice(position, 1);
      this.save();
    },
    markAllComplete() {
      let allComplete = this.allComplete;
      this.tasks.forEach((task) => (task.completed = !allComplete));
      // this.tasks.filter
    },
    clearCompletedTasks() {
      this.tasks = this.activeTasks;
      this.save();
    },
  };
};

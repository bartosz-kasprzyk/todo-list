{
    let tasks = [];
    let hideDoneTasks = false;

    const showOrHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({ ...task, done: true }));
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = tasks.filter((task, index) => index !== taskIndex);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => index === taskIndex ? { ...task, done: !tasks[taskIndex].done } : task);
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasks__item ${task.done && hideDoneTasks ? "tasks__hidden" : ""}">
                <button class="js-done tasks__button tasks__button--done">
                    <i class="${task.done ? "gg-check" : "tasks__button--disabled"}"></i>
                </button>
                <span class="tasks__content ${task.done ? "tasks__item--done" : ""}">${task.content}</span>
                <button class="js-remove tasks__button tasks__button--remove">
                    <i class="gg-trash"></i>
                </button>
            </li>
    `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");
        if (!tasks.length) {
            buttonsElement.innerHTML = ``;
            return;
        }
        buttonsElement.innerHTML = `
            <button class="section__button js-showOrHideDone">${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button>
            <button class="section__button ${tasks.every(({ done }) => done) ? "section__button--disabled" : ""} js-allTasksDone">Ukończ wszystkie</button>
            `;
    };

    const bindButtonsEvents = () => {
        const toggleShowHideButton = document.querySelector(".js-showOrHideDone");

        if (toggleShowHideButton) {
            toggleShowHideButton.addEventListener("click", showOrHideDoneTasks);
        };

        const markAllTasksDoneButton = document.querySelector(".js-allTasksDone");


        if (markAllTasksDoneButton) {
            markAllTasksDoneButton.addEventListener("click", markAllTasksDone);
        };
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskContent = newTaskInput.value.trim();

        if (newTaskContent === "") {
            newTaskInput.focus();
            return;
        }

        addNewTask(newTaskContent);
        newTaskInput.value = "";
        newTaskInput.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}







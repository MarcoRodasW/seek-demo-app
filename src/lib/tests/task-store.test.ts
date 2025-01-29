import { act } from "@testing-library/react";
import { useTaskStore } from "../store/task-store";
import { TaskStatus } from "../types/task.types";

describe("useTaskStore", () => {
	beforeEach(() => {
		const { getState, setState } = useTaskStore;
		setState({ tasks: [] });
	});

	test("should initialize with an empty task list", () => {
		const tasks = useTaskStore.getState().tasks;
		expect(tasks).toEqual([]);
	});

	test("should fetch initial tasks", async () => {
		const { getTasks } = useTaskStore.getState();
		await act(async () => {
			await getTasks();
		});

		const tasks = useTaskStore.getState().tasks;
		expect(tasks.length).toEqual(0);
	});

	test("should create a new task", async () => {
		const { createTask } = useTaskStore.getState();
		const newTask = {
			title: "Test Task",
			description: "Test Description",
			status: TaskStatus.Todo,
		};

		await act(async () => {
			await createTask(newTask);
		});

		const tasks = useTaskStore.getState().tasks;
		expect(tasks).toHaveLength(1);
		expect(tasks[0].title).toBe("Test Task");
		expect(tasks[0].description).toBe("Test Description");
	});

	test("should update an existing task", async () => {
		const { createTask, updateTask } = useTaskStore.getState();

		const newTask = {
			title: "Old Task",
			description: "Old Description",
			status: TaskStatus.Todo,
		};

		await act(async () => {
			await createTask(newTask);
		});

		const taskToUpdate = useTaskStore.getState().tasks[0];
		const updatedTask = {
			...taskToUpdate,
			title: "Updated Task",
			description: "Updated Description",
		};

		await act(async () => {
			await updateTask(updatedTask);
		});

		const updatedTasks = useTaskStore.getState().tasks;
		expect(updatedTasks).toHaveLength(1);
		expect(updatedTasks[0].title).toBe("Updated Task");
		expect(updatedTasks[0].description).toBe("Updated Description");
	});

	test("should delete a task", async () => {
		const { createTask, deleteTask } = useTaskStore.getState();
		const newTask = {
			title: "Task to Delete",
			description: "Will be deleted",
			status: TaskStatus.Todo,
		};

		await act(async () => {
			await createTask(newTask);
		});

		const taskToDelete = useTaskStore.getState().tasks[0];

		await act(async () => {
			await deleteTask(taskToDelete.id);
		});

		const tasks = useTaskStore.getState().tasks;
		expect(tasks).toHaveLength(0);
	});
});

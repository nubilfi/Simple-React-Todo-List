import {
	ADD_TODO,
	SHOW_FAB,
	SHOW_PENDING,
	SHOW_COMPLETE,
	SHOW_ALL,
	MARK_TODO
} from './types';

export const showFab = () => ({
	type: SHOW_FAB
});

export const showAll = () => ({
	type: SHOW_ALL
});

export const showPending = () => ({
	type: SHOW_PENDING
});

export const showComplete = () => ({
	type: SHOW_COMPLETE
});

export const addTodo = todo => ({
	type: ADD_TODO,
	payload: todo
});

export const markTodo = marked => ({
	type: MARK_TODO,
	payload: marked
});

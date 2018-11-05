import {
	ADD_TODO,
	SHOW_FAB,
	SHOW_PENDING,
	SHOW_COMPLETE,
	SHOW_ALL,
	MARK_TODO
} from '../actions/types';

const initialState = {
	todos: [],
	onShowInput: false
};

export default (state = initialState, action) => {
	const { todos } = state;

	switch (action.type) {
	case ADD_TODO:
		return {
			...state,
			todos: [action.payload, ...state.todos]
		};
	case MARK_TODO:
		todos[todos.indexOf(action.payload)].completed = !todos[
			todos.indexOf(action.payload)
		].completed;
		todos[todos.indexOf(action.payload)].date = new Date().toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: 'numeric'
		});
		return {
			...state,
			todos: [...todos]
		};
	case SHOW_FAB:
		return {
			...state,
			onShowInput: !state.onShowInput
		};
	case SHOW_ALL:
		return {
			...state,
			action: action.type
		};
	case SHOW_PENDING:
		return {
			...state,
			action: action.type
		};
	case SHOW_COMPLETE:
		return {
			...state,
			action: action.type
		};
	default:
		return state;
	}
};

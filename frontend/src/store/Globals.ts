export const initialState = {
	data: [],
};


export const reducer = (state: any = initialState, action: any) => {
	if (action.type) {
		return {
			...state,
		}
	}
	return state;
}


const setAction = (action: any) => {
	return {
		type: 'ACTION_TYPE',
		payload: action,
	};
};
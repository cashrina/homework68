import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {fetchTaskThunk, getListThunk} from "../containers/List/listSlice.ts";
import {AppDispatch, RootState} from "../app/store.ts";


const ListForm = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const listValue= useSelector((state: RootState) => state.list.value);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTaskThunk());
    }, [dispatch]);

    const getList = async () => {
        await dispatch(fetchTaskThunk());
        await dispatch(getListThunk());
    };

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(fetchTaskThunk());
        void getList();
        void getList();
    };

    const formChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.target.value);
    };

    console.log(listValue);

    return (
        <form>
            <div className="mb-3" onSubmit={onFormSubmit}>
                <label className="form-label mb-3">Enter task</label>
                <input type="text"
                       className="form-control mb-3"
                       value={taskTitle}
                       onChange={formChange}/>
                <div className="form-text">To dol list</div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default ListForm;
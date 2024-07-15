import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {fetchTaskThunk, getListThunk} from "../containers/List/listSlice.ts";
import {AppDispatch, RootState} from "../app/store.ts";

export interface List {
    title: string;
    status: boolean;
}

const ListForm = () => {
    const [taskTitle, setTaskTitle] = useState<List[]>([]);
    const listValue= useSelector((state: RootState) => state.list.value);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTaskThunk(listValue));
    }, [dispatch]);

    useEffect(() => {
        if (listValue.title) {
            setTaskTitle((prev) => [...prev, listValue]);
        }
    }, [listValue]);

    const getList = async () => {
        await dispatch(fetchTaskThunk(listValue));
        await dispatch(getListThunk());
    };

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(fetchTaskThunk(listValue));
        void getList();
        void getList();
    };

    const formChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedTask = {
            ...listValue,
            title: event.target.value,
        };
        dispatch(fetchTaskThunk(updatedTask));
    };

    console.log(listValue);
    console.log(taskTitle);

    return (
        <form>
            <div className="mb-3" onSubmit={onFormSubmit}>
                <label className="form-label mb-3">Enter task</label>
                <input type="text"
                       className="form-control mb-3"
                       value={listValue.title}
                       onChange={formChange}/>
                <div className="form-text">To dol list</div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default ListForm;
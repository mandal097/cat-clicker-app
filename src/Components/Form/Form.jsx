import React, { useEffect, useState } from 'react';
import styles from './Form.module.scss';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi'
import { deleteCat, pushNewCat, setCurrentCat, updateCurrentCat } from '../../redux/catReducer';
import { LoadingOutlined } from '@ant-design/icons';

const Form = () => {
    const { currentCat } = useSelector(state => state.catReducer)
    const dispatch = useDispatch();
    const [formType, setFormType] = useState('update')
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false)
    const [loading, setLoading] = useState(false);

    const [catName, setCatName] = useState('');
    const [catImg, setCatImg] = useState('');
    const [nickNames, setNickNames] = useState([]);
    const [clicks, setClicks] = useState(0);

    useEffect(() => {
        setCatName(currentCat?.catName);
        setCatImg(currentCat?.catImg);
        setNickNames(currentCat?.nickNames);
        setClicks(currentCat?.clicks);
    }, [currentCat])

    const setAllCurrentState = () => {
        setCatName(currentCat?.catName);
        setCatImg(currentCat?.catImg);
        setNickNames(currentCat?.nickNames);
        setClicks(currentCat?.clicks);
    }

    const setEmptyState = () => {
        setCatName('');
        setCatImg('');
        setNickNames([]);
        setClicks(0);
    }

    const setUpdateForm = () => {
        setFormType('update')
        setAllCurrentState()
        setShowForm(true)
        setShowDelete(false)
    }
    const setNewForm = () => {
        setFormType('newform')
        setEmptyState();
        setShowForm(true)
        setShowDelete(false)
    }

    const createNewCat = async () => {

        try {
            setLoading(true)
            const res = await axios.post('/create-cat', {
                catName,
                catImg,
                nickNames,
                clicks
            })

            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message)
                dispatch(pushNewCat(res.data.data));
                dispatch(setCurrentCat(res.data.data));
                window.scroll({
                    top: "6rem",
                    behavior: "auto"
                })
                setShowForm(false);
            }
            setLoading(false)
        } catch (error) {
            toast.success('Something went wrong')
            setLoading(false)
        }
    }
    const updateCat = async () => {
        try {
            setLoading(true)
            const res = await axios.put(`/update-cat/${currentCat?._id}`, {
                catName,
                catImg,
                nickNames,
                clicks
            }, {})

            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message)
                dispatch(updateCurrentCat(res.data.data))
                window.scroll({
                    top: "6rem",
                    behavior: "auto"
                })

                setShowForm(false);
            }
            setLoading(false)
        } catch (error) {
            toast.success('Something went wrong')
            setLoading(false)
        }
    }

    const submit = async () => {
        if (formType === 'update') {
            updateCat();
            return;
        }
        if (formType === 'newform') {
            createNewCat()
            return;
        }
    }

    const deleteCurrentCat = async () => {
        setLoading(true);
        const res = await axios.delete(`/delete-cat/${currentCat?._id}`)
        if (res.data.status === 'err') {
            toast.error(res.data.message)
            setLoading(false);
        }
        if (res.data.status === 'success') {
            dispatch(deleteCat(currentCat?._id));
            toast.success(res.data.message)
            setLoading(false);
            setShowDelete(false)
        }
    }

    return (
        <>
            <ToastContainer style={{ fontSize: '6rem' }} />
            <div className={styles.form}>

                {!showForm && <div className={styles.top}>
                    <div className={styles.update_fields}>
                        <p>{"->"} update this cat</p>
                        <button onClick={setUpdateForm} >Update</button>
                    </div>
                    <hr />

                    <div className={styles.update_fields}>
                        <p>{"->"} delete this cat</p>
                        {!showDelete &&
                            <button onClick={() => {
                                setShowDelete(!showDelete)
                            }
                            }>Delete</button>
                        }
                    </div>

                    {showDelete && <div className={styles.delete_options}>
                        <p className={styles.text}>{"->"}Are you sure</p>
                        <button className={styles.delete_btn} onClick={() => setShowDelete(!showDelete)}>no</button>
                        <button className={styles.delete_btn} onClick={deleteCurrentCat}>
                            {loading ? <LoadingOutlined className={styles.loader} /> : "yes"}
                        </button>
                    </div>}

                    <hr />

                    <div className={styles.update_fields}>
                        <p>{"->"} add a new cat</p>
                        <button onClick={setNewForm}>Add</button>
                    </div>
                </div>}

                {showForm &&
                    <div className={styles.form_body}>
                        <div className={styles.form_head}>
                            <h2>{formType === 'update' ? "Update your cat" : "add new cat"}</h2>
                            <div className={styles.back} onClick={() => setShowForm(!showForm)}>
                                <BiArrowBack className={styles.icon} />
                            </div>
                        </div>
                        <div className={styles.input_field}>
                            <label>Cat name :</label>
                            <input
                                required
                                value={catName}
                                type="text"
                                placeholder='your cat name...'
                                onChange={(e) => setCatName(e.target.value)}
                            />
                        </div>
                        <div className={styles.input_field}>
                            <label>Cat Image :</label>
                            <input
                                required
                                value={catImg}
                                type="text"
                                placeholder='your cat image...'
                                onChange={(e) => setCatImg(e.target.value)}
                            />
                        </div>
                        <div className={styles.input_field}>
                            <label>Nick names :</label>
                            <input
                                required
                                value={nickNames}
                                type="text"
                                placeholder='nick names of cat..'
                                onChange={(e) => setNickNames(e.target.value)}
                            />
                        </div>
                        <div className={styles.input_field}>
                            <label>Cat Clicks :</label>
                            <input
                                required
                                value={clicks}
                                type="text"
                                placeholder='e.g.,5'
                                onChange={(e) => setClicks(e.target.value)}
                            />
                        </div>
                        <div className={styles.form_action}>
                            <button className={styles.save_btn} onClick={submit}>
                                {loading ? <LoadingOutlined className={styles.loader} /> : formType === 'update' ? "Update" : "Save"}
                            </button>
                            <button onClick={() => {
                                formType === 'update' ? setAllCurrentState() : setEmptyState()
                            }} className={styles.undo_btn}>Undo</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Form
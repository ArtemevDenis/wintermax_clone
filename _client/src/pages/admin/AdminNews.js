import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {UserContext} from "../../context/AuthContext";
import AdminNewsItem from "../../components/admin/AdminNewsItem";

function AdminNews() {

    const user = useContext(UserContext)
    const {request} = useHttp()
    const [news, setNews] = useState(null)
    const [form, setForm] = useState({
        title: '', description: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const createNews = async (e) => {
        e.preventDefault()
        if (form.title.trim() !== '' && form.description.trim() !== '')
            request(`/api/news/create/`, 'POST', {...form},
                {
                    Authorization: `Bearer ${user.token}`
                }).then(() => {
                    getAllNews();
                    setForm({
                        title: '', description: ''
                    })
                }
            )
    }

    const getAllNews = () => {
        request(`/api/news/all`, 'GET', null,
            {
                Authorization: `Bearer ${user.token}`
            }).then(r => {
                setNews(r)
            }
        )
    }

    const deleteNews = (newsID) => {
        request(`/api/news/delete/${newsID}`, 'GET', null,
            {
                Authorization: `Bearer ${user.token}`
            }).then(getAllNews)
    }

    useEffect(() => {
        getAllNews()
    }, [])

    return (
        <div className='admin-news'>
            <h2 className='admin-news__title'>Новости</h2>
            <form>
                <div>
                    <label>Заголовок:
                        <input
                            className='input'
                            id="title"
                            maxlength="30"
                            type="text"
                            name='title'
                            value={form.title}
                            onChange={changeHandler}
                        />
                    </label>

                </div>
                <div>
                    <label>Текст новости:
                        <textarea
                            className='textarea'
                            id="description"
                            type="text"
                            name='description'
                            value={form.description}
                            onChange={changeHandler}
                        />
                    </label>
                </div>
                <button
                    className='button-primary'
                    onClick={createNews}>Создать новость
                </button>
            </form>
            {news &&

            <div className='admin-news__list'>
                <div>ID</div>
                <div>Название</div>
                <div>Удалить</div>
                {news.map((news, index) =>
                <AdminNewsItem news={news} deleteNews={deleteNews} index={index+1}/>)
            }</div>}
        </div>
    );
}

export default AdminNews;

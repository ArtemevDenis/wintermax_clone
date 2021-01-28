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
            new Promise(async (resolve, reject) => {
                    try {
                        const data = await request(`/api/news/create/`, 'POST', {...form},
                            {
                                Authorization: `Bearer ${user.token}`
                            })
                        if (data.code === 200) {
                            resolve(data)
                        }
                    } catch (e) {
                        console.error(e)
                    }
                }
            ).then(r => {
                    console.log(r)
                    getAllNews();
                    setForm({
                        title: '', description: ''
                    })
                }
            )
    }


    const getAllNews = () => {
        new Promise(async (resolve, reject) => {
                try {
                    const data = await request(`/api/news/all`, 'GET', null,
                        {
                            Authorization: `Bearer ${user.token}`
                        })
                    console.log(data)
                    resolve(data)
                } catch (e) {
                    console.error(e)
                }
            }
        ).then(r => {
                setNews(r)
            }
        )
    }


    const deleteNews = (newsID) => {
        new Promise(async (resolve, reject) => {
                try {
                    const data = await request(`/api/news/delete/${newsID}`, 'GET', null,
                        {
                            Authorization: `Bearer ${user.token}`
                        })
                    if (data.code === 200)
                        resolve()
                    else
                        reject('что то пошло не так')
                } catch (e) {
                    console.error(e)
                }
            }
        ).then(r => {
                getAllNews()
            }
        ).catch(
            console.log
        )
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

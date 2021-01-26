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
        <div>
            <h2>Новости</h2>
            <form>
                <div>
                    <input id="title"
                           maxlength="30"
                           type="text"
                           name='title'
                           value={form.title}
                           onChange={changeHandler}
                    />
                    <label htmlFor="email">Назаванеи</label>
                </div>
                <div>
                    <textarea id="description"
                              type="text"
                              name='description'
                              value={form.description}
                              onChange={changeHandler}
                    />
                    <label htmlFor="password">Текст новости</label>
                </div>
                <button onClick={createNews}>Создать новость</button>
            </form>
            {news &&
            <ol>
                {news.map(news =>
                    <li key={news.ID}><AdminNewsItem news={news} deleteNews={deleteNews}/></li>)}
            </ol>}
        </div>
    );
}

export default AdminNews;

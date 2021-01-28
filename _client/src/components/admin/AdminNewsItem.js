import React from "react";

function AdminNewsItem({news, deleteNews, index}) {
    return (
        <>
            <p>{index}</p> <p>{news.title}</p>
            <button
            className='button-danger'
                onClick={() => deleteNews(news.ID)}>удалить</button>
        </>
    );
}

export default AdminNewsItem;

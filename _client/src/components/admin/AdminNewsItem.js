import React from "react";

function AdminNewsItem({news, deleteNews}) {
    return (
        <div>
            {news.ID}, {news.title}
            <button onClick={() => deleteNews(news.ID)}>удалить</button>
        </div>
    );
}

export default AdminNewsItem;

import React, { useContext } from "react";
import CommentItem from './CommentItem'
import { Result } from "antd";

const CommentList: React.FC<{ level: number, commentList: API.Comment[] }> = (props) => {
    const { level, commentList = [] } = props
    console.log(commentList, '=====commentList');

    const display = commentList.length === 0 ? 'block' : 'none'
    return (
        <div className="list-item">
            <Result style={{ display }}>暂无评论，点击添加评论！</Result>
            <ul>{
                commentList.map((comment: API.Comment) => <li key={comment.id}>
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        level={level} />
                </li>)
            }
            </ul>
        </div>
    )
}

export default CommentList
import PostListItem from "../PostListItem";
import './PostList.css'
const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {

    const element = posts.map((item) => {
        const {id, ...itemProps} = item;
        return(
            <li key={id} className="list-group-item">
                <PostListItem 
                    {...itemProps} 
                    onDelete={() => onDelete(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleLiked={() => onToggleLiked(id)}
                />
            </li>
        )
    })
    
    // const newElement = element.map((item) => item.like === true);
    return(
        <ul className="app-list list-group-item">
            {element}
        </ul>
    )
}

export default PostList;
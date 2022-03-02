import './AppHeader.css'
const AppHeader = ({posts, likes, stars}) => {
    return(
        <div className="app-header d-flex">
            <h1>Fayzullo Jo'rayev</h1>
            <h2>{posts} posts, like {likes}, <i className='fa fa-star'></i> {stars}</h2>
        </div>
    )
}

export default AppHeader;
import AppHeader from "../AppHeader";
import PostAddForm from "../PostAddForm";
import PostList from "../PostList";
import PostStatusFilter from "../PostStatusFilter";
import SearchPanel from "../SearchPanel";
import './App.css'
import React from 'react';



export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: 'Going to learn React Js', important: false, like: false, id: 1},
                {label: 'That is so good', important: false, like: true, id: 2},
                {label: 'I need a beak . . .', important: false, like: false, id: 3}
            ],

            term: '',
            filter: 'all'
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.searchPosts = this.searchPosts.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.filterPost = this.filterPost.bind(this);
        this.onUpdateFilter = this.onUpdateFilter.bind(this);
   

        this.maxId = 4;
    }
    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })
    }

    addItem(body){
        if(body){
            const newItem = {
            label: body,
            id: this.maxId++,
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
        }
        
    }
    
    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const oldItem = data[index];
            const newItem = {...oldItem, important: !oldItem.important};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })
    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const oldItem = data[index];
            const newItem = {...oldItem, like: !oldItem.like};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })
    }

    searchPosts(items, term){
        if(term.length === 0){
            return items;
        }
        return items.filter((item) => item.label.indexOf(term) > - 1)
    }

    filterPost(items, filter) {
        if(filter === 'like') {
            return items.filter(item => item.like);
        }

        return items;
    }

    onUpdateSearch(term) {
       this.setState({term}); 
    }

    onUpdateFilter(filter){
        this.setState({filter});
    }
    

    render() {
        const {data, term, filter} = this.state;
        const liked = this.state.data.filter(item => item.like === true).length;
        const allPosts = this.state.data.length;
        const stars = this.state.data.filter(item => item.important === true).length;

        const visiblePosts = this.filterPost(this.searchPosts(data, term), filter);
        return(
            <div className="app">
                <AppHeader 
                    posts={allPosts} 
                    likes={liked}
                    stars={stars}/>
            <div className="d-flex">
                <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                <PostStatusFilter onUpdateFilter={this.onUpdateFilter} filter={filter}/>
            </div>
            <PostList 
                posts={visiblePosts} 
                onDelete={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleLiked={this.onToggleLiked}
            />
            <PostAddForm 
                onAdd={this.addItem}
            />
        
        </div>
        )
    }
}


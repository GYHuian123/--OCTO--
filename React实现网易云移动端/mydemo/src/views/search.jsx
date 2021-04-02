import React from 'react'
import '../assets/css/search.css'
import { gethotSearch, getSearch } from '../util/axios'
class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            hotsearch: [],
            searchlist: [],
        }
        this.val = React.createRef()
    }
    componentDidMount() {
        //页面一加载调取热搜列表
        gethotSearch().then(res => {
            console.log(res, '热搜列表');
            if (res.code === 200) {
                this.setState({
                    hotsearch: res.result.hots
                })
            }
        })
    }
    //封装一个搜索接口
    search(keywords) {
        //给input赋值
        this.val.current.value = keywords
        //调取搜索接口
        getSearch({ keywords }).then(res => {
            // console.log(res, '搜索接口');
            if (res.code === 200) {
                this.setState({
                    searchlist: res.result.songs
                })
            }
        })
    }
    //封装一个清空搜索框内容
    del() {
        //清空input内容
        this.val.current.value = ''
        //置空搜索列表并重新刷新
        this.setState({
            searchlist: [],
        })
    }
    //封装一个input中的内容改变时的事件
    keyUp(e) {
        if (e.target.value === '') {
            this.del()
            return
        }
        //调用search方法
        this.search(e.target.value)
    }
    // 封装一个跳转播放音乐页面
    goPlay(id) {
        this.props.history.push({
            pathname: '/play',
            state: { id }
        })
    }
    render() {
        const { hotsearch, searchlist } = this.state
        // 热门搜索
        let hotInfo = <div className='hotlist'>
            <h3>热门搜索</h3>
            <ul>
                {hotsearch.map(item => {
                    return <li onClick={this.search.bind(this, item.first)} key={item.first}>{item.first}</li>
                })}
            </ul>
        </div>
        // 搜索结果列表
        let searchList = <div className='songlist'>
            {searchlist.map(item => {
                return <div className='item' key={item.id} onClick={this.goPlay.bind(this, item.id)}>
                    <div className='fr'>
                        <div className='left'>
                            <p>{item.name}<span>{item.alias[0]}</span></p>
                            <div className='info'>
                                <i></i>
                                <span>{item.artists[0].name}</span> -
                    <span>{item.album.name}</span>
                            </div>
                        </div>
                        <div className='right'>
                            <span></span>
                        </div>
                    </div>
                </div>
            })}
        </div>
        return (<div className='search'>
            {/* 搜索框 */}
            <div className='input'>
                <div className='inputcover'>
                    <i></i>
                    <input ref={this.val} onChange={this.keyUp.bind(this)} type="text" placeholder='搜索歌曲、歌手、专辑' />
                    {searchlist.length > 0 ? <figure className='close'>
                        <i onClick={this.del.bind(this)}></i>
                    </figure> : ''}

                </div>
            </div>
            {/* 如果搜索结果有值就显示搜索后的列表，如果没有就显示热门搜索 */}
            {searchlist.length > 0 ? searchList : hotInfo}
        </div>)
    }
}
export default Search